import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day2Game1() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame gameId={'day2game1'} title="Book to Page" startWord={'book'} goalWord={'page'} />
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
