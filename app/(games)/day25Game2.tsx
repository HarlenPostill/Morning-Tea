import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day25Game2() {
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
        gameId="day25game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Hospital section',
            answer: 'WARD',
            cells: [
              [0, 1],
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 5,
            text: 'A group of Josie`s boyfriend',
            answer: 'ARIS',
            cells: [
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 6,
            text: 'Josie`s therapist',
            answer: 'CHAT',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
            ],
          },
          {
            number: 7,
            text: 'Harlen after his hangover',
            answer: 'SOBER',
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
            text: 'Code that is free, for short',
            answer: 'OSS',
            cells: [
              [4, 1],
              [4, 2],
              [4, 3],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: '“Yippee!”',
            answer: 'WAHOO',
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
            text: 'Many Egyptions',
            answer: 'ARABS',
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
            text: 'Ceremonies',
            answer: 'RITES',
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
            text: 'Nintendo Handled',
            answer: 'DS',
            cells: [
              [0, 4],
              [1, 4],
            ],
          },
          {
            number: 6,
            text: 'Stinkiest major at uni, for short',
            answer: 'CS',
            cells: [
              [2, 0],
              [3, 0],
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
