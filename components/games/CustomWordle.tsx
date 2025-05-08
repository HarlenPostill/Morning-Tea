import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Vibration,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

interface GuessRow {
  letters: {
    value: string;
    state: LetterState;
  }[];
}

interface GameState {
  guesses: GuessRow[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  keyboardStatus: Record<string, LetterState>;
  completed: boolean;
}

interface CustomWordleProps {
  dailyWord: string;
  gameId: string;
  maxAttempts?: number;
  onGameEnd?: (won: boolean) => void;
  darkMode?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const CustomWordle = ({
  dailyWord,
  gameId,
  maxAttempts = 6,
  onGameEnd,
  darkMode = false,
}: CustomWordleProps) => {
  const wordLength = dailyWord.length;
  const [gameState, setGameState] = useState<GameState>({
    guesses: Array(maxAttempts)
      .fill(null)
      .map(() => ({
        letters: Array(wordLength)
          .fill(null)
          .map(() => ({ value: '', state: 'empty' })),
      })),
    currentGuess: '',
    gameStatus: 'playing',
    keyboardStatus: {},
    completed: false,
  });
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [shake, setShake] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const shakingRow = useRef(new Animated.Value(0)).current;
  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    loadGameState();
  }, [gameId]);

  useEffect(() => {
    if (gameState.gameStatus !== 'playing' || gameState.completed) {
      saveGameState();

      if (onGameEnd && (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost')) {
        onGameEnd(gameState.gameStatus === 'won');
      }

      if (gameState.gameStatus !== 'playing' && !showCompletionMessage) {
        setTimeout(() => {
          setShowCompletionMessage(true);
        }, 1000);
      }
    }
  }, [gameState.gameStatus, gameState.completed]);

  useEffect(() => {
    if (shake) {
      Animated.sequence([
        Animated.timing(shakingRow, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakingRow, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakingRow, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakingRow, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakingRow, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start(() => setShake(false));
    }
  }, [shake]);

  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing') return;

      const key = event.key.toUpperCase();

      if (/^[A-Z]$/.test(key) && gameState.currentGuess.length < wordLength) {
        setGameState(prev => ({
          ...prev,
          currentGuess: prev.currentGuess + key.toLowerCase(),
        }));
      } else if (event.key === 'Backspace') {
        setGameState(prev => ({
          ...prev,
          currentGuess: prev.currentGuess.slice(0, -1),
        }));
      } else if (event.key === 'Enter') {
        submitGuess();
      }

      if (event.key === 'Backspace' || event.key === 'Enter' || /^[A-Z]$/i.test(key)) {
        event.preventDefault();
      }
    };

    if (isWeb) {
      window.addEventListener('keydown', handleKeyboardEvent);
    }

    return () => {
      if (isWeb) {
        window.removeEventListener('keydown', handleKeyboardEvent);
      }
    };
  }, [gameState.gameStatus, gameState.currentGuess, wordLength]);

  useEffect(() => {
    if (!isWeb) {
      const keyboardDidShowListener = Keyboard.addListener(
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
        () => {}
      );

      return () => {
        keyboardDidShowListener.remove();
      };
    }
  }, []);

  const loadGameState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(`wordle_${gameId}`);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setGameState(parsedState);

        const lastFilledRow = parsedState.guesses.findIndex((guess: GuessRow) =>
          guess.letters.some((letter: any) => letter.value === '')
        );

        setCurrentAttempt(lastFilledRow === -1 ? parsedState.guesses.length : lastFilledRow);

        if (parsedState.gameStatus !== 'playing') {
          setTimeout(() => {
            setShowCompletionMessage(true);
          }, 500);
        }
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    }
  };

  const saveGameState = async () => {
    try {
      await AsyncStorage.setItem(`wordle_${gameId}`, JSON.stringify(gameState));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  };

  const handleKeyPress = (key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === '⌫') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (key === 'Enter') {
      submitGuess();
    } else if (gameState.currentGuess.length < wordLength) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key.toLowerCase(),
      }));
    }
  };

  const evaluateGuess = (guess: string): LetterState[] => {
    const result: LetterState[] = Array(wordLength).fill('absent');
    const dailyWordArray = dailyWord.toLowerCase().split('');
    const guessArray = guess.toLowerCase().split('');

    guessArray.forEach((letter, i) => {
      if (letter === dailyWordArray[i]) {
        result[i] = 'correct';
        dailyWordArray[i] = '#';
      }
    });

    guessArray.forEach((letter, i) => {
      if (result[i] !== 'correct') {
        const index = dailyWordArray.indexOf(letter);
        if (index !== -1) {
          result[i] = 'present';
          dailyWordArray[index] = '#';
        }
      }
    });

    return result;
  };

  const submitGuess = () => {
    if (gameState.currentGuess.length !== wordLength) {
      Vibration.vibrate(200);
      setShake(true);
      return;
    }

    // TODO implement a dictionary check here

    const evaluation = evaluateGuess(gameState.currentGuess);

    const newKeyboardStatus = { ...gameState.keyboardStatus };
    gameState.currentGuess.split('').forEach((letter, index) => {
      const currentStatus = newKeyboardStatus[letter.toUpperCase()];
      const newStatus = evaluation[index];

      if (
        !currentStatus ||
        currentStatus === 'absent' ||
        (currentStatus === 'present' && newStatus === 'correct')
      ) {
        newKeyboardStatus[letter.toUpperCase()] = newStatus;
      }
    });

    setGameState(prev => {
      const newGuesses = [...prev.guesses];
      newGuesses[currentAttempt] = {
        letters: gameState.currentGuess.split('').map((letter, index) => ({
          value: letter,
          state: evaluation[index],
        })),
      };

      const won = gameState.currentGuess.toLowerCase() === dailyWord.toLowerCase();
      const lost = !won && currentAttempt >= maxAttempts - 1;

      return {
        ...prev,
        guesses: newGuesses,
        currentGuess: '',
        gameStatus: won ? 'won' : lost ? 'lost' : 'playing',
        keyboardStatus: newKeyboardStatus,
        completed: won || lost,
      };
    });

    setCurrentAttempt(prev => prev + 1);
  };

  const resetGame = () => {
    setGameState({
      guesses: Array(maxAttempts)
        .fill(null)
        .map(() => ({
          letters: Array(wordLength)
            .fill(null)
            .map(() => ({ value: '', state: 'empty' })),
        })),
      currentGuess: '',
      gameStatus: 'playing',
      keyboardStatus: {},
      completed: false,
    });
    setCurrentAttempt(0);
    setShowCompletionMessage(false);
  };

  const renderGameBoard = () => {
    return (
      <View style={styles.boardContainer}>
        {gameState.guesses.map((row, rowIndex) => (
          <Animated.View
            key={rowIndex}
            style={[
              styles.row,
              rowIndex === currentAttempt && shake
                ? { transform: [{ translateX: shakingRow }] }
                : {},
            ]}>
            {row.letters.map((letter, letterIndex) => {
              const displayLetter =
                rowIndex === currentAttempt && gameState.gameStatus === 'playing'
                  ? gameState.currentGuess[letterIndex] || ''
                  : letter.value;

              const letterState =
                rowIndex === currentAttempt && gameState.gameStatus === 'playing' && displayLetter
                  ? 'empty'
                  : letter.state;

              return (
                <View
                  key={letterIndex}
                  style={[
                    styles.tile,
                    {
                      borderColor: displayLetter
                        ? darkMode
                          ? '#565758'
                          : '#d3d6da'
                        : darkMode
                        ? '#3a3a3c'
                        : '#d3d6da',
                      backgroundColor: getBackgroundColor(letterState, darkMode),
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tileText,
                      {
                        color: letterState === 'empty' ? (darkMode ? 'white' : 'black') : 'white',
                      },
                    ]}>
                    {displayLetter.toUpperCase()}
                  </Text>
                </View>
              );
            })}
          </Animated.View>
        ))}
      </View>
    );
  };

  const renderKeyboard = () => {
    return (
      <View style={styles.keyboardContainer}>
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyboardRow}>
            {row.map(key => {
              const keyState = gameState.keyboardStatus[key] || 'empty';
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.key,
                    key === 'Enter' || key === '⌫' ? styles.wideKey : {},
                    {
                      backgroundColor: getKeyBackgroundColor(keyState, darkMode),
                    },
                  ]}
                  onPress={() => handleKeyPress(key)}>
                  <Text
                    style={[
                      styles.keyText,
                      {
                        color: keyState === 'empty' ? (darkMode ? 'white' : 'black') : 'white',
                      },
                    ]}>
                    {key}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const renderCompletionMessage = () => {
    if (!showCompletionMessage) return null;

    return (
      <View style={[styles.completionContainer, darkMode ? { backgroundColor: '#121213' } : {}]}>
        <Text style={[styles.completionTitle, darkMode ? { color: 'white' } : {}]}>
          {gameState.gameStatus === 'won' ? 'Congratulations!' : 'Game Over'}
        </Text>
        <Text style={[styles.completionMessage, darkMode ? { color: 'white' } : {}]}>
          {gameState.gameStatus === 'won'
            ? `You guessed the word in ${currentAttempt} ${currentAttempt === 1 ? 'try' : 'tries'}!`
            : `The word was ${dailyWord.toUpperCase()}`}
        </Text>
        <TouchableOpacity style={styles.resetButton} onPress={() => router.back()}>
          <Text style={styles.resetButtonText}>Back Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, darkMode ? { backgroundColor: '#121213' } : {}]}>
      <View style={styles.gameContainer}>
        {renderGameBoard()}
        {renderKeyboard()}
        {renderCompletionMessage()}
      </View>
    </View>
  );
};

const getBackgroundColor = (state: LetterState, darkMode: boolean): string => {
  switch (state) {
    case 'correct':
      return '#6aaa64';
    case 'present':
      return '#c9b458';
    case 'absent':
      return darkMode ? '#3a3a3c' : '#787c7e';
    default:
      return 'transparent';
  }
};

const getKeyBackgroundColor = (state: LetterState, darkMode: boolean): string => {
  switch (state) {
    case 'correct':
      return '#6aaa64';
    case 'present':
      return '#c9b458';
    case 'absent':
      return darkMode ? '#3a3a3c' : '#787c7e';
    default:
      return darkMode ? '#818384' : '#d3d6da';
  }
};

const { width } = Dimensions.get('window');
const tileSize = Math.min(width / 8, 58);
const tileMargin = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tile: {
    width: tileSize,
    height: tileSize,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#d3d6da',
    margin: tileMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileText: {
    fontSize: tileSize * 0.55,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  keyboardContainer: {
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardRow: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'center',
  },
  key: {
    height: 58,
    minWidth: 30,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#d3d6da',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  wideKey: {
    minWidth: 65,
  },
  keyText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  completionContainer: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  completionMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#6aaa64',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomWordle;
