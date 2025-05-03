import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day23Game1() {
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
        gameId="day23game1"
        title="Harlen's Connections"
        categories={[
          {
            id: 'places',
            name: 'Animal Crossing Fruits',
            words: ['APPLES', 'CHERRIES', 'PEACHES', 'ORANGES'],
            color: 'yellow',
          },
          {
            id: 'Berries',
            name: 'Hunger',
            words: ['STRAWBERRIES', 'BLUEBERRIES', 'BLACKBERRIES', 'RASPBERRIES'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'MarioKart 8 characters:',
            words: ['LINK', 'VILLAGER', 'ISABELL', 'INKLING'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Plushies',
            words: ['FRESH', 'CRAYON', 'GRUB', 'MIFFY'],
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
