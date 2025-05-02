import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day3Game1() {
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
        gameId="day3game1"
        title="Andre's Connection"
        categories={[
          {
            id: 'games',
            name: 'Currencies in video games',
            words: ['GOLD', 'COINS', 'RUPEES', 'BELLS'],
            color: 'yellow',
          },
          {
            id: 'animals',
            name: 'Crafting materials in animal crossing',
            words: ['WOOD', 'STONE', 'ORE', 'CLAY'],
            color: 'green',
          },
          {
            id: 'items',
            name: 'Key items in animal crossing',
            words: ['SLINGSHOT', 'SHOVEL', 'LADDER', 'NET'],
            color: 'blue',
          },
          {
            id: 'picnic',
            name: 'Things that went wrong on our picnic',
            words: ['ANTS', 'POOP', 'HEAT', 'SPILLs'],
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
