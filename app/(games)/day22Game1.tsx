import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day22Game1() {
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
        gameId="day22game1"
        title="Brad's Connection"
        categories={[
          {
            id: 'places',
            name: 'Good ____',
            words: ['NIGHT', 'EVENING', 'MORNING', 'DAY'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Baked',
            words: ['BREAD', 'CAKE', 'CLAY', 'COCAINE'],
            color: 'green',
          },
          {
            id: 'family',
            name: '___Day',
            words: ['TO', 'CHRISTMAS', 'BIRTH', 'NEW YEARS'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Words with 4 E`s',
            words: ['SEVENTEEN', 'REVERENCE', 'SWEETENED', 'BEEKEEPING'],
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
