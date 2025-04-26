import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import CustomWordle from '@/components/games/CustomWordle';

export default function Day1Game2() {
  return (
    <>
      <ThemedView style={styles.container}>
        <CustomWordle
          dailyWord="love"
          gameId="day1game2"
          maxAttempts={6}
          onGameEnd={won => console.log(won ? 'Game won!' : 'Game lost!')}
        />
      </ThemedView>
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
