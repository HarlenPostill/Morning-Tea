import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day24Game3() {
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
        gameId="day24game2"
        title="Tom's Connections"
        categories={[
          {
            id: 'places',
            name: 'ASSIGNMENT EVALUATION',
            words: ['MARKS', 'GRADE', 'POINTS', 'SCORE'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'IMMOBILE',
            words: ['TRAPPED', 'CONFINED', 'SET', 'FASTENED'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'FULLY FOCUSED',
            words: ['LOCKED IN', 'ATTENTIVE', 'DIALLED', 'READY'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'GREEN LIGHT WORDS',
            words: ['GO', 'START', 'PROCEED', 'ADVANCE'],
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
