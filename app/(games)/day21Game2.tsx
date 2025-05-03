import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day21Game2() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame
        gameId={'day21game2'}
        title="Head to Toes"
        startWord={'head'}
        goalWord={'toes'}
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
