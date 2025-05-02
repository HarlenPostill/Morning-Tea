import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day15Game1() {
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
        gameId="day15game1"
        title="Tom's Sister's Connections"
        categories={[
          {
            id: 'places',
            name: 'To Ruin Something',
            words: ['MANGLE', 'RUIN', 'SPOIL', 'WREK'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Things in Plants vs Zombies',
            words: ['COFFEE', 'PEPPER', 'SUNFLOWER', 'ZOMBIE'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Last Names of People called Billy',
            words: ['BUTCHER', 'JEAN', 'JOEL', 'PIPER'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Related to Covid-19',
            words: ['INFECT', 'RAT', 'TEST', 'VACCINE'],
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
