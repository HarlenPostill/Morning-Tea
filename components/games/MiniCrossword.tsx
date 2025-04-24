import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconSymbol } from '../ui/IconSymbol';

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
    cellHighlightedColor?: string;
    cellRevealedColor?: string;
    cellCorrectColor?: string;
    textColor?: string;
    clueSelectedColor?: string;
  };
}

// Default theme resembling NYT Mini Crossword
const defaultTheme = {
  backgroundColor: '#ffffff',
  cellBackgroundColor: '#ffffff',
  cellSelectedColor: '#a7d8ff',
  cellHighlightedColor: '#FCDA00', // New yellow highlight color
  cellRevealedColor: '#ffeda3',
  cellCorrectColor: '#dfffdf',
  textColor: '#000000',
  clueSelectedColor: '#e6f2ff',
};

export const MiniCrossword: React.FC<CrosswordProps> = ({
  gameId,
  size = 5,
  title = 'Mini Crossword',
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
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [selectedClue, setSelectedClue] = useState<number | null>(null);

  // Timer
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Refs
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
            isFilled: false, // Start with all cells not filled
            userInput: '',
          }))
      );

    // Mark cells that are part of clues
    for (const clue of acrossClues) {
      for (const [row, col] of clue.cells) {
        newGrid[row][col].isAcross = true;
        newGrid[row][col].isFilled = true; // Mark cells part of clues as filled

        // Set clue number for the first cell in the clue
        if (row === clue.cells[0][0] && col === clue.cells[0][1]) {
          newGrid[row][col].clueNumber = clue.number;
        }
      }
    }

    for (const clue of downClues) {
      for (const [row, col] of clue.cells) {
        newGrid[row][col].isDown = true;
        newGrid[row][col].isFilled = true; // Mark cells part of clues as filled

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

    setGrid(newGrid);

    // Find the first fillable cell for initial selection
    let initialRow = 0;
    let initialCol = 0;

    // Find first cell that's part of a clue
    outerLoop: for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c].isFilled) {
          initialRow = r;
          initialCol = c;
          break outerLoop;
        }
      }
    }

    setSelectedCell({ row: initialRow, col: initialCol });
    setSelectedClue(getClueNumberFromCell(initialRow, initialCol, newGrid, 'across'));
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
  };

  // Toggle direction when clue text is tapped
  const handleClueTextPress = () => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const canGoAcross = grid[row][col].isAcross;
    const canGoDown = grid[row][col].isDown;

    // Only toggle if the cell can go in both directions
    if (canGoAcross && canGoDown) {
      const newDirection = direction === 'across' ? 'down' : 'across';
      setDirection(newDirection);
      const newClue = getClueNumberFromCell(row, col, grid, newDirection);
      setSelectedClue(newClue);
    }
  };

  // Handle keyboard input
  const handleKeyPress = (key: string) => {
    if (isCompleted || !selectedCell) return;

    const { row, col } = selectedCell;
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

  // Navigate to the next clue
  const goToNextClue = () => {
    if (!selectedClue) return;

    const currentClues = direction === 'across' ? acrossClues : downClues;
    const currentIndex = currentClues.findIndex(clue => clue.number === selectedClue);

    if (currentIndex !== -1 && currentIndex < currentClues.length - 1) {
      // Go to next clue in the same direction
      const nextClue = currentClues[currentIndex + 1];
      setSelectedClue(nextClue.number);

      // Select the first cell of the clue
      const [nextRow, nextCol] = nextClue.cells[0];
      setSelectedCell({ row: nextRow, col: nextCol });
    } else if (currentIndex === currentClues.length - 1) {
      // If at the end of current direction clues, go to first clue of the other direction
      const newDirection = direction === 'across' ? 'down' : 'across';
      const newClues = newDirection === 'across' ? acrossClues : downClues;

      if (newClues.length > 0) {
        setDirection(newDirection);
        setSelectedClue(newClues[0].number);

        // Select the first cell of the first clue in the new direction
        const [nextRow, nextCol] = newClues[0].cells[0];
        setSelectedCell({ row: nextRow, col: nextCol });
      }
    }
  };

  // Navigate to the previous clue
  const goToPrevClue = () => {
    if (!selectedClue) return;

    const currentClues = direction === 'across' ? acrossClues : downClues;
    const currentIndex = currentClues.findIndex(clue => clue.number === selectedClue);

    if (currentIndex > 0) {
      // Go to previous clue in the same direction
      const prevClue = currentClues[currentIndex - 1];
      setSelectedClue(prevClue.number);

      // Select the first cell of the clue
      const [prevRow, prevCol] = prevClue.cells[0];
      setSelectedCell({ row: prevRow, col: prevCol });
    } else if (currentIndex === 0) {
      // If at the beginning of current direction clues, go to last clue of the other direction
      const newDirection = direction === 'across' ? 'down' : 'across';
      const newClues = newDirection === 'across' ? acrossClues : downClues;

      if (newClues.length > 0) {
        setDirection(newDirection);
        const lastClue = newClues[newClues.length - 1];
        setSelectedClue(lastClue.number);

        // Select the first cell of the last clue in the new direction
        const [prevRow, prevCol] = lastClue.cells[0];
        setSelectedCell({ row: prevRow, col: prevCol });
      }
    }
  };

  // Handle check/reveal operations
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

    // If cell is not filled (not part of any clue), render it as black
    if (!cell.isFilled) {
      return (
        <View
          key={`cell-${rowIndex}-${colIndex}`}
          style={[styles.cell, { backgroundColor: '#000000' }]}
        />
      );
    }

    // Determine the cell background color based on its state
    let cellBgColor = mergedTheme.cellBackgroundColor;

    if (isSelected) {
      // Current selected cell gets the yellow highlight
      cellBgColor = mergedTheme.cellHighlightedColor;
    } else if (isHighlighted) {
      // Cells in the same clue get the blue highlight
      cellBgColor = mergedTheme.cellSelectedColor;
    } else if (cell.isRevealed) {
      cellBgColor = mergedTheme.cellRevealedColor;
    } else if (cell.isCorrect) {
      cellBgColor = mergedTheme.cellCorrectColor;
    }

    return (
      <TouchableOpacity
        key={`cell-${rowIndex}-${colIndex}`}
        style={[styles.cell, { backgroundColor: cellBgColor }]}
        onPress={() => handleCellPress(rowIndex, colIndex)}>
        {cell.clueNumber && <Text style={styles.clueNumber}>{cell.clueNumber}</Text>}
        <Text style={styles.cellInput}>{cell.userInput}</Text>
      </TouchableOpacity>
    );
  };

  // Render keyboard component
  const renderKeyboard = () => {
    const letters = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ];

    return (
      <View style={styles.keyboard}>
        {/* Top keyboard row */}
        <View style={styles.keyboardRow}>
          {letters[0].map(letter => (
            <TouchableOpacity
              key={`key-${letter}`}
              style={styles.letterTile}
              onPress={() => handleKeyPress(letter)}>
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Middle keyboard row */}
        <View style={styles.keyboardRow}>
          {letters[1].map(letter => (
            <TouchableOpacity
              key={`key-${letter}`}
              style={styles.letterTile}
              onPress={() => handleKeyPress(letter)}>
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom keyboard row */}
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.specialKey}>
            <Text style={styles.specialKeyText}>More</Text>
          </TouchableOpacity>

          {letters[2].map(letter => (
            <TouchableOpacity
              key={`key-${letter}`}
              style={styles.letterTile}
              onPress={() => handleKeyPress(letter)}>
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.specialKey} onPress={() => handleKeyPress('Backspace')}>
            <Text style={styles.specialKeyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Calculate dynamic cell size based on screen width
  const screenWidth = Dimensions.get('window').width;
  const cellSize = Math.min(screenWidth / (size + 1), 75);
  const gridSize = cellSize * size + 20; // +20 for border

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: mergedTheme.backgroundColor }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      {/* Header with timer, title, and controls */}
      <View style={styles.header}>
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={handleCheckCell}>
            <IconSymbol name={'pencil.and.outline'} color={''} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Menu', 'Choose an option:', [
                {
                  text: 'Pause/Resume',
                  onPress: isPaused ? resumeTimer : pauseTimer,
                },
                { text: 'Cancel', style: 'cancel' },
              ]);
            }}>
            <IconSymbol name={'gear.badge.checkmark'} color={''} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Game grid */}
      <View style={[styles.gridOutline, { width: gridSize, height: gridSize }]}>
        <View style={styles.gridContainer}>
          {grid.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
            </View>
          ))}
        </View>
      </View>

      {/* Bottom section with clue bar and keyboard */}
      <View style={styles.bottomContainer}>
        {/* Clue bar */}
        <View style={styles.clueBar}>
          <TouchableOpacity style={styles.clueNavButton} onPress={goToPrevClue}>
            <IconSymbol name={'chevron.left'} color={'black'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.clueTextContainer} onPress={handleClueTextPress}>
            <Text style={styles.clueText}>
              {selectedClue
                ? `${direction.toUpperCase()} ${selectedClue}: ${getClueText(
                    selectedClue,
                    direction
                  )}`
                : ''}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clueNavButton} onPress={goToNextClue}>
            <IconSymbol name={'chevron.right'} color={'black'} />
          </TouchableOpacity>
        </View>

        {/* Custom keyboard */}
        {renderKeyboard()}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  headerButtonText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgba(79, 133, 229, 1)',
  },
  gridOutline: {
    padding: 3,
    backgroundColor: '#000000',
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  clueNumber: {
    position: 'absolute',
    top: 2,
    left: 2,
    fontSize: 12,
    fontWeight: '500',
  },
  cellInput: {
    fontSize: 40,
    fontWeight: 'semibold',
    color: '#000',
  },
  bottomContainer: {
    width: '100%',
  },
  clueBar: {
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 255, 255)',
    height: 61,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  clueNavButton: {
    width: 40,
    backgroundColor: 'rgba(167, 216, 255, 1)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clueNavButtonText: {
    fontSize: 22,
    color: '#000000',
  },
  clueTextContainer: {
    flex: 1,
    backgroundColor: 'rgba(167, 216, 255, 1)',
    height: '100%',
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  clueText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  keyboard: {
    height: 237,
    backgroundColor: 'rgba(220, 220, 220, 1)',
    padding: 2,
    width: '100%',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2.5,
  },
  letterTile: {
    width: 33,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(172, 175, 178)',
  },
  letterText: {
    fontSize: 22,
    color: '#000000',
    textTransform: 'capitalize',
  },
  specialKey: {
    width: 47,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(186, 189, 193, 1)',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(123, 125, 127, 1)',
  },
  specialKeyText: {
    fontSize: 16,
    color: '#000000',
  },
});
