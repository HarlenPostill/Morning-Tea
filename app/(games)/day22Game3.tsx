import { StyleSheet, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import CustomWordle from '@/components/games/CustomWordle';
import { useRef, useState } from 'react';
import Confetti from 'react-native-confetti';

export default function Day22Game3() {
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
    <>
      <ThemedView style={styles.container}>
        <Text style={styles.gameTitle}>Fio's Wordle!</Text>
        <CustomWordle
          dailyWord="cats"
          gameId="day22game3"
          maxAttempts={6}
          onGameEnd={handleGameComplete}
        />
      </ThemedView>
      <Confetti size={2} ref={confettiRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  gameTitle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.8,
    marginBottom: 20,
  },
});
