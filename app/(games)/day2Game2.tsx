import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day2Game2() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame
        gameId={'day2game2'}
        title="Harlen's Ladders 🗣️"
        startWord={'reel'}
        goalWord={'slat'}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
});
