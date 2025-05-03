import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day26Game2() {
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
        gameId="day26game2"
        title="Tom's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Pork, when he calls you must answer',
            answer: 'JOHN',
            cells: [
              [0, 1],
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 5,
            text: 'Vein, plural (only if you`re nerd though)',
            answer: 'VENAE',
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
            text: 'Tung Tung Tung Tung Tung Tung Tung Tung Tung, surname',
            answer: 'SAHUR',
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
            text: 'Without a break',
            answer: 'ONEND',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
              [3, 4],
            ],
          },
          {
            number: 8,
            text: 'Western Australia city missing a letter',
            answer: 'PERT',
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
            text: 'Astrology Dixon who`s name gets mistaken for denim pants',
            answer: 'JEANE',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 2,
            text: 'Bond film, ___ Majesty`s Secret Service',
            answer: 'ONHER',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 3,
            text: 'Phasmophobia challenge, only if you`re crazy',
            answer: 'HAUNT',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
              [4, 3],
            ],
          },
          {
            number: 4,
            text: 'Rhett and Link rap battle, geeks foe',
            answer: 'NERD',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
              [3, 4],
            ],
          },
          {
            number: 5,
            text: 'Classification for a cognac, a Very Superior Old Pale',
            answer: 'VSOP',
            cells: [
              [1, 0],
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
