import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day11Game1() {
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
        gameId="day11game1"
        title="Alycia's Connections"
        categories={[
          {
            id: 'places',
            name: 'Made from wood',
            words: ['PENCIL', 'PAPER', 'MULCH', 'VIOLIN'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Green things',
            words: ['PICKLE', 'MOSS', 'PESTO', 'CHLOROPLAST'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Number six',
            words: ['NUT', 'INSECT', 'DICE', 'HONEYCOMB'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Powerhouse',
            words: ['MITOCHONDRIA', 'ADELE', 'MUSEUM', 'WHITNEY HOUSTON'],
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
