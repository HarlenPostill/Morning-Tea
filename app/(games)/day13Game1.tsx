import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day13Game1() {
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
        gameId="day13game1"
        title="Brad's Connection"
        categories={[
          {
            id: 'places',
            name: 'Tools for cleaning',
            words: ['BROOM', 'MOP', 'SPONGE', 'GLOVES'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Literally nothing there',
            words: ['VACUUM', 'NOTHING', 'VOID', 'VACANCY'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Come in Pairs',
            words: ['PANTS', 'EYE', 'SOCK', 'SCISSOR'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'On your Finger',
            words: ['RING', 'NAIL', 'POLISH', 'SOMETHING'],
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
