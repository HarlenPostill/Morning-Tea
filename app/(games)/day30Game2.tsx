import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day30Game2() {
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
        gameId="day30Game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Family doctor',
            answer: 'GP',
            cells: [
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 3,
            text: 'Aurora`s Greek counterpart',
            answer: 'EOS',
            cells: [
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 4,
            text: 'Gram cracker?',
            answer: 'INSTA',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
              [2, 4],
            ],
          },
          {
            number: 6,
            text: '"SNL" network',
            answer: 'NBC',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
            ],
          },
          {
            number: 7,
            text: '“__da!”',
            answer: 'TA',
            cells: [
              [4, 0],
              [4, 1],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'HBO dragon show, for short',
            answer: 'GOT',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
            ],
          },
          {
            number: 2,
            text: 'Message to raise public awareness, for short',
            answer: 'PSA',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 3,
            text: 'F1`s neighbour',
            answer: 'ESC',
            cells: [
              [1, 2],
              [2, 2],
              [3, 2],
            ],
          },
          {
            number: 4,
            text: 'Stores numbers in code',
            answer: 'INT',
            cells: [
              [2, 0],
              [3, 0],
              [4, 0],
            ],
          },
          {
            number: 5,
            text: 'competitive basketball',
            answer: 'NBA',
            cells: [
              [2, 1],
              [3, 1],
              [4, 1],
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
