import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day17Game3() {
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
        gameId="day17game3"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Best Pal',
            answer: 'BUD',
            cells: [
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 4,
            text: 'Japanese Beer',
            answer: 'ASAHI',
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
            text: 'The app with the most cluttered thoughts',
            answer: 'NOTES',
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
            text: 'Denial',
            answer: 'NUHUH',
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
            text: 'Ethan’s best impression',
            answer: 'APE',
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
            text: 'Soak in the tub',
            answer: 'BATHE',
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
            text: 'Latin interjection',
            answer: 'UHEU',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
            ],
          },
          {
            number: 3,
            text: 'Dinner platter',
            answer: 'DISH',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
              [3, 4],
            ],
          },
          {
            number: 4,
            text: 'Housemate from Hell',
            answer: 'ANNA',
            cells: [
              [1, 0],
              [2, 0],
              [3, 0],
              [4, 0],
            ],
          },
          {
            number: 5,
            text: 'Liquid Dinner',
            answer: 'SOUP',
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
