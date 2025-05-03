import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day27Game2() {
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
        gameId="day27game2"
        title="Harlen's Crossword"
        acrossClues={[
          {
            number: 1,
            text: 'ABC`s cousin',
            answer: 'SBS',
            cells: [
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 4,
            text: 'League of legends creator; "____ games"',
            answer: 'RIOT',
            cells: [
              [1, 1],
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 5,
            text: 'Professional Web Design Software',
            answer: 'FIGMA',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
              [2, 4],
            ],
          },
          {
            number: 6,
            text: 'Lara crofts domain',
            answer: 'TOMB',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
            ],
          },
          {
            number: 7,
            text: 'marketing call out to do something, for short',
            answer: 'CTA',
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
            text: 'Gen Alpha brain rot term',
            answer: 'SIGMA',
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
            text: 'Flop',
            answer: 'BOMB',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
              [3, 3],
            ],
          },
          {
            number: 3,
            text: 'Temporary short Accommodations from NDIS, for short',
            answer: 'STA',
            cells: [
              [0, 4],
              [1, 4],
              [2, 4],
            ],
          },
          {
            number: 4,
            text: 'Valorant`s creator; "____ games"',
            answer: 'RIOT',
            cells: [
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 5,
            text: 'American trade commission, for short',
            answer: 'FTC',
            cells: [
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
