import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day23Game2() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame
        gameId={'day23game2'}
        title="Juno to Baby"
        startWord={'juno'}
        goalWord={'baby'}
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
