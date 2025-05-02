import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day15Game2() {
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
        gameId="day15game2"
        title="Tom's Crossword"
        acrossClues={[
          {
            number: 1,
            text: '___ropology, the study of humanity',
            answer: 'ANTH',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
              [0, 3],
            ],
          },
          {
            number: 5,
            text: 'Senator Organa`s adopted daughter, child of Anakin Skywalker and Padme Amidala',
            answer: 'LEIA',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
            ],
          },
          {
            number: 6,
            text: 'I peed, I pooed, ____',
            answer: 'IPAID',
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
            text: '"It`s me, hi, I`m the problem, it`s me" song name, first word',
            answer: 'ANTI',
            cells: [
              [3, 1],
              [3, 2],
              [3, 3],
              [3, 4],
            ],
          },
          {
            number: 9,
            text: 'Got lucky in bed - eggs not involved!',
            answer: 'LAID',
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
            text: 'Muhammad "the greatest"___',
            answer: 'ALI',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
            ],
          },
          {
            number: 2,
            text: 'Only official non-quadrilateral country flag',
            answer: 'NEPAL',
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
            text: 'Amphibian kink, maybe',
            answer: 'TIANA',
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
            text: 'Country in the Caribbean, east of Cuba',
            answer: 'HAITI',
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
            text: 'Salty Cracker',
            answer: 'DID',
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
