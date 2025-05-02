import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day12Game1() {
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
        gameId="day12game1"
        title="Harlen's Connections"
        categories={[
          {
            id: 'places',
            name: 'First names of Animal Crossing characters',
            words: ['CELESTE', 'TOM', 'TIMMY', 'TOMMY'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'First word of Australian Bikkies',
            words: ['TIM', 'MINT', 'LEMON', 'MONTY'],
            color: 'green',
          },
          {
            id: 'family',
            name: '____ Rivers',
            words: ['MURRAY', 'NILE', 'AMAZON', 'MISSISSIPPI'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Nintendo Platforming Games',
            words: ['MARIO WONDER', 'DK COUNTRY', 'KIRBY', 'MARIO BROS'],
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
