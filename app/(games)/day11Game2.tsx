import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day11Game2() {
  const [gameWon, setGameWon] = useState(false);
  const confettiRef = useRef<Confetti | null>(null);

  const handleGameComplete = (success: boolean | ((prevState: boolean) => boolean)) => {
    setGameWon(success);
    if (success && confettiRef.current) {
      confettiRef.current.startConfetti();
    } else if (confettiRef.current) {
      confettiRef.current.stopConfetti();
    }
    console.log(success ? 'Won!' : 'Lost!');
  };

  return (
    <ThemedView style={styles.container}>
      <MiniCrossword
        gameId="day11game2"
        title="Mini Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'First half of old video recorders',
            answer: 'CAM',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
            ],
          },
          {
            number: 5,
            text: 'Japanese beer',
            answer: 'ASAHI',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 7,
            text: 'First half of our $5000 idea',
            answer: 'PETAL',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
              [2, 4],
            ],
          },
          {
            number: 8,
            text: 'Second half of our $5000 idea',
            answer: 'PATH',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Mario’s Hat',
            answer: 'CAPPY',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
              [3, 0],
              [4, 0],
            ],
          },
          {
            number: 2,
            text: 'Sailing',
            answer: 'ASEA',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
              [3, 1],
            ],
          },
          {
            number: 3,
            text: 'The hardest Mii',
            answer: 'MATT',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
            ],
          },
          {
            number: 4,
            text: 'Lubricate',
            answer: 'OIL',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 6,
            text: 'Sounds of laughter',
            answer: 'HAHA',
            cells: [
              [1, 3],
              [2, 3],
              [3, 3],
              [4, 3],
            ],
          },
        ]}
        onComplete={time => handleGameComplete}
      />
      <Confetti size={2} ref={confettiRef} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
});
