import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Category color palette similar to NYT Connections
const CATEGORY_COLORS = {
  yellow: {
    light: '#f9df6d',
    dark: '#cba92b',
    text: '#000000',
  },
  green: {
    light: '#a0c35a',
    dark: '#647e32',
    text: '#000000',
  },
  blue: {
    light: '#6aacee',
    dark: '#3170b2',
    text: '#000000',
  },
  purple: {
    light: '#b48edf',
    dark: '#8b62c3',
    text: '#000000',
  },
};

// Get all colors in an array for easy indexing
const COLOR_KEYS = Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>;

// Types for our props
interface Word {
  id: string;
  text: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  words: string[];
  color?: keyof typeof CATEGORY_COLORS;
}

interface ConnectionsGameProps {
  gameId: string; // Unique identifier for the game, e.g., 'day1game1'
  categories: Category[];
  onComplete?: (success: boolean) => void;
  maxAttempts?: number;
}

// State for our game
interface GameState {
  status: 'playing' | 'won' | 'lost';
  selectedWords: Word[];
  solvedCategories: string[];
  attempts: number;
  revealingCategory: string | null;
  completedTimestamp?: number;
}

const ConnectionsGame: React.FC<ConnectionsGameProps> = ({
  gameId,
  categories,
  onComplete,
  maxAttempts = 4,
}) => {
  // Screen width to calculate tile sizes
  const screenWidth = Dimensions.get('window').width;

  // Validate the number of categories (2-4)
  const validatedCategories = useMemo(() => {
    const validCats = categories.slice(0, 4);
    return validCats.map((cat, index) => ({
      ...cat,
      color: cat.color || COLOR_KEYS[index % COLOR_KEYS.length],
    }));
  }, [categories]);

  // Derive the words from the categories
  const allWords = useMemo(() => {
    let words: Word[] = [];
    validatedCategories.forEach(category => {
      const categoryWords = category.words.map(word => ({
        id: `${category.id}-${word}`,
        text: word,
        categoryId: category.id,
      }));
      words = [...words, ...categoryWords];
    });

    // Shuffle the words
    return words.sort(() => Math.random() - 0.5);
  }, [validatedCategories]);

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    status: 'playing',
    selectedWords: [],
    solvedCategories: [],
    attempts: 0,
    revealingCategory: null,
  });

  // Animation values for revealing categories
  const [revealAnim] = useState(new Animated.Value(0));

  // Loading state while checking AsyncStorage
  const [loading, setLoading] = useState(true);

  // Get rows and columns based on total word count
  const gridSize = useMemo(() => {
    const totalWords = allWords.length;
    if (totalWords <= 9) return { rows: 3, cols: 3 };
    if (totalWords <= 12) return { rows: 3, cols: 4 };
    if (totalWords <= 16) return { rows: 4, cols: 4 };
    return { rows: 4, cols: 4 }; // Default to 4x4
  }, [allWords]);

  // Initialize game from AsyncStorage
  useEffect(() => {
    const initializeGameState = async () => {
      try {
        const savedGameState = await AsyncStorage.getItem(`connections-${gameId}`);
        if (savedGameState) {
          const parsedState = JSON.parse(savedGameState) as GameState;
          setGameState(parsedState);
        }
      } catch (error) {
        console.error('Failed to load game state:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeGameState();
  }, [gameId]);

  // Save game state to AsyncStorage whenever it changes
  useEffect(() => {
    const saveGameState = async () => {
      if (loading) return; // Don't save while loading

      try {
        await AsyncStorage.setItem(`connections-${gameId}`, JSON.stringify(gameState));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    };

    saveGameState();
  }, [gameState, gameId, loading]);

  // Handle win/lose conditions
  useEffect(() => {
    if (
      gameState.solvedCategories.length === validatedCategories.length &&
      gameState.status === 'playing'
    ) {
      setGameState(prev => ({
        ...prev,
        status: 'won',
        completedTimestamp: Date.now(),
      }));
      onComplete?.(true);
    } else if (gameState.attempts >= maxAttempts && gameState.status === 'playing') {
      setGameState(prev => ({
        ...prev,
        status: 'lost',
        completedTimestamp: Date.now(),
      }));
      onComplete?.(false);
    }
  }, [
    gameState.solvedCategories,
    gameState.attempts,
    validatedCategories.length,
    maxAttempts,
    onComplete,
    gameState.status,
  ]);

  // Handle revealing categories animation when game is lost
  useEffect(() => {
    if (gameState.status === 'lost' && !gameState.revealingCategory) {
      revealUnsolvedCategories();
    }
  }, [gameState.status]);

  // Reveal the categories one by one when the game is lost
  const revealUnsolvedCategories = useCallback(() => {
    const unsolvedCategories = validatedCategories
      .filter(cat => !gameState.solvedCategories.includes(cat.id))
      .map(cat => cat.id);

    if (unsolvedCategories.length === 0) return;

    const categoryToReveal = unsolvedCategories[0];

    setGameState(prev => ({
      ...prev,
      revealingCategory: categoryToReveal,
    }));

    // Start reveal animation
    revealAnim.setValue(0);
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // After animation completes, add this category to solved list
      setGameState(prev => ({
        ...prev,
        solvedCategories: [...prev.solvedCategories, categoryToReveal],
        revealingCategory: null,
      }));

      // Slight delay before revealing the next category
      setTimeout(() => {
        revealUnsolvedCategories();
      }, 500);
    });
  }, [validatedCategories, gameState.solvedCategories, revealAnim]);

  // Toggle word selection
  const toggleWordSelection = (word: Word) => {
    if (gameState.status !== 'playing') return;

    // Check if the word is already in a solved category
    if (gameState.solvedCategories.includes(word.categoryId)) return;

    // If the word is already selected, remove it
    if (gameState.selectedWords.some(w => w.id === word.id)) {
      setGameState(prev => ({
        ...prev,
        selectedWords: prev.selectedWords.filter(w => w.id !== word.id),
      }));
      return;
    }

    // If we already have 4 words selected, we can't select more
    if (gameState.selectedWords.length >= 4) return;

    // Add the word to selected words
    setGameState(prev => ({
      ...prev,
      selectedWords: [...prev.selectedWords, word],
    }));
  };

  // Submit the current selection
  const submitSelection = () => {
    if (gameState.selectedWords.length !== 4) return;

    // Check if all selected words are from the same category
    const categoryId = gameState.selectedWords[0].categoryId;
    const allSameCategory = gameState.selectedWords.every(w => w.categoryId === categoryId);

    if (allSameCategory) {
      // Correct selection
      setGameState(prev => ({
        ...prev,
        solvedCategories: [...prev.solvedCategories, categoryId],
        selectedWords: [],
      }));
    } else {
      // Incorrect selection
      setGameState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        selectedWords: [],
      }));
    }
  };

  // Reset current selection
  const resetSelection = () => {
    setGameState(prev => ({
      ...prev,
      selectedWords: [],
    }));
  };

  // Check if a word is currently selected
  const isWordSelected = (word: Word) => {
    return gameState.selectedWords.some(w => w.id === word.id);
  };

  // Check if a word is in a solved category
  const isWordSolved = (word: Word) => {
    return gameState.solvedCategories.includes(word.categoryId);
  };

  // Check if a word is in the category being revealed
  const isWordRevealing = (word: Word) => {
    return gameState.revealingCategory === word.categoryId;
  };

  // Get the opacity for a word based on its state
  const getWordOpacity = (word: Word) => {
    if (isWordSolved(word)) return 1;
    if (isWordRevealing(word)) return revealAnim;
    return 1;
  };

  // Get the background color for a word based on its state
  const getWordBackgroundColor = (word: Word) => {
    if (isWordSolved(word) || isWordRevealing(word)) {
      const category = validatedCategories.find(c => c.id === word.categoryId);
      if (category?.color) {
        return CATEGORY_COLORS[category.color].light;
      }
    }
    if (isWordSelected(word)) {
      return '#d4d4d8'; // Selected but not submitted
    }
    return '#ffffff'; // Default
  };

  // Get the text color for a word based on its state
  const getWordTextColor = (word: Word) => {
    if (isWordSolved(word) || isWordRevealing(word)) {
      const category = validatedCategories.find(c => c.id === word.categoryId);
      if (category?.color) {
        return CATEGORY_COLORS[category.color].text;
      }
    }
    return '#000000'; // Default
  };

  // Get the category name for a solved group
  const getCategoryName = (categoryId: string) => {
    const category = validatedCategories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  // Get the color for a category
  const getCategoryColor = (categoryId: string) => {
    const category = validatedCategories.find(c => c.id === categoryId);
    if (category?.color) {
      return CATEGORY_COLORS[category.color];
    }
    return CATEGORY_COLORS.yellow; // Default
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Game board */}
      <View style={styles.board}>
        {/* Grid of words */}
        <View
          style={[
            styles.grid,
            {
              gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            },
          ]}>
          {allWords.map(word => {
            const isInSolvedCategory = isWordSolved(word);
            const isInRevealingCategory = isWordRevealing(word);

            return (
              <Animated.View
                key={word.id}
                style={[
                  styles.wordContainer,
                  {
                    opacity: getWordOpacity(word),
                    backgroundColor: getWordBackgroundColor(word),
                    borderColor: isWordSelected(word) ? '#000' : '#d4d4d8',
                    borderWidth: isWordSelected(word) ? 2 : 1,
                    width: (screenWidth * 0.85) / gridSize.cols - 8,
                  },
                ]}>
                <TouchableOpacity
                  style={styles.wordButton}
                  onPress={() => toggleWordSelection(word)}
                  disabled={isInSolvedCategory || gameState.status !== 'playing'}>
                  <Text
                    style={[styles.wordText, { color: getWordTextColor(word) }]}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {word.text}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Game controls */}
        {gameState.status === 'playing' && (
          <View style={styles.controls}>
            <Text style={styles.attemptsText}>
              {maxAttempts - gameState.attempts} mistakes remaining
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.resetButton,
                  gameState.selectedWords.length === 0 && styles.disabledButton,
                ]}
                onPress={resetSelection}
                disabled={gameState.selectedWords.length === 0}>
                <Text style={styles.buttonText}>Deselect All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.submitButton,
                  gameState.selectedWords.length !== 4 && styles.disabledButton,
                ]}
                onPress={submitSelection}
                disabled={gameState.selectedWords.length !== 4}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Solved categories list */}
        {gameState.solvedCategories.length > 0 && (
          <View style={styles.solvedCategories}>
            {gameState.solvedCategories.map(categoryId => {
              const categoryColor = getCategoryColor(categoryId);
              return (
                <View
                  key={categoryId}
                  style={[styles.solvedCategory, { backgroundColor: categoryColor.light }]}>
                  <Text style={[styles.categoryName, { color: categoryColor.text }]}>
                    {getCategoryName(categoryId)}
                  </Text>
                  <View style={styles.categoryWords}>
                    {allWords
                      .filter(word => word.categoryId === categoryId)
                      .map(word => (
                        <Text
                          key={word.id}
                          style={[styles.categoryWordText, { color: categoryColor.text }]}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {word.text}
                        </Text>
                      ))}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Game over message */}
        {gameState.status !== 'playing' && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>
              {gameState.status === 'won' ? 'All connections found!' : 'No more attempts!'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  wordContainer: {
    margin: 4,
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  wordButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  wordText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  controls: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  attemptsText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  resetButton: {
    backgroundColor: '#d1d5db',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  solvedCategories: {
    width: '100%',
    marginTop: 20,
  },
  solvedCategory: {
    width: '100%',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  categoryWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryWordText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
    marginBottom: 4,
  },
  gameOverContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default ConnectionsGame;
