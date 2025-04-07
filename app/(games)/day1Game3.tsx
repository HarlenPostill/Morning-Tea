import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ConnectionsGame from '@/components/games/ConnectionsGame';

export default function Day1Game2() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Conncections</ThemedText>
        <ConnectionsGame
          gameId="day1game1"
          categories={[
            {
              id: 'fruits',
              name: 'Fruits',
              words: ['Apple', 'Banana', 'Cherry', 'Durian'],
              color: 'yellow', // Optional: yellow, green, blue, or purple
            },
            {
              id: 'vegetables',
              name: 'Vegetables',
              words: ['Carrot', 'Broccoli', 'Spinach', 'Cucumber'],
              color: 'green',
            },
            {
              id: 'animals',
              name: 'Animals with particularly long names that will wrap',
              words: ['Elephant', 'Rhinoceros', 'Hippopotamus', 'Giraffe'],
              color: 'blue',
            },
            {
              id: 'cities',
              name: 'Cities',
              words: ['Tokyo', 'Paris', 'London', 'New York'],
              color: 'purple',
            },
          ]}
          maxAttempts={4}
          onComplete={success => console.log(success ? 'Won!' : 'Lost!')}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    padding: 20,
  },
});
