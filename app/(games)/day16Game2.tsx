import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day16Game2() {
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
        gameId="day16game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'A place Harlen doesn`t want to work',
            answer: 'HEART',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 6,
            text: 'Acai place that crashed the Clio',
            answer: 'EATON',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 7,
            text: 'Professional Creative software creator',
            answer: 'ADOBE',
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
            text: 'Wendys hoarding obsession',
            answer: 'YARN',
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
            text: '“It`s too _____”',
            answer: 'HEAVY',
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
            text: 'Emergency Animal Disease, for short',
            answer: 'EAD',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
            ],
          },
          {
            number: 3,
            text: 'Entity taking small amounts each pay day, for short',
            answer: 'ATO',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
            ],
          },
          {
            number: 4,
            text: 'Andre`s bird lover',
            answer: 'ROBIN',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
              [4, 3],
            ],
          },
          {
            number: 7,
            text: 'Transnational Education, for short',
            answer: 'TNE',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
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
