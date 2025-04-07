import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types and interfaces
interface Cell {
  row: number;
  col: number;
  letter: string;
  clueNumber?: number;
  isAcross: boolean;
  isDown: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  isFilled: boolean;
  userInput: string;
}

interface Clue {
  number: number;
  text: string;
  answer: string;
  cells: [number, number][];
}

export interface CrosswordProps {
  // Unique identifier for local storage
  gameId: string;
  // Grid size (typically 5x5 for mini crossword)
  size?: number;
  // The title of the puzzle (optional)
  title?: string;
  // The puzzle creator's name (optional)
  author?: string;
  // The difficulty level (optional)
  difficulty?: 'easy' | 'medium' | 'hard';
  // The date of the puzzle (optional)
  date?: string;
  // Clues for across
  acrossClues: Clue[];
  // Clues for down
  downClues: Clue[];
  // Callback when puzzle is completed
  onComplete?: (time: number) => void;
  // Starting with revealed letters (optional)
  revealedLetters?: [number, number, string][];
  // Theme colors (optional)
  theme?: {
    backgroundColor?: string;
    cellBackgroundColor?: string;
    cellSelectedColor?: string;
    cellRevealedColor?: string;
    cellCorrectColor?: string;
    textColor?: string;
    clueSelectedColor?: string;
  };
}

// Default theme resembling NYT Mini Crossword
const defaultTheme = {
  backgroundColor: 'transparent',
  cellBackgroundColor: '#ffffff',
  cellSelectedColor: '#a7d8ff',
  cellRevealedColor: '#ffeda3',
  cellCorrectColor: '#dfffdf',
  textColor: '#000000',
  clueSelectedColor: '#e6f2ff',
};

