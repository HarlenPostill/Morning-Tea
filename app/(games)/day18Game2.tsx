import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day18Game2() {
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
        gameId="day18game2"
        title="Belinda's Mini!"
        acrossClues={[
          {
            number: 1,
            text: 'Nina Proudmans Dad',
            answer: 'DARCY',
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
            text: 'When Nina eats breakfast',
            answer: 'AM',
            cells: [
              [1, 0],
              [1, 1],
            ],
          },
          {
            number: 6,
            text: 'Biological scientific abbreviation for egg or ovum',
            answer: 'OO',
            cells: [
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 7,
            text: 'Main character in offspring',
            answer: 'NINA',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
            ],
          },
          {
            number: 9,
            text: 'Online tech magazine',
            answer: 'CNET',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
            ],
          },
          {
            number: 10,
            text: '`Perfect` actor to play Mick Holland in Offspring',
            answer: 'EDDIE',
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
            text: 'Move in time with music',
            answer: 'DANCE',
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
            text: 'An essential thing to possess if you want to be an Obstetrician',
            answer: 'AMIND',
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
            text: 'Small furry South American animal',
            answer: 'COATI',
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
            text: 'Slang for hello',
            answer: 'YO',
            cells: [
              [0, 4],
              [1, 4],
            ],
          },
          {
            number: 8,
            text: 'Homer Simpson`s neighbour',
            answer: 'NED',
            cells: [
              [2, 2],
              [3, 2],
              [4, 2],
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
