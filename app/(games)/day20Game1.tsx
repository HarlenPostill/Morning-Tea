import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day20Game1() {
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
        gameId="day20game1"
        title="Harlen's Connection"
        categories={[
          {
            id: 'places',
            name: 'Ingredients in short stop treats',
            words: ['EARL GREY', 'HONEY', 'SEA SALT', 'MATCHA'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Items sold at short stop',
            words: ['DOUNUTS', 'MUGS', 'DRINKS', 'COFFEE GROUNDS'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Coffee options at short stop',
            words: ['CAPPUCCINO', 'MOCHA', 'FLAT WHITE', 'LONG BLACK'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Short Stop Locations',
            words: ['MELBOURNE', 'DARLING SQUARE', 'HAMILTON', 'BARRANGAROO'],
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
