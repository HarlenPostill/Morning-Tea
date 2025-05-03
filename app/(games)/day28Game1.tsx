import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day28Game1() {
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
        gameId="day28game1"
        title="Harlen's Connection"
        categories={[
          {
            id: 'places',
            name: 'Instagram screens',
            words: ['EXPLORE', 'REELS', 'DMS', 'HOME FEED'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: 'TikTok screens',
            words: ['FOR YOU', 'FOLLOWING', 'EXPLORE', 'FRIENDS'],
            color: 'green',
          },
          {
            id: 'family',
            name: 'Sea Life exhibits',
            words: ['JELLYFISH', 'PENGUIN', 'DUGONG', 'SHARK'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'The first word of 2 word slowly slowly songs',
            words: ['ALL', 'FORGIVING', 'DAISY', 'SUNBURNT'],
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
