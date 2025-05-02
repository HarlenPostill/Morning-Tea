import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day2Game2() {
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
        gameId="day2game2"
        title="Harlen's Mini"
        acrossClues={[
          {
            number: 1,
            text: '6th Postill',
            answer: 'OBI',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
            ],
          },
          {
            number: 3,
            text: 'Pet auto battler (abbr.)',
            answer: 'SAP',
            cells: [
              [1, 2],
              [1, 3],
              [1, 4],
            ],
          },
          {
            number: 5,
            text: 'The Richies now all say it',
            answer: 'LOUIE',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
              [3, 3],
              [3, 4],
            ],
          },
          {
            number: 7,
            text: 'Living-room items',
            answer: 'TVS',
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
            text: 'Colgate alternative',
            answer: 'ORALB',
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
            text: 'Friend Steph`s Phase',
            answer: 'ISLUT',
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
            text: 'Find them in the depth in TOTK',
            answer: 'POES',
            cells: [
              [1, 4],
              [2, 4],
              [3, 4],
              [4, 4],
            ],
          },
          {
            number: 6,
            text: 'Medical. Probably in your arm',
            answer: 'IV',
            cells: [
              [3, 3],
              [4, 3],
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
