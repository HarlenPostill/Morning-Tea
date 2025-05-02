import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day9Game1() {
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
        gameId="day9game1"
        title="Brad's Connections"
        categories={[
          {
            id: 'card',
            name: '___ Card',
            words: ['CREDIT', 'TAROT', 'PLAYING', 'POST'],
            color: 'yellow',
          },
          {
            id: 'cards',
            name: 'Card games',
            words: ['HEARTS', 'SPADES', 'BRIDGE', 'SNAP'],
            color: 'green',
          },
          {
            id: 'fish',
            name: '___ Fish',
            words: ['CAT', 'GOLD', 'SWORD', 'PUFFER'],
            color: 'blue',
          },
          {
            id: 'easy',
            name: 'Easy ___',
            words: ['MONEY', 'LISTENING', 'GOING', 'TARGET'],
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
