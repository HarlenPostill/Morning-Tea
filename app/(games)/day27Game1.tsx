import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day27Game1() {
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
        gameId="day27game1"
        title="Harlen's Connection"
        categories={[
          {
            id: 'places',
            name: 'First word of Choclates',
            words: ['AREO', 'KIT', 'MALT', 'FURRY'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'Animal Crossing Tools',
            words: ['AXE', 'SHOVEL', 'FISHING ROD', 'NET'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Train Stations with a line switch',
            words: ['HORNSBY', 'STRATHFIELD', 'CENTRAL', 'WOLICREEK'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Train stations without lifts',
            words: ['TEMPE', 'TASCOTT', 'LOFTUS', 'VILLAWOOD'],
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
