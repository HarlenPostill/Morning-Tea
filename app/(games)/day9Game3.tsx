import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day9Game3() {
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
        gameId="day9game3"
        title="Harlen's Mini!"
        acrossClues={[
          {
            number: 1,
            text: 'Classic fantasy role-playing game, for short',
            answer: 'DND',
            cells: [
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 4,
            text: 'E-mail address ending',
            answer: 'EDU',
            cells: [
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 5,
            text: 'Plumber of video games',
            answer: 'MARIO',
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
            text: 'Navigation aid, for short',
            answer: 'GPS',
            cells: [
              [3, 1],
              [3, 2],
              [3, 3],
            ],
          },
          {
            number: 8,
            text: 'Happiness',
            answer: 'JOY',
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
            text: 'Awkward, in internet slang',
            answer: 'DERPY',
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
            text: 'Investigated by you for cutting funding',
            answer: 'NDIS',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
            ],
          },
          {
            number: 3,
            text: 'Twosome',
            answer: 'DUO',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 6,
            text: '"Long ___ and Far Away"',
            answer: 'AGO',
            cells: [
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
