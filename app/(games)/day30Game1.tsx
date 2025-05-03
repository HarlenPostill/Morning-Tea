import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import ConnectionsGame from '@/components/games/ConnectionsGame';
import Confetti from 'react-native-confetti';

export default function Day30Game1() {
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={require('@assets/clue.png')} />
      <ConnectionsGame
        gameId="connections"
        title="Dan's Impossible challenge (clue above)"
        categories={[
          {
            id: 'places',
            name: 'Positive',
            words: ['GOOD', 'LUCK', 'HOPE', 'UPBEAT'],
            color: 'yellow',
          },
          {
            id: 'characters',
            name: '6 Letters',
            words: ['PUZZLE', 'ALMOST', 'AMELIE', 'ALL DAY'],
            color: 'green',
          },
          {
            id: 'family',
            name: '4 Letter words',
            words: ['THIS', 'HARD', 'YALL', 'STAY'],
            color: 'blue',
          },
          {
            id: 'songs',
            name: 'Words that don`t have the letter Z',
            words: ['IS', 'DO', 'WE', 'IMPOSSIBLE'],
            color: 'purple',
          },
        ]}
        onComplete={handleGameComplete}
      />
      <Confetti size={2} ref={confettiRef} />
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 100,
  },
});
