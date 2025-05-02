import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day12Game2() {
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
        gameId="day12game2"
        title="Harlen's Mini"
        acrossClues={[
          {
            number: 1,
            text: 'Poke',
            answer: 'JAB',
            cells: [
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 4,
            text: 'Xbox shooter',
            answer: 'HALO',
            cells: [
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 5,
            text: 'Penguin is one',
            answer: 'PUPPY',
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
            text: 'Salt Lake American state',
            answer: 'UTAH',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
            ],
          },
          {
            number: 7,
            text: 'Glue ___',
            answer: 'GUN',
            cells: [
              [4, 0],
              [4, 1],
              [4, 2],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Andre`s solo destination',
            answer: 'JAPAN',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 2,
            text: 'Pikmin Protagonist',
            answer: 'ALPH',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
            ],
          },
          {
            number: 3,
            text: 'Another name for Murray',
            answer: 'BOY',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 4,
            text: 'Rwanda native',
            answer: 'HUTU',
            cells: [
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 5,
            text: 'The first half of Murray`s species (asked by Fio)',
            answer: 'PUG',
            cells: [
              [2, 0],
              [3, 0],
              [4, 0],
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
