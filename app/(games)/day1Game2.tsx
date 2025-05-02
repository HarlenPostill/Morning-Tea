import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LaddersGame from '@/components/games/LaddersGame';

export default function Day1Game2() {
  return (
    <ThemedView style={styles.container}>
      <LaddersGame gameId={'day1game2'} title="Grub to Glam" startWord={'Grub'} goalWord={'Glam'} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
});
