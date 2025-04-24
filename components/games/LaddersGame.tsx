import _ from 'lodash';

import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fourLetterWords from '@assets/fourLetterWords.json';

// Types for our props and state
interface LaddersGameProps {
  gameId: string; // Unique identifier for the game, e.g., 'ladders_game1'
  startWord: string;
  goalWord: string;
  onComplete?: (success: boolean, steps: number) => void;
  title?: string;
}

// State for our game
interface GameState {
  status: 'playing' | 'won';
  previousGuesses: string[];
  currentGuess: string;
  selectedLetterIndex: number | null;
  changedLetterIndices: { [word: string]: number };
  completedTimestamp?: number;
}

// Custom word dictionary that persists across sessions
interface WordDictionaryState {
  customWords: string[];
}

// Define the keyboard layout
const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

// Create a custom dictionary key for AsyncStorage
const CUSTOM_DICTIONARY_KEY = 'ladders_custom_dictionary';

// Process the imported fourLetterWords list to ensure all words are lowercase
// This is more efficient than converting during gameplay
const DEFAULT_VALID_WORDS = fourLetterWords.map(word => word.toLowerCase());

const LaddersGame: React.FC<LaddersGameProps> = ({
  gameId,
  startWord,
  goalWord,
  onComplete,
  title = 'Ladders',
}) => {
  // Validate the start and goal words - ensure they're 4 letters
  const validStartWord = useMemo(() => {
    return startWord.toLowerCase().substring(0, 4);
  }, [startWord]);

  const validGoalWord = useMemo(() => {
    return goalWord.toLowerCase().substring(0, 4);
  }, [goalWord]);

  // Animation value for winning celebration
  const [winAnimation] = useState(new Animated.Value(0));

  // Valid words dictionary that includes both default and custom words
  // We use a Set for O(1) lookup time instead of Array's O(n)
  const [validWordsSet, setValidWordsSet] = useState<Set<string>>(new Set(DEFAULT_VALID_WORDS));

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    status: 'playing',
    previousGuesses: [validStartWord],
    currentGuess: validStartWord,
    selectedLetterIndex: null,
    changedLetterIndices: {},
  });

  // Loading state while checking AsyncStorage
  const [loading, setLoading] = useState(true);

  // Initialize game and load custom dictionary from AsyncStorage
  useEffect(() => {
    const initializeGameState = async () => {
      try {
        // Load game state
        const savedGameState = await AsyncStorage.getItem(`ladders_${gameId}`);
        if (savedGameState) {
          const parsedState = JSON.parse(savedGameState) as GameState;
          setGameState(parsedState);
        }

        // Load custom dictionary
        const savedDictionary = await AsyncStorage.getItem(CUSTOM_DICTIONARY_KEY);
        if (savedDictionary) {
          const parsedDictionary = JSON.parse(savedDictionary) as WordDictionaryState;
          // Create a new Set with both default and custom words
          const combinedWordsSet = new Set([
            ...DEFAULT_VALID_WORDS,
            ...parsedDictionary.customWords,
          ]);
          setValidWordsSet(combinedWordsSet);
        }
      } catch (error) {
        console.error('Failed to load game state or dictionary:', error);
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
        await AsyncStorage.setItem(`ladders_${gameId}`, JSON.stringify(gameState));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
    };

    saveGameState();
  }, [gameState, gameId, loading]);

  // Handle win condition
  useEffect(() => {
    if (gameState.currentGuess === validGoalWord && gameState.status === 'playing') {
      setGameState(prev => ({
        ...prev,
        status: 'won',
        completedTimestamp: Date.now(),
      }));

      // Trigger win animation
      Animated.sequence([
        Animated.timing(winAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(winAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(winAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

      onComplete?.(true, gameState.previousGuesses.length);
    }
  }, [
    gameState.currentGuess,
    validGoalWord,
    onComplete,
    gameState.status,
    gameState.previousGuesses.length,
    winAnimation,
  ]);

  // Select a letter position
  const selectLetterPosition = (index: number) => {
    if (gameState.status !== 'playing') return;

    setGameState(prev => ({
      ...prev,
      selectedLetterIndex: prev.selectedLetterIndex === index ? null : index,
    }));
  };

  // Handle letter key press
  const handleLetterPress = (letter: string) => {
    if (gameState.status !== 'playing' || gameState.selectedLetterIndex === null) return;

    const newGuess =
      gameState.currentGuess.substring(0, gameState.selectedLetterIndex) +
      letter +
      gameState.currentGuess.substring(gameState.selectedLetterIndex + 1);

    setGameState(prev => ({
      ...prev,
      currentGuess: newGuess,
    }));
  };

  // Check if the current guess is valid
  const isValidGuess = () => {
    if (
      gameState.currentGuess === gameState.previousGuesses[gameState.previousGuesses.length - 1]
    ) {
      return false; // No change from previous guess
    }

    // Check if only one letter has changed
    let differentLetters = 0;
    const prevWord = gameState.previousGuesses[gameState.previousGuesses.length - 1];
    for (let i = 0; i < 4; i++) {
      if (gameState.currentGuess[i] !== prevWord[i]) {
        differentLetters++;
      }
    }

    if (differentLetters !== 1) {
      return false; // More than one letter has changed
    }

    // Check if it's a valid word using Set.has() which is O(1) operation
    return validWordsSet.has(gameState.currentGuess);
  };

  // Function to add a new word to the custom dictionary
  const addWordToDictionary = async () => {
    try {
      // Ensure the word is exactly 4 letters and not already in the dictionary
      const newWord = gameState.currentGuess.toLowerCase();
      if (newWord.length !== 4 || validWordsSet.has(newWord)) {
        return;
      }

      // Add the word to our Set
      const newValidWordsSet = new Set(validWordsSet);
      newValidWordsSet.add(newWord);
      setValidWordsSet(newValidWordsSet);

      // Get all words from Set for filtering
      const allWords = Array.from(newValidWordsSet);

      // Save to AsyncStorage - only custom words
      const customWords = allWords.filter(word => !DEFAULT_VALID_WORDS.includes(word));
      const dictionaryState: WordDictionaryState = { customWords };
      await AsyncStorage.setItem(CUSTOM_DICTIONARY_KEY, JSON.stringify(dictionaryState));

      // Give feedback to the user
      console.log(`Word "${newWord}" added to dictionary!`);

      // Here you could add a toast notification like:
      // Toast.show({
      //   type: 'success',
      //   text1: 'Word Added',
      //   text2: `"${newWord}" has been added to your dictionary!`,
      //   position: 'bottom',
      //   visibilityTime: 2000,
      // });
    } catch (error) {
      console.error('Failed to add word to dictionary:', error);
    }
  };

  // Submit the current guess
  const submitGuess = () => {
    if (gameState.status !== 'playing' || !isValidGuess()) return;

    // Find which letter changed
    const prevWord = gameState.previousGuesses[gameState.previousGuesses.length - 1];
    let changedIndex = 0;
    for (let i = 0; i < 4; i++) {
      if (gameState.currentGuess[i] !== prevWord[i]) {
        changedIndex = i;
        break;
      }
    }

    setGameState(prev => {
      const updatedChangedIndices = { ...prev.changedLetterIndices };
      updatedChangedIndices[prev.currentGuess] = changedIndex;

      return {
        ...prev,
        previousGuesses: [...prev.previousGuesses, prev.currentGuess],
        selectedLetterIndex: null,
        changedLetterIndices: updatedChangedIndices,
      };
    });
  };

  // Render letter tile
  const renderLetterTile = (
    letter: string,
    index: number,
    word: string,
    isActive: boolean,
    isSelected: boolean,
    isWinning: boolean,
    isChangedLetter: boolean = false
  ) => {
    const tileStyle = [
      styles.tile,
      isActive && styles.activeTile,
      isSelected && styles.selectedTile,
      isChangedLetter && styles.changedLetterTile,
      isWinning && styles.winningTile,
    ];

    const textStyle = [
      styles.letterText,
      (isSelected || isChangedLetter) && styles.selectedLetterText,
      isWinning && styles.winningLetterText,
    ];

    return (
      <TouchableOpacity
        key={`${word}-tile-${index}`}
        style={tileStyle}
        onPress={() => isActive && selectLetterPosition(index)}
        disabled={!isActive}>
        <Text style={textStyle}>{letter.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  // Render a word row
  const renderWordRow = (
    word: string,
    isActive: boolean,
    isGoalWord: boolean,
    isWinning: boolean
  ) => {
    return (
      <View style={[styles.wordRow, isActive ? styles.activeRow : styles.inactiveRow]}>
        {word
          .split('')
          .map((letter, index) =>
            renderLetterTile(
              letter,
              index,
              word,
              isActive,
              isActive && gameState.selectedLetterIndex === index,
              isWinning && gameState.status === 'won',
              !isActive && gameState.changedLetterIndices[word] === index
            )
          )}
      </View>
    );
  };

  // Render keyboard
  const renderKeyboard = () => {
    return (
      <View style={styles.keyboard}>
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.keyboardRow}>
            {row.map(key => (
              <TouchableOpacity
                key={`key-${key}`}
                style={[
                  styles.keyTile,
                  gameState.selectedLetterIndex === null && styles.disabledKeyTile,
                ]}
                onPress={() => handleLetterPress(key)}
                disabled={gameState.selectedLetterIndex === null || gameState.status !== 'playing'}>
                <Text style={styles.keyText}>{key.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F85E5" />
      </View>
    );
  }

  const isConfirmEnabled = isValidGuess();

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>{title}</Text>

      <View style={styles.gameContainer}>
        <View style={styles.gameArea}>
          <View style={styles.fixedBottomArea}>
            {/* Goal word */}
            {renderWordRow(validGoalWord, false, true, gameState.status === 'won')}
            {/* Current active guess */}
            {renderWordRow(
              gameState.currentGuess,
              true,
              false,
              gameState.status === 'won' && gameState.currentGuess === validGoalWord
            )}
          </View>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* Previous guesses - in reverse order (newest at the bottom) */}
            {gameState.previousGuesses
              .slice(0, -1)
              .map((guess, index) => (
                <View key={`previous-${index}`}>{renderWordRow(guess, false, false, false)}</View>
              ))
              .reverse()}
          </ScrollView>
          {/* Confirm button */}
          {gameState.status === 'playing' && (
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                width: '100%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={[styles.confirmButton, !isConfirmEnabled && styles.disabledButton]}
                onPress={submitGuess}
                disabled={!isConfirmEnabled}>
                <Text style={[styles.confirmText]}>Confirm</Text>
              </TouchableOpacity>
              {/* Button to add a new word to the valid word list */}
              <TouchableOpacity
                style={[styles.confirmAltButton, isConfirmEnabled && styles.altDisabledButton]}
                onPress={addWordToDictionary}
                disabled={isConfirmEnabled}>
                <Text style={[styles.confirmAltText]}>☝️🤓</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Keyboard */}
        {gameState.status === 'playing' && renderKeyboard()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
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
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  gameContainer: {
    flex: 1,
    width: '100%',
    gap: 12,
    justifyContent: 'space-between',
  },
  gameArea: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  scrollArea: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    gap: 4,
  },
  fixedBottomArea: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  activeRow: {
    opacity: 1,
  },
  inactiveRow: {
    opacity: 0.5,
  },
  tile: {
    width: 80,
    height: 80,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: 'rgba(211, 214, 219, 1)',
  },
  activeTile: {
    backgroundColor: 'rgba(211, 214, 219, 1)',
  },
  selectedTile: {
    backgroundColor: 'rgba(79, 133, 229, 1)',
  },
  changedLetterTile: {
    backgroundColor: 'rgba(167, 216, 255, 1)', // Light blue for changed letters
  },
  winningTile: {
    backgroundColor: '#4CAF50', // Green for winning tiles
  },
  letterText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  selectedLetterText: {
    color: '#FFFFFF',
  },
  winningLetterText: {
    color: '#FFFFFF',
  },
  keyboard: {
    width: '100%',
    paddingHorizontal: 2,
    paddingBottom: 30,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  keyTile: {
    width: 32,
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(211, 214, 219, 1)',
  },
  disabledKeyTile: {
    opacity: 0.5,
  },
  keyText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000000',
    textTransform: 'capitalize',
  },
  confirmButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    width: '85%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(79, 133, 229, 1)',
    marginTop: 10,
  },
  confirmAltButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    width: '20%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F788B0',
    marginTop: 10,
  },
  altDisabledButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    width: '20%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(139, 139, 139, 1)',
    marginTop: 10,
  },
  disabledButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    width: '85%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(139, 139, 139, 1)',
    marginTop: 10,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  confirmAltText: {
    color: '#4F85E5',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  winnerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default LaddersGame;
