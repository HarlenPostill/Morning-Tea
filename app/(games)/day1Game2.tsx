import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomWordle from '@/components/games/CustomWordle';

export default function Day1Game2() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Harlen's Wordle</ThemedText>
        <CustomWordle
          dailyWord="yoyo"
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
    alignItems: 'center',
    marginTop: 100,

    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
