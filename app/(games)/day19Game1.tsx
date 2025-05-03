import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day19Game1() {
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
      <ConnectionsGame
        gameId="day19game1"
        title="Dan's Connection"
        categories={[
          {
            id: 'places',
            name: 'Macca`s menu items starting with "MC"',
            words: ['NUGGET', 'FLURRY', 'MUFFIN', 'CHICKEN'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'To surround',
            words: ['WRAP', 'ENFOLD', 'HEMS', 'CIRCLE'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Lower your head',
            words: ['DUCK', 'STOOP', 'BOW', 'BOB'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Famous Chris`s',
            words: ['PINE', 'PRATT', 'ROCK', 'EVANS'],
            color: 'purple',
          },
        ]}
        onComplete={handleGameComplete}
      />
      <Confetti size={2} ref={confettiRef} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
});
