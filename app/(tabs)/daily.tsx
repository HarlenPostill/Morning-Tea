import { StyleSheet, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AlternateScrollView from '@/components/AlternateScrollView';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <AlternateScrollView
      headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Daily Gauntlet</ThemedText>
      </ThemedView>
      <ThemedText>Try out today's daily gauntlet!</ThemedText>
      <Button title="First Game" onPress={() => router.push('/game')} color={Colors.light.tint} />
      <Button title="Second Game" onPress={() => router.push('/game')} color={Colors.light.tint} />
      <Button title="Third Game" onPress={() => router.push('/game')} color={Colors.light.tint} />
    </AlternateScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
