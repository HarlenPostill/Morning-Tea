import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day17Game2() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame
        gameId={'day17game2'}
        title="Reel to Slut"
        startWord={'reel'}
        goalWord={'slut'}
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
