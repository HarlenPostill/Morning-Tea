import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';

export default function Day2Game1() {
  return (
    <ThemedView style={styles.container}>
      <MiniCrossword
        gameId="day1game1"
        acrossClues={[
          {
            number: 1,
            text: 'Doomscrolling',
            answer: 'REELS',
            cells: [
              [0, 0],
              [0, 1],
              [0, 2],
              [0, 3],
              [0, 4],
            ],
          },
          {
            number: 5,
            text: 'Songs from Mamma Mia',
            answer: 'ABBA',
            cells: [
              [1, 0],
              [1, 1],
              [1, 2],
              [1, 3],
            ],
          },
          {
            number: 6,
            text: 'Mushroom Kingdom Residents',
            answer: 'TOADS',
            cells: [
              [2, 0],
              [2, 1],
              [2, 2],
              [2, 3],
              [2, 4],
            ],
          },
          {
            number: 8,
            text: ' Milk Alternative Ingredient',
            answer: 'SOY',
            cells: [
              [3, 0],
              [3, 1],
              [3, 2],
            ],
          },
          {
            number: 9,
            text: 'Santa Likes them?',
            answer: 'HO',
            cells: [
              [4, 3],
              [4, 4],
            ],
          },
        ]}
        downClues={[
          {
            number: 1,
            text: 'Mascot Squatter',
            answer: 'RATS',
            cells: [
              [0, 0],
              [1, 0],
              [2, 0],
              [3, 0],
            ],
          },
          {
            number: 2,
            text: 'Kindling material?',
            answer: 'EBOOK',
            cells: [
              [0, 1],
              [1, 1],
              [2, 1],
              [3, 1],
              [4, 1],
            ],
          },
          {
            number: 3,
            text: 'A Place to find GIRLS',
            answer: 'EBAY',
            cells: [
              [0, 2],
              [1, 2],
              [2, 2],
              [3, 2],
            ],
          },
          {
            number: 4,
            text: 'A mate or buddy',
            answer: 'LAD',
            cells: [
              [0, 3],
              [1, 3],
              [2, 3],
            ],
          },
          {
            number: 7,
            text: 'Salty Cracker',
            answer: 'SAO',
            cells: [
              [2, 4],
              [3, 4],
              [4, 4],
            ],
          },
        ]}
        onComplete={time => console.log(`Completed in ${time} seconds`)}
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
