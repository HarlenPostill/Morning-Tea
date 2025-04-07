import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MiniCrossword } from '@/components/games/MiniCrossword';

export default function Day2Game1() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title">The Mini</ThemedText>
        <MiniCrossword
          gameId="day1game1"
          acrossClues={[
            {
              number: 1,
              text: 'Taxi',
              answer: 'CAB',
              cells: [
                [0, 0],
                [0, 1],
                [0, 2],
              ],
            },
            {
              number: 4,
              text: 'Expression of surprise',
              answer: 'WOW',
              cells: [
                [1, 0],
                [1, 1],
                [1, 2],
              ],
            },
            {
              number: 7,
              text: 'Computer file name extension',
              answer: 'DOC',
              cells: [
                [2, 2],
                [2, 3],
                [2, 4],
              ],
            },
            {
              number: 8,
              text: 'Spherical object',
              answer: 'BALL',
              cells: [
                [3, 0],
                [3, 1],
                [3, 2],
                [3, 3],
              ],
            },
            {
              number: 9,
              text: 'Consume',
              answer: 'EAT',
              cells: [
                [4, 2],
                [4, 3],
                [4, 4],
              ],
            },
          ]}
          downClues={[
            {
              number: 1,
              text: 'Nocturnal flying mammal',
              answer: 'BAT',
              cells: [
                [0, 0],
                [1, 0],
                [2, 0],
              ],
            },
            {
              number: 2,
              text: 'Unit of corn',
              answer: 'COB',
              cells: [
                [0, 1],
                [1, 1],
                [2, 1],
              ],
            },
            {
              number: 3,
              text: 'Small carpet',
              answer: 'MAT',
              cells: [
                [0, 2],
                [1, 2],
                [2, 2],
              ],
            },
            {
              number: 5,
              text: 'Informal negative',
              answer: 'NOPE',
              cells: [
                [1, 3],
                [2, 3],
                [3, 3],
                [4, 3],
              ],
            },
            {
              number: 6,
              text: 'Distant',
              answer: 'FAR',
              cells: [
                [2, 4],
                [3, 4],
                [4, 4],
              ],
            },
          ]}
          onComplete={time => console.log(`Completed in ${time} seconds`)}
          // Optional custom theme
          theme={{
            cellSelectedColor: '#a7d8ff',
            cellBackgroundColor: '#ffffff',
          }}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
  },
});
