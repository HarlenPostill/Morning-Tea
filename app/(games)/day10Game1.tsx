import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day10Game1() {
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
        gameId="day10game1"
        title="Dan's Connections"
        categories={[
          {
            id: 'stop',
            name: 'Stop',
            words: ['HEEL', 'HOLD', 'CEASE', 'HALT'],
            color: 'yellow',
          },
          {
            id: 'feet',
            name: 'THINGS ON DAN`S FEET',
            words: ['SOCKS', 'NAILS', 'TOE', 'CALLUS'],
            color: 'green',
          },
          {
            id: 'part',
            name: 'FOR THE MOST PART',
            words: ['MOSTLY', 'OFTEN', 'CHIEFLY', 'PRINCIPALLY'],
            color: 'blue',
          },
          {
            id: 'anagrams',
            name: 'ANAGRAMS',
            words: ['ALLERGY', 'GALLERY', 'LARGELY', 'REGALLY'],
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
