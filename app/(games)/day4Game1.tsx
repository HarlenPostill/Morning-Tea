import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day4Game1() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame gameId={'day4game1'} title="Four to Five" startWord={'four'} goalWord={'five'} />
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
