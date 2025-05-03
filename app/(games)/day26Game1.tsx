import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day26Game1() {
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
        gameId="day26game1"
        title="Tom's Connections"
        categories={[
          {
            id: 'places',
            name: 'WORDS WE`D USE TO DESCRIBE AMELIE',
            words: ['GOAT', 'LEGEND', 'BEAST', 'BOSS'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'WAYS TO TAKE CARE OF A PLANT',
            words: ['WATER', 'FEED', 'PRUNE', 'TRIM'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'VIDEO GAME TERMS',
            words: ['SPAWN', 'LIVES', 'NOOB', 'NBC'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'PHONETICALLY SOUNDS LIKE INSTRUMENTS',
            words: ['SYMBOL', 'BASE', 'SNACKS', 'LOOT'],
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
