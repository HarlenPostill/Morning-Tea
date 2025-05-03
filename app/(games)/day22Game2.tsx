import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day22Game2() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame
        gameId={'day22game2'}
        title="Mint to Sand"
        startWord={'mint'}
        goalWord={'sand'}
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
