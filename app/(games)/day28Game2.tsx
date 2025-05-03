import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day28Game2() {
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
        gameId="day28game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Massage',
            answer: 'RUB',
            cells: [
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 5,
            text: 'Game studio behind "The Last of Us", for short',
            answer: 'ND',
            cells: [
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 6,
            text: 'You study me',
            answer: 'MEDIA',
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
            text: 'You cuddle me',
            answer: 'MIFFY',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
              [3, 4],
            ],
          },
          {
            number: 9,
            text: 'Beam',
            answer: 'RAY',
            cells: [
              [4, 1],
              [4, 2],
              [4, 3],
            ],
          },
        ]}
        downClues={[
          {
            number: 2,
            text: 'Bring together',
            answer: 'UNIFY',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
              [4, 3],
            ],
          },
          {
            number: 3,
            text: 'Annual celebration, for short',
            answer: 'BDAY',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
              [3, 4],
            ],
          },
          {
            number: 4,
            text: 'Natural successor',
            answer: 'HEIR',
            cells: [
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 6,
            text: 'A round Chocolate treat without &',
            answer: 'MM',
            cells: [
              [2, 0],
              [3, 0],
            ],
          },
          {
            number: 7,
            text: 'Neurodevelopment, for short',
            answer: 'DFA',
            cells: [
              [2, 2],
              [3, 2],
              [4, 2],
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
