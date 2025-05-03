import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day29Game2() {
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
        gameId="day29game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Australian Television network',
            answer: 'ABC',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
            ],
          },
          {
            number: 4,
            text: '👅👅👅',
            answer: 'FREAK',
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
            text: 'Unpopular baby name',
            answer: 'ADOLF',
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
            text: 'Video game hedgehog',
            answer: 'SONIC',
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
            number: 2,
            text: 'Center-hole',
            answer: 'BIRDO',
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
            text: 'Australian Tropical holiday destination',
            answer: 'BALI',
            cells: [
              [1, 3],
              [2, 3],
              [3, 3],
              [4, 3],
            ],
          },
          {
            number: 4,
            text: 'Don`t drink while pregnant it causes ____, for short',
            answer: 'FAS',
            cells: [
              [2, 0],
              [3, 0],
              [4, 0],
            ],
          },
          {
            number: 5,
            text: 'Long, long time',
            answer: 'EON',
            cells: [
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 6,
            text: 'Harlen`s Namesake',
            answer: 'KFC',
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
