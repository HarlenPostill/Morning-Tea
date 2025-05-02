import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day1Game1() {
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
        gameId="day1game1"
        title="Harlen's Connection"
        categories={[
          {
            id: 'plushies',
            name: 'Names of Plushies',
            words: ['CRAYON', 'MIFFY', 'QUEBBIN', 'BABY FRESH'],
            color: 'yellow',
          },
          {
            id: 'dinners',
            name: 'Dinners that Start with Chicken',
            words: ['SHNITZEL', 'SOUP', 'KIEV', 'ALFREDO'],
            color: 'green',
          },
          {
            id: 'mario',
            name: 'Mario Enemies',
            words: ['GOOMBA', 'KOOPA', 'BLOOPER', 'BOO'],
            color: 'blue',
          },
          {
            id: 'movies',
            name: 'Movie Marketing Materials',
            words: ['TRAILER', 'POSTER', 'INTERVIEW', 'TEASER'],
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
