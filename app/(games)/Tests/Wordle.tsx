import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import CustomWordle from '@/components/games/CustomWordle';
import { useRef, useState } from 'react';
import Confetti from 'react-native-confetti';

export default function Wordle() {
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
        <CustomWordle
          dailyWord="love"
          gameId="wordle"
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
});
