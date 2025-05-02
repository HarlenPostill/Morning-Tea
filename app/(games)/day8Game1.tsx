import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day8Game1() {
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
        gameId="day8game1"
        title="Harlen's Connections"
        categories={[
          {
            id: 'mario',
            name: 'Mario bros characters',
            words: ['MARIO', 'LUIGI', 'YOSHI', 'PEACH'],
            color: 'yellow',
          },
          {
            id: 'fruits',
            name: 'Tropical fruits ',
            words: ['LYCHEE', 'BANANA', 'PINEAPPLE', 'DRAGON FRUIT'],
            color: 'green',
          },
          {
            id: 'elements',
            name: 'Website elements ',
            words: ['LINK', 'COOKIES', 'HEADER', 'FOOTER'],
            color: 'blue',
          },
          {
            id: 'trains',
            name: 'Train station with a metro platform',
            words: ['CENTRAL', 'EPPING', 'CHATSWOOD', 'SYDENHAM'],
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
