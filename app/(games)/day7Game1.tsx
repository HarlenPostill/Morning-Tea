import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day7Game1() {
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
        gameId="day7game1"
        title="Nina's Connections"
        categories={[
          {
            id: 'songs',
            name: 'Hozier songs',
            words: ['CHURCH', 'EDEN', 'JACKIE', 'ANGEL'],
            color: 'yellow',
          },
          {
            id: 'food',
            name: 'Food we ate together',
            words: ['CAKE', 'CHICKEN', 'FRIES', 'SALAD'],
            color: 'green',
          },
          {
            id: 'leads',
            name: 'Female leads in movies we`ve seen',
            words: ['SOPHIE', 'ALMUT', 'QUEENIE', 'THERRU'],
            color: 'blue',
          },
          {
            id: 'names',
            name: 'Code names for people from high school',
            words: ['DONUT', 'MILK', 'EGG', 'MOO'],
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
