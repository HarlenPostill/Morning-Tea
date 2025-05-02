import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day14Game1() {
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
        gameId="day14game1"
        title="Tom's Connections"
        categories={[
          {
            id: 'places',
            name: 'Camera Settings',
            words: ['RESOLUTION', 'APERTURE', 'ISO', 'SHUTTER'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Famous Doctors',
            words: ['HOUSE', 'JEKYLL', 'EGGMAN', 'DOOM'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Red characters',
            words: ['MARIO', 'ELMO', 'SPIDERMAN', 'FLASH'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'The ___ (Classic Rock Bands)',
            words: ['WHO', 'DOORS', 'CLASH', 'KINKS'],
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
