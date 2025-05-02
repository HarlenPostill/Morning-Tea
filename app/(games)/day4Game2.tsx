import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day4Game2() {
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
        gameId="day4game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Mario cart speed indicator',
            answer: 'CC',
            cells: [
              [0, 0],
              [0, 1],
            ],
          },
          {
            number: 2,
            text: 'Black out',
            answer: 'KO',
            cells: [
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 5,
            text: 'Funder of the beast games',
            answer: 'PRIME',
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
            text: 'Bumps home',
            answer: 'STAN',
            cells: [
              [3, 1],
              [3, 2],
              [3, 3],
              [3, 4],
            ],
          },
          {
            number: 9,
            text: 'Ladder half of a place to watch and chill',
            answer: 'FLIX',
            cells: [
              [4, 0],
              [4, 1],
              [4, 2],
              [4, 3],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'The stolen vessel from Bomonti cafe',
            answer: 'CUP',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
            ],
          },
          {
            number: 3,
            text: 'Place for a roast',
            answer: 'OVEN',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
              [3, 4],
            ],
          },
          {
            number: 4,
            text: 'Sorrow or compassion for someone else',
            answer: 'PITI',
            cells: [
              [1, 2],
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 6,
            text: 'Diggers',
            answer: 'RSL',
            cells: [
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 7,
            text: 'HBO’s rebrand',
            answer: 'MAX',
            cells: [
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
