import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day8Game2() {
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
        gameId="day8game2"
        title="Harlen's Mini"
        acrossClues={[
          {
            number: 1,
            text: 'Hollywood Location, for short',
            answer: 'LA',
            cells: [
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 3,
            text: 'Video Game avatars',
            answer: 'MIIS',
            cells: [
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 5,
            text: 'Test of dreaming',
            answer: 'PINCH',
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
            text: 'Not Off',
            answer: 'ON',
            cells: [
              [3, 0],
              [3, 1],
            ],
          },
          {
            number: 7,
            text: 'Video game iteration vessel',
            answer: 'UI',
            cells: [
              [4, 0],
              [4, 1],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Nits, in time',
            answer: 'LICE',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
            ],
          },
          {
            number: 2,
            text: 'Fire residue',
            answer: 'ASH',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 4,
            text: 'Hot',
            answer: 'IN',
            cells: [
              [1, 2],
              [2, 2],
            ],
          },
          {
            number: 5,
            text: 'iPhone game of a little poo',
            answer: 'POU',
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
