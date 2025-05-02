import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day5Game2() {
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
        gameId="day5game2"
        title="Ari's Connections"
        categories={[
          {
            id: 'pets',
            name: 'Pets',
            words: ['PENGUIN', 'SISYPUSS', 'MURRAY', 'STEVIE'],
            color: 'yellow',
          },
          {
            id: 'milkshakes',
            name: 'Milkshake Flavours',
            words: ['VANILLA', 'CARAMEL', 'STRAWBERRY', 'CHOCLATE'],
            color: 'green',
          },
          {
            id: 'butter',
            name: 'Types of Butter',
            words: ['PEANUT', 'SALTED', 'WHIPPED', 'BROWNED'],
            color: 'blue',
          },
          {
            id: 'countries',
            name: 'Countries without the final A letter',
            words: ['CHIN', 'CUB', 'MALT', 'TONG'],
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
