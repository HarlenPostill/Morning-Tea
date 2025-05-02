import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day13Game2() {
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
        gameId="day13game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'The End of a Tim',
            answer: 'TAM',
            cells: [
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 4,
            text: '"That`s ___ question”',
            answer: 'AFAIR',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 6,
            text: 'Grammy winner for 2013`s Song of the Year',
            answer: 'LORDE',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
              [2, 4],
            ],
          },
          {
            number: 7,
            text: 'A Swift Tour',
            answer: 'ERAS',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
            ],
          },
          {
            number: 8,
            text: 'A scan',
            answer: 'CT',
            cells: [
              [4, 0],
              [4, 1],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Fletcher’s closest friend',
            answer: 'TARA',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
            ],
          },
          {
            number: 2,
            text: 'Lends a hand',
            answer: 'AIDS',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
            ],
          },
          {
            number: 3,
            text: 'Army field ration, for short',
            answer: 'MRE',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 4,
            text: 'The farther of your niece',
            answer: 'ALEC',
            cells: [
              [1, 0],
              [2, 0],
              [3, 0],
              [4, 0],
            ],
          },
          {
            number: 5,
            text: 'Military outpost',
            answer: 'FORT',
            cells: [
              [1, 1],
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
