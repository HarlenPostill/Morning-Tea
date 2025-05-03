import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day29Game1() {
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
        gameId="day29game1"
        title="Dan's Insane Connection"
        categories={[
          {
            id: 'places',
            name: 'Prime Numbers',
            words: ['3', '13', '23', '61'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Even Numbers',
            words: ['24', '68', '942', '1065'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Odd numbers',
            words: ['9', '15', '1435', '3303'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Palindromes',
            words: ['22', '808', '4664', '31013'],
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
