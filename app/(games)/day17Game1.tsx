import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day17Game1() {
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
        gameId="day17game1"
        title="Harlen's Connection"
        categories={[
          {
            id: 'places',
            name: 'Hollownight',
            words: ['Dirtmout', 'Greenpath', 'Deepnest', 'City'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Hunger',
            words: ['Peeta', 'Coriolanus', 'Haymitch', 'Katniss'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Family',
            words: ['Lois', 'Brian', 'Chris', 'Stewie'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Melodrama',
            words: ['Sober', 'Supercut', 'Green', 'Perfect'],
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
