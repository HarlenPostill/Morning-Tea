import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day21Game1() {
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
        gameId="day21game1"
        title="Tom's Sister's Connections"
        categories={[
          {
            id: 'places',
            name: 'Terms of Endearment',
            words: ['DEAR', 'HONEY', 'LOVE', 'SWEET'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Words that sound like letters',
            words: ['BEE', 'EYE', 'SEE', 'WHY'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Numbers but replace first letter with `H`',
            words: ['HIVE', 'HEN', 'HEAVEN', 'HATE'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Thing you can do to your hair',
            words: ['BUZZ', 'COMB', 'DRY', 'DYE'],
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
