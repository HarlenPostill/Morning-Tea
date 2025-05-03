import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day21Game3() {
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
        gameId="day21game3"
        title="Tom's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'To behave',
            answer: 'ACT',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
            ],
          },
          {
            number: 4,
            text: 'Childrens cartoon character notorious for not being able to find anything',
            answer: 'DORA',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
            ],
          },
          {
            number: 6,
            text: 'Jack Blacks best video game adaptation role, 2025',
            answer: 'STEVE',
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
            text: 'Uttered words',
            answer: 'SAID',
            cells: [
              [3, 1],
              [3, 2],
              [3, 3],
              [3, 4],
            ],
          },
          {
            number: 9,
            text: 'The ratio of a circle`s circumference to its radius, to a nerd',
            answer: 'TAU',
            cells: [
              [4, 2],
              [4, 3],
              [4, 4],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'What you lose after buying Youtube Premium',
            answer: 'ADS',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
            ],
          },
          {
            number: 2,
            text: 'Baby beds',
            answer: 'COTS',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
              [3, 1],
            ],
          },
          {
            number: 3,
            text: 'Sweet ____',
            answer: 'TREAT',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 5,
            text: 'Grandmother, to Julius Caesar',
            answer: 'AVIA',
            cells: [
              [1, 3],
              [2, 3],
              [3, 3],
              [4, 3],
            ],
          },
          {
            number: 7,
            text: 'Common email suffix, for a student',
            answer: 'EDU',
            cells: [
              [2, 4],
              [3, 4],
              [4, 4],
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
