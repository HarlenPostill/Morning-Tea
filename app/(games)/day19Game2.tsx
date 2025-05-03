import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day19Game2() {
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
        gameId="day19game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'Labor Party`s Top guy',
            answer: 'ALBO',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
              [0, 3],
            ],
          },
          {
            number: 5,
            text: 'Open, as an egg',
            answer: 'CRACK',
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
            text: 'Telstra and Optus',
            answer: 'ISP',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
            ],
          },
          {
            number: 9,
            text: 'Rupaul`s race',
            answer: 'DRAG',
            cells: [
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
            text: 'Best Texture in Sydney',
            answer: 'ACAI',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
              [3, 0],
            ],
          },
          {
            number: 2,
            text: 'Two directions',
            answer: 'LR',
            cells: [
              [0, 1],
              [1, 1],
            ],
          },
          {
            number: 3,
            text: 'Cause for damange control',
            answer: 'BADPR',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 4,
            text: 'A Furry`s baby',
            answer: 'OC',
            cells: [
              [0, 3],
              [1, 3],
            ],
          },
          {
            number: 6,
            text: 'Princess` dad',
            answer: 'KING',
            cells: [
              [1, 4],
              [2, 4],
              [3, 4],
              [4, 4],
            ],
          },
          {
            number: 8,
            text: 'The best card for photos',
            answer: 'SD',
            cells: [
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
