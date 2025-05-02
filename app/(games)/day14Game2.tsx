import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';
import { useState, useRef } from 'react';
import Confetti from 'react-native-confetti';

export default function Day14Game1() {
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
        gameId="day14game1"
        title="Tom's Mini"
        acrossClues={[
          {
            number: 1,
            text: 'Designated NYT crossword dealer and best friend, to Amelie',
            answer: 'TOM',
            cells: [
              [0, 1],
              [0, 2],
              [0, 3],
            ],
          },
          {
            number: 4,
            text: 'Lots of greetings and farewells, to Mario and Luigi',
            answer: 'CIAOS',
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
            text: 'Mary-Kate and Ashley twins surname, but the author can`t spell their surname',
            answer: 'OLSON',
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
            text: 'Reddit subreddit with tagline, "Selfies of the Soul"',
            answer: 'MEIRL',
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
            text: 'Road Safety Education website: __.org.au',
            answer: 'RSE',
            cells: [
              [4, 1],
              [4, 2],
              [4, 3],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Mosaicist',
            answer: 'TILER',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 2,
            text: 'Wonderwall hitmakers found refuge in the desert?',
            answer: 'OASIS',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
              [4, 2],
            ],
          },
          {
            number: 3,
            text: '007 after Connery',
            answer: 'MOORE',
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
            text: 'Commerical website indicator, for short',
            answer: 'COM',
            cells: [
              [1, 0],
              [2, 0],
              [3, 0],
            ],
          },
          {
            number: 5,
            text: '"Weekend Update" show, for short',
            answer: 'SNL',
            cells: [
              [1, 4],
              [2, 4],
              [3, 4],
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
