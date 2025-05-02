import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day3Game2() {
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
        gameId="day3game2"
        title="Harlen's Connection"
        categories={[
          {
            id: 'andre',
            name: 'Places you can find Andre',
            words: ['Japan', 'gym', 'uts', 'rachel`s DMs'],
            color: 'yellow',
          },
          {
            id: 'apple',
            name: 'Apple products without i',
            words: ['pod', 'pad', 'mac', 'phone'],
            color: 'green',
          },
          {
            id: 'movie',
            name: 'Movie Theature Snacks',
            words: ['popcorn', 'm&ms', 'Malteesers', 'choc top'],
            color: 'blue',
          },
          {
            id: 'countries',
            name: 'Countries that drive on the Right',
            words: ['USA', 'france', 'china', 'south korea'],
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
