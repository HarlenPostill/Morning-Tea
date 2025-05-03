import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day25Game1() {
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
        gameId="day25game1"
        title="Dan's Connection"
        categories={[
          {
            id: 'places',
            name: 'Palindromes',
            words: ['REVIVER', 'KAYAK', 'LEVEL', 'CIVIC'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Female titles (also palindromes)',
            words: ['MADAM', 'NAN', 'NUN', 'MOM'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Family members (more palindromes)',
            words: ['MUM', 'DAD', 'BUB', 'POP'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Non-Palindromes (that form a palindrome sentence)',
            words: ['NEVER', 'ODD', 'OR', 'EVEN'],
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
