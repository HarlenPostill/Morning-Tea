import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day6Game1() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame gameId={'day6game1'} title="Sand to Wich" startWord={'sand'} goalWord={'wich'} />
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