export const MiniCrossword: React.FC<CrosswordProps> = ({
  gameId,
  size = 5,
  title,
  author,
  difficulty,
  date,
  acrossClues,
  downClues,
  onComplete,
  revealedLetters = [],
  theme = defaultTheme,
}) => {
  // Merge provided theme with defaults
  const mergedTheme = { ...defaultTheme, ...theme };

  // Grid state
  const [grid, setGrid] = useState<Cell[][]>([]);

  // Current selection
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [selectedClue, setSelectedClue] = useState<number | null>(null);

  // Timer
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Refs
  const inputRefs = useRef<(TextInput | null)[][]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize the grid
  useEffect(() => {
    initializeGrid();
    loadGameState();

    // Start timer
    if (!startTime) {
      setStartTime(Date.now());
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      if (!isPaused && !isCompleted) {
        setElapsedTime(prev => prev + 1);
      }
    }, 1000);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const initializeGrid = () => {
    // Create empty grid
    const newGrid: Cell[][] = Array(size)
      .fill(null)
      .map((_, r) =>
        Array(size)
          .fill(null)
          .map((_, c) => ({
            row: r,
            col: c,
            letter: '',
            isAcross: false,
            isDown: false,
            isRevealed: false,
            isCorrect: false,
            isFilled: true,
            userInput: '',
          }))
      );

    // Add clue numbers and mark cells as part of across/down clues
    let clueNumber = 1;

    // Mark cells that are part of clues
    for (const clue of acrossClues) {
      for (const [row, col] of clue.cells) {
        newGrid[row][col].isAcross = true;

        // Set clue number for the first cell in the clue
        if (row === clue.cells[0][0] && col === clue.cells[0][1]) {
          newGrid[row][col].clueNumber = clue.number;
        }
      }
    }

    for (const clue of downClues) {
      for (const [row, col] of clue.cells) {
        newGrid[row][col].isDown = true;

        // Set clue number for the first cell in the clue
        if (row === clue.cells[0][0] && col === clue.cells[0][1]) {
          if (!newGrid[row][col].clueNumber) {
            newGrid[row][col].clueNumber = clue.number;
          }
        }
      }
    }

    // Handle revealed letters if provided
    for (const [row, col, letter] of revealedLetters) {
      if (row >= 0 && row < size && col >= 0 && col < size) {
        newGrid[row][col].isRevealed = true;
        newGrid[row][col].letter = letter;
        newGrid[row][col].userInput = letter;
      }
    }

    // Create refs for each cell
    inputRefs.current = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));

    setGrid(newGrid);
    setSelectedCell({ row: 0, col: 0 });
    setSelectedClue(getClueNumberFromCell(0, 0, newGrid, 'across'));
  };

  // Load saved game state from AsyncStorage
  const loadGameState = async () => {
    try {
      const savedGame = await AsyncStorage.getItem(`crossword_${gameId}`);
      if (savedGame) {
        const gameData = JSON.parse(savedGame);

        // Update grid with saved state
        setGrid(gameData.grid);
        setStartTime(gameData.startTime);
        setElapsedTime(gameData.elapsedTime);
        setIsCompleted(gameData.isCompleted);

        if (gameData.isCompleted) {
          pauseTimer();
        }
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  // Save game state to AsyncStorage
  const saveGameState = async () => {
    try {
      const gameData = {
        grid,
        startTime,
        elapsedTime,
        isCompleted,
        lastUpdated: Date.now(),
      };

      await AsyncStorage.setItem(`crossword_${gameId}`, JSON.stringify(gameData));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  // Effect to save game state when grid changes
  useEffect(() => {
    if (grid.length > 0) {
      saveGameState();
      checkCompletion();
    }
  }, [grid]);

  // Check if the puzzle is completed
  const checkCompletion = () => {
    if (grid.length === 0) return;

    // Check if all cells are filled correctly
    const allAnswers = [...acrossClues, ...downClues];
    let isCorrect = true;

    // Check all across clues
    for (const clue of acrossClues) {
      let clueAnswer = '';
      for (const [row, col] of clue.cells) {
        clueAnswer += grid[row][col].userInput.toUpperCase();
      }

      if (clueAnswer !== clue.answer.toUpperCase()) {
        isCorrect = false;
        break;
      }
    }

    // If across clues are correct, check down clues
    if (isCorrect) {
      for (const clue of downClues) {
        let clueAnswer = '';
        for (const [row, col] of clue.cells) {
          clueAnswer += grid[row][col].userInput.toUpperCase();
        }

        if (clueAnswer !== clue.answer.toUpperCase()) {
          isCorrect = false;
          break;
        }
      }
    }

    // If completed, update state and trigger callback
    if (isCorrect && !isCompleted) {
      setIsCompleted(true);

      if (onComplete) {
        onComplete(elapsedTime);
      }

      Alert.alert('Congratulations!', `You completed the puzzle in ${formatTime(elapsedTime)}!`);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Get the clue number for a cell
  const getClueNumberFromCell = (
    row: number,
    col: number,
    gridData: Cell[][],
    dir: 'across' | 'down'
  ): number | null => {
    if (!gridData[row][col]) return null;

    const isAcross = gridData[row][col].isAcross;
    const isDown = gridData[row][col].isDown;

    if (dir === 'across' && isAcross) {
      // Find the start of the across clue
      let c = col;
      while (c > 0 && gridData[row][c - 1].isAcross) {
        c--;
      }

      // Return the clue number of the first cell
      return gridData[row][c].clueNumber || null;
    } else if (dir === 'down' && isDown) {
      // Find the start of the down clue
      let r = row;
      while (r > 0 && gridData[r - 1][col].isDown) {
        r--;
      }

      // Return the clue number of the first cell
      return gridData[r][col].clueNumber || null;
    }

    return null;
  };

  // Get the clue text from the clue number
  const getClueText = (clueNumber: number | null, dir: 'across' | 'down'): string => {
    if (!clueNumber) return '';

    const clues = dir === 'across' ? acrossClues : downClues;
    const clue = clues.find(c => c.number === clueNumber);

    return clue ? clue.text : '';
  };

  // Handle cell selection
  const handleCellPress = (row: number, col: number) => {
    if (!grid[row][col].isFilled) return;

    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      // Toggle direction if tapping the same cell
      const newDirection = direction === 'across' ? 'down' : 'across';
      setDirection(newDirection);

      const newClue = getClueNumberFromCell(row, col, grid, newDirection);
      setSelectedClue(newClue);
    } else {
      // Select new cell
      setSelectedCell({ row, col });

      // Determine if we should switch direction
      const canGoAcross = grid[row][col].isAcross;
      const canGoDown = grid[row][col].isDown;

      if (canGoAcross && (!canGoDown || direction === 'across')) {
        setDirection('across');
        const newClue = getClueNumberFromCell(row, col, grid, 'across');
        setSelectedClue(newClue);
      } else if (canGoDown) {
        setDirection('down');
        const newClue = getClueNumberFromCell(row, col, grid, 'down');
        setSelectedClue(newClue);
      }
    }

    // Focus on the cell input
    if (inputRefs.current[row][col]) {
      inputRefs.current[row][col]?.focus();
    }
  };

  // Handle keyboard input
  const handleKeyPress = (key: string, row: number, col: number) => {
    if (isCompleted) return;

    const newGrid = [...grid];

    if (/^[A-Za-z]$/.test(key)) {
      // Handle letter input
      newGrid[row][col].userInput = key.toUpperCase();
      newGrid[row][col].isFilled = true;

      // Move to next cell
      moveToNextCell(row, col);
    } else if (key === 'Backspace' || key === 'Delete') {
      // Handle backspace/delete
      if (newGrid[row][col].userInput !== '') {
        newGrid[row][col].userInput = '';
      } else {
        // Move to previous cell if current cell is empty
        moveToPrevCell(row, col);
      }
    }

    setGrid(newGrid);
  };

  // Move to the next cell in the current direction
  const moveToNextCell = (row: number, col: number) => {
    if (direction === 'across') {
      // Find next cell horizontally
      let nextCol = col + 1;
      while (nextCol < size) {
        if (grid[row][nextCol].isFilled) {
          handleCellPress(row, nextCol);
          return;
        }
        nextCol++;
      }

      // If at the end of the row, move to next row if there's a clue
      const acrossClue = acrossClues.find(clue =>
        clue.cells.some(([r, c]) => r === row && c === col)
      );

      if (acrossClue) {
        const currentIndex = acrossClue.cells.findIndex(([r, c]) => r === row && c === col);
        if (currentIndex !== -1 && currentIndex < acrossClue.cells.length - 1) {
          const [nextRow, nextCol] = acrossClue.cells[currentIndex + 1];
          handleCellPress(nextRow, nextCol);
        }
      }
    } else {
      // Find next cell vertically
      let nextRow = row + 1;
      while (nextRow < size) {
        if (grid[nextRow][col].isFilled) {
          handleCellPress(nextRow, col);
          return;
        }
        nextRow++;
      }

      // If at the end of the column, stay put
      const downClue = downClues.find(clue => clue.cells.some(([r, c]) => r === row && c === col));

      if (downClue) {
        const currentIndex = downClue.cells.findIndex(([r, c]) => r === row && c === col);
        if (currentIndex !== -1 && currentIndex < downClue.cells.length - 1) {
          const [nextRow, nextCol] = downClue.cells[currentIndex + 1];
          handleCellPress(nextRow, nextCol);
        }
      }
    }
  };

  // Move to the previous cell in the current direction
  const moveToPrevCell = (row: number, col: number) => {
    if (direction === 'across') {
      // Find previous cell horizontally
      let prevCol = col - 1;
      while (prevCol >= 0) {
        if (grid[row][prevCol].isFilled) {
          handleCellPress(row, prevCol);
          return;
        }
        prevCol--;
      }
    } else {
      // Find previous cell vertically
      let prevRow = row - 1;
      while (prevRow >= 0) {
        if (grid[prevRow][col].isFilled) {
          handleCellPress(prevRow, col);
          return;
        }
        prevRow--;
      }
    }
  };

  // Handle reveal for current cell
  const handleRevealCell = () => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const currentClue =
      direction === 'across'
        ? acrossClues.find(clue => clue.number === selectedClue)
        : downClues.find(clue => clue.number === selectedClue);

    if (!currentClue) return;

    // Find the index of the current cell in the clue
    const cellIndex = currentClue.cells.findIndex(([r, c]) => r === row && c === col);

    if (cellIndex !== -1) {
      const correctLetter = currentClue.answer[cellIndex];

      const newGrid = [...grid];
      newGrid[row][col].userInput = correctLetter;
      newGrid[row][col].isRevealed = true;

      setGrid(newGrid);
    }
  };

  // Handle reveal for current word
  const handleRevealWord = () => {
    if (!selectedCell || !selectedClue) return;

    const currentClue =
      direction === 'across'
        ? acrossClues.find(clue => clue.number === selectedClue)
        : downClues.find(clue => clue.number === selectedClue);

    if (!currentClue) return;

    const newGrid = [...grid];

    // Reveal all cells in the current clue
    currentClue.cells.forEach(([row, col], index) => {
      newGrid[row][col].userInput = currentClue.answer[index];
      newGrid[row][col].isRevealed = true;
    });

    setGrid(newGrid);
  };

  // Handle reveal for entire puzzle
  const handleRevealPuzzle = () => {
    const newGrid = [...grid];

    // Reveal all across clues
    for (const clue of acrossClues) {
      clue.cells.forEach(([row, col], index) => {
        newGrid[row][col].userInput = clue.answer[index];
        newGrid[row][col].isRevealed = true;
      });
    }

    setGrid(newGrid);
    setIsCompleted(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Handle checking for current cell
  const handleCheckCell = () => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const currentClue =
      direction === 'across'
        ? acrossClues.find(clue => clue.number === selectedClue)
        : downClues.find(clue => clue.number === selectedClue);

    if (!currentClue) return;

    // Find the index of the current cell in the clue
    const cellIndex = currentClue.cells.findIndex(([r, c]) => r === row && c === col);

    if (cellIndex !== -1) {
      const correctLetter = currentClue.answer[cellIndex];
      const userInput = grid[row][col].userInput;

      if (userInput.toUpperCase() === correctLetter.toUpperCase()) {
        const newGrid = [...grid];
        newGrid[row][col].isCorrect = true;
        setGrid(newGrid);
      } else {
        // Incorrect - shake animation could be added here
        Alert.alert('Incorrect', 'This letter is not correct.');
      }
    }
  };

  // Handle checking the entire puzzle
  const handleCheckPuzzle = () => {
    let hasIncorrect = false;
    const newGrid = [...grid];

    // Check all across clues
    for (const clue of acrossClues) {
      clue.cells.forEach(([row, col], index) => {
        const correctLetter = clue.answer[index].toUpperCase();
        const userInput = grid[row][col].userInput.toUpperCase();

        if (userInput === correctLetter) {
          newGrid[row][col].isCorrect = true;
        } else if (userInput !== '') {
          hasIncorrect = true;
          // Mark incorrect cells - could add visual indicator
        }
      });
    }

    setGrid(newGrid);

    if (hasIncorrect) {
      Alert.alert('Check Results', 'Some letters are incorrect.');
    } else if (!isCompleted) {
      Alert.alert('Check Results', 'All filled letters are correct!');
    }
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Render single cell in the grid
  const renderCell = (cell: Cell, rowIndex: number, colIndex: number) => {
    const isSelected =
      selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex;

    const isHighlighted =
      selectedCell &&
      selectedClue &&
      ((direction === 'across' &&
        rowIndex === selectedCell.row &&
        getClueNumberFromCell(rowIndex, colIndex, grid, 'across') === selectedClue) ||
        (direction === 'down' &&
          colIndex === selectedCell.col &&
          getClueNumberFromCell(rowIndex, colIndex, grid, 'down') === selectedClue));

    let cellBgColor = mergedTheme.cellBackgroundColor;
    if (isSelected) {
      cellBgColor = mergedTheme.cellSelectedColor;
    } else if (isHighlighted) {
      cellBgColor = mergedTheme.cellSelectedColor;
      // Make it slightly lighter than the selected cell
      cellBgColor = cellBgColor.replace(
        /rgb\((\d+), (\d+), (\d+)\)/,
        (_, r, g, b) => `rgba(${r}, ${g}, ${b}, 0.7)`
      );
    } else if (cell.isRevealed) {
      cellBgColor = mergedTheme.cellRevealedColor;
    } else if (cell.isCorrect) {
      cellBgColor = mergedTheme.cellCorrectColor;
    }

    // Only render cells that are part of the puzzle
    if (!cell.isFilled) {
      return (
        <View
          key={`cell-${rowIndex}-${colIndex}`}
          style={[styles.cell, { backgroundColor: '#000000' }]}
        />
      );
    }

    return (
      <TouchableOpacity
        key={`cell-${rowIndex}-${colIndex}`}
        style={[styles.cell, { backgroundColor: cellBgColor }]}
        onPress={() => handleCellPress(rowIndex, colIndex)}>
        {cell.clueNumber && <Text style={styles.clueNumber}>{cell.clueNumber}</Text>}

        <TextInput
          ref={ref => {
            inputRefs.current[rowIndex][colIndex] = ref;
          }}
          style={styles.cellInput}
          value={cell.userInput}
          maxLength={1}
          autoCapitalize="characters"
          onChangeText={text => {
            if (/^[A-Za-z]$/i.test(text) || text === '') {
              handleKeyPress(text || 'Backspace', rowIndex, colIndex);
            }
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleKeyPress('Backspace', rowIndex, colIndex);
            }
          }}
          caretHidden={true}
        />
      </TouchableOpacity>
    );
  };

  // Render a clue
  const renderClue = (clue: Clue, dir: 'across' | 'down') => {
    const isSelected = selectedClue === clue.number && direction === dir;

    return (
      <TouchableOpacity
        key={`${dir}-${clue.number}`}
        style={[styles.clue, isSelected && { backgroundColor: mergedTheme.clueSelectedColor }]}
        onPress={() => {
          setDirection(dir);
          setSelectedClue(clue.number);

          // Find the first cell of the clue
          const [row, col] = clue.cells[0];
          handleCellPress(row, col);
        }}>
        <Text style={styles.clueText}>
          <Text style={styles.clueNumber}>{clue.number}. </Text>
          {clue.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: mergedTheme.backgroundColor }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      {/* Timer display */}
      <View style={styles.header}>
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={isPaused ? resumeTimer : pauseTimer}>
            <Text style={styles.controlButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              Alert.alert('Menu', 'Choose an option:', [
                {
                  text: 'Reveal Cell',
                  onPress: handleRevealCell,
                },
                {
                  text: 'Reveal Word',
                  onPress: handleRevealWord,
                },
                {
                  text: 'Reveal Puzzle',
                  onPress: handleRevealPuzzle,
                },
                {
                  text: 'Check Cell',
                  onPress: handleCheckCell,
                },
                {
                  text: 'Check Puzzle',
                  onPress: handleCheckPuzzle,
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]);
            }}>
            <Text style={styles.controlButtonText}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Game grid */}
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
          </View>
        ))}
      </View>

      {/* Current clue display */}
      {selectedClue && (
        <View style={styles.currentClue}>
          <Text style={styles.currentClueText}>
            {direction.toUpperCase()} {selectedClue}: {getClueText(selectedClue, direction)}
          </Text>
        </View>
      )}

      {/* Clue lists */}
      <View style={styles.cluesContainer}>
        <View style={styles.clueList}>
          <Text style={styles.clueListTitle}>ACROSS</Text>
          {acrossClues.map(clue => renderClue(clue, 'across'))}
        </View>

        <View style={styles.clueList}>
          <Text style={styles.clueListTitle}>DOWN</Text>
          {downClues.map(clue => renderClue(clue, 'down'))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// Calculate dynamic cell size based on screen width (5x5 grid for mini crossword)
const screenWidth = Dimensions.get('window').width;
const cellSize = Math.min(screenWidth / 6, 60);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  controlButtonText: {
    fontWeight: '500',
  },
  gridContainer: {
    marginVertical: 10,
    padding: 1,
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  cellInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: cellSize * 0.6,
    fontWeight: 'bold',
    color: '#000',
    padding: 0,
  },
  clueNumber: {
    position: 'absolute',
    top: 2,
    left: 2,
    fontSize: cellSize * 0.25,
    fontWeight: '500',
  },
  currentClue: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    borderRadius: 5,
  },
  currentClueText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cluesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    flex: 1,
  },
  clueList: {
    flex: 1,
    marginHorizontal: 5,
  },
  clueListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clue: {
    padding: 8,
    marginBottom: 5,
    borderRadius: 4,
  },
  clueText: {
    fontSize: 14,
  },
});
