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

// NYT colours
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

const COLOR_KEYS = Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>;

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
  gameId: string;
  categories: Category[];
  onComplete?: (success: boolean) => void;
  title?: string;
}
interface GameState {
  shuffleKey: number;
  status: 'playing' | 'won';
  selectedWords: Word[];
  solvedCategories: string[];
  mistakes: number;
  revealingCategory: string | null;
  completedTimestamp?: number;
}

const ConnectionsGame = ({
  gameId,
  categories,
  onComplete,
  title = "Today's Connections",
}: ConnectionsGameProps) => {
  const screenWidth = Dimensions.get('window').width;

  const validatedCategories = useMemo(() => {
    const validCats = categories.slice(0, 4);
    return validCats.map((cat, index) => ({
      ...cat,
      color: cat.color || COLOR_KEYS[index % COLOR_KEYS.length],
    }));
  }, [categories]);

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

    return words.sort(() => Math.random() - 0.5);
  }, [validatedCategories]);

  const [gameState, setGameState] = useState<GameState>({
    shuffleKey: 0,
    status: 'playing',
    selectedWords: [],
    solvedCategories: [],
    mistakes: 0,
    revealingCategory: null,
  });

  const [revealAnim] = useState(new Animated.Value(0));

  const [loading, setLoading] = useState(true);

  // Initialize game from AsyncStorage
  useEffect(() => {
    const initializeGameState = async () => {
      try {
        const savedGameState = await AsyncStorage.getItem(`connections_${gameId}`);
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
      if (loading) return;

      try {
        await AsyncStorage.setItem(`connections_${gameId}`, JSON.stringify(gameState));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    };

    saveGameState();
  }, [gameState, gameId, loading]);

  // Handle win condition
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
    }
  }, [gameState.solvedCategories, validatedCategories.length, onComplete, gameState.status]);

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

    // If we already have 4 words selected, can't select more
    if (gameState.selectedWords.length >= 4) return;

    // Add the word to selected words
    setGameState(prev => ({
      ...prev,
      selectedWords: [...prev.selectedWords, word],
    }));
  };

  const submitSelection = () => {
    if (gameState.selectedWords.length !== 4) return;

    const categoryId = gameState.selectedWords[0].categoryId;
    const allSameCategory = gameState.selectedWords.every(w => w.categoryId === categoryId);

    if (allSameCategory) {
      setGameState(prev => ({
        ...prev,
        solvedCategories: [...prev.solvedCategories, categoryId],
        selectedWords: [],
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        mistakes: prev.mistakes + 1,
        selectedWords: [],
      }));
    }
  };

  const resetSelection = () => {
    setGameState(prev => ({
      ...prev,
      selectedWords: [],
    }));
  };

  const shuffleWords = () => {
    setGameState(prev => ({
      ...prev,
      shuffleKey: (prev.shuffleKey || 0) + 1,
    }));
  };

  const isWordSelected = (word: Word) => {
    return gameState.selectedWords.some(w => w.id === word.id);
  };

  const isWordSolved = (word: Word) => {
    return gameState.solvedCategories.includes(word.categoryId);
  };

  const getCategory = (categoryId: string) => {
    return validatedCategories.find(c => c.id === categoryId);
  };

  const getWordsInCategory = (categoryId: string) => {
    return allWords.filter(word => word.categoryId === categoryId);
  };

  const groupedWords = useMemo(() => {
    const solved: { [categoryId: string]: Word[] } = {};
    const unsolved: Word[] = [];

    gameState.solvedCategories.forEach(categoryId => {
      solved[categoryId] = getWordsInCategory(categoryId);
    });

    allWords.forEach(word => {
      if (!gameState.solvedCategories.includes(word.categoryId)) {
        unsolved.push(word);
      }
    });

    const shuffledUnsolved = [...unsolved].sort(() => Math.random() - 0.5);

    return { solved, unsolved: shuffledUnsolved };
  }, [allWords, gameState.solvedCategories, gameState.shuffleKey]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>{title}</Text>

      {/* Game board */}
      <View style={styles.board}>
        {/* Solved categories */}
        {Object.entries(groupedWords.solved).map(([categoryId, words]) => {
          const category = getCategory(categoryId);
          const categoryColor = CATEGORY_COLORS[category?.color || 'yellow'];

          return (
            <View
              key={categoryId}
              style={[styles.completedGrid, { backgroundColor: categoryColor.light }]}>
              <Text style={[styles.categoryName, { color: categoryColor.text }]}>
                {category?.name.toUpperCase()}
              </Text>
              <Text style={[styles.categoryWords, { color: categoryColor.text }]}>
                {words.map(w => w.text).join(', ')}
              </Text>
            </View>
          );
        })}

        {/* Unsolved words grid */}
        {gameState.status === 'playing' && groupedWords.unsolved.length > 0 && (
          <View style={styles.grid}>
            {Array(Math.ceil(groupedWords.unsolved.length / 4))
              .fill(0)
              .map((_, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                  {groupedWords.unsolved.slice(rowIndex * 4, rowIndex * 4 + 4).map(word => {
                    const isSelected = isWordSelected(word);
                    return (
                      <TouchableOpacity
                        key={word.id}
                        style={[styles.tile, isSelected && styles.selectedTile]}
                        onPress={() => toggleWordSelection(word)}
                        disabled={gameState.status !== 'playing'}>
                        <Text
                          style={[
                            styles.wordText,
                            isSelected && styles.selectedWordText,
                            word.text.indexOf(' ') === -1
                              ? styles.singleWordText
                              : styles.multiWordText,
                          ]}
                          adjustsFontSizeToFit={word.text.indexOf(' ') === -1}
                          numberOfLines={word.text.indexOf(' ') === -1 ? 1 : 2}
                          minimumFontScale={0.5}
                          ellipsizeMode="tail">
                          {word.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
          </View>
        )}

        {/* Mistakes counter */}
        <Text style={styles.mistakesText}>{`Mistakes Made: ${gameState.mistakes}`}</Text>

        {/* Game controls */}
        {gameState.status === 'playing' && (
          <View style={styles.controls}>
            <TouchableOpacity style={styles.shuffleButton} onPress={shuffleWords}>
              <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deselectButton,
                gameState.selectedWords.length === 0 && styles.disabledButton,
              ]}
              onPress={resetSelection}
              disabled={gameState.selectedWords.length === 0}>
              <Text
                style={[
                  styles.buttonText,
                  gameState.selectedWords.length === 0 && styles.disabledButtonText,
                ]}>
                Deselect All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                gameState.selectedWords.length !== 4 && styles.disabledButton,
              ]}
              onPress={submitSelection}
              disabled={gameState.selectedWords.length !== 4}>
              <Text
                style={[
                  styles.submitButtonText,
                  gameState.selectedWords.length !== 4 && styles.disabledButtonText,
                ]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {gameState.status === 'won' && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>All connections found!</Text>
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
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.8,
    marginBottom: 20,
  },
  board: {
    width: '100%',
    maxWidth: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  completedGrid: {
    width: 380,
    height: 89,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 2,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  categoryWords: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  grid: {
    width: '100%',
    gap: 8,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  tile: {
    flex: 1,
    aspectRatio: 2,
    padding: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 239, 230, 1)',
    overflow: 'hidden',
  },
  selectedTile: {
    backgroundColor: 'rgba(90, 89, 78, 1)',
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',

    textAlign: 'center',
    color: '#000000',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  multiWordText: {
    lineHeight: 20,
  },
  singleWordText: {
    lineHeight: 22,
  },
  selectedWordText: {
    color: '#FFFFFF',
  },
  mistakesText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(90, 89, 78, 1)',
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 0.4,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  shuffleButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  deselectButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  submitButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  disabledButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(139, 139, 139, 1)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  disabledButtonText: {
    color: 'rgba(139, 139, 139, 1)',
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
