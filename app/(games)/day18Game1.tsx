import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day18Game1() {
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
        gameId="day18game1"
        title="Dan's Connection"
        categories={[
          {
            id: 'places',
            name: 'Types of Tea',
            words: ['PEPPERMINT', 'CAMOMILE', 'BLACK', 'ICE'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Things with handles',
            words: ['TEA POT', 'BICYCLE', 'DOOR', 'CUTTLE PROD'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Things that come out of a cow',
            words: ['MILK', 'CALF', 'POO', 'METHANE'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Royal titles',
            words: ['EARL', 'SULTANA', 'MARQUIS', 'DUTCHESS'],
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
