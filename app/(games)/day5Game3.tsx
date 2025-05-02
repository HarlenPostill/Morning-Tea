import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day5Game3() {
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
        gameId="day5game3"
        title="Ari's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'If Creed from the Office can`t do this, then what`s it all about?',
            answer: 'SCUBA',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 5,
            text: 'A prefix denoting a variation of something.',
            answer: 'ALT',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
            ],
          },
          {
            number: 6,
            text: 'A delicious Japanese drink (minus A).',
            answer: 'MATCH',
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
            text: ' Mac, Windows, Linux etc... (ask Harlen).',
            answer: 'OS',
            cells: [
              [3, 0],
              [3, 1],
            ],
          },
          {
            number: 8,
            text: 'Someone inquisitive!',
            answer: 'ASKER',
            cells: [
              [4, 0],
              [4, 1],
              [4, 2],
              [4, 3],
              [4, 4],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'A small island North-East of Australia',
            answer: 'SAMOA',
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
            text: 'An event at University that one might attend.',
            answer: 'CLASS',
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
            text: 'An acronym for the University of Trinidad and Tobago.',
            answer: 'UTT',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
            ],
          },
          {
            number: 4,
            text: 'Absolute disgust',
            answer: 'ABHOR',
            cells: [
              [0, 4],
              [1, 4],
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
