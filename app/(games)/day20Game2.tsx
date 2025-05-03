import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day20Game2() {
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
        gameId="day20game2"
        title="Harlen's ☕️"
        acrossClues={[
          {
            number: 1,
            text: 'A place for coffee and donuts',
            answer: 'SHORT',
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
            text: 'First year`s carry bag',
            answer: 'TOTE',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
            ],
          },
          {
            number: 6,
            text: 'Broadcasting',
            answer: 'ONAIR',
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
            text: 'Polyetherketones, for short 🤓',
            answer: 'PEK',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
            ],
          },
          {
            number: 8,
            text: 'What you don`t say when eating at short stop',
            answer: 'YUCK',
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
            text: 'Halt',
            answer: 'STOP',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
              [3, 0],
            ],
          },
          {
            number: 2,
            text: 'Sea salt`s best friend in a Cruller',
            answer: 'HONEY',
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
            text: 'Anime fanatic',
            answer: 'OTAKU',
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
            text: 'Blue haired in Evangelion',
            answer: 'REI',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
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
