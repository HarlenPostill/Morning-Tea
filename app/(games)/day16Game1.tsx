import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day16Game1() {
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
        gameId="day16game1"
        title="Lilly's Connections"
        categories={[
          {
            id: 'places',
            name: 'Words that mean ‘wind’:',
            words: ['GALE', 'DRAFT', 'BLOW', 'GUST'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Minecraft mobs:',
            words: ['GROUND BEEF', 'PULLED PORK', 'BEEF BRISKET', 'MUSHROOMS'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'GYG fillings',
            words: ['ZOMBIE', 'CREEPER', 'CHICKEN', 'ENDERMAN'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Flowering plants',
            words: ['PRIMROSE', 'KATNISS', 'DANDELION', 'RUE'],
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
