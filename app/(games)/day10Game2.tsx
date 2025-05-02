import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day10Game2() {
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
        gameId="day10game2"
        title="Dan's Mini"
        acrossClues={[
          {
            number: 1,
            text: 'With 8A, annoyingly steep at boyfriend`s house',
            answer: 'DRIVE',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 6,
            text: 'Character that says "never more"',
            answer: 'RAVEN',
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
            text: 'Part of the road where 94 lies',
            answer: 'ABEND',
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
            text: 'Nth of SA',
            answer: 'WAY',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
            ],
          },
          {
            number: 9,
            text: 'Nth of SA',
            answer: 'NT',
            cells: [
              [4, 0],
              [4, 1],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Finished a sketch',
            answer: 'DRAWN',
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
            text: 'What Dan would say if he way trying to scare a bat (Yes, this is dumb, I agree)',
            answer: 'RABAT',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 3,
            text: 'What`s growing on the start of the bridge at Harlen`s house',
            answer: 'IVEY',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
            ],
          },
          {
            number: 4,
            text: 'A diagram using circles',
            answer: 'VEN',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
            ],
          },
          {
            number: 5,
            text: 'You will be glad when you get to this part of the puzzle',
            answer: 'END',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
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
