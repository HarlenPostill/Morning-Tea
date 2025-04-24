import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ConnectionsGame from "@/components/games/ConnectionsGame";

export default function Day1Game2() {
  return (
    <>
      <ThemedView style={styles.container}>
        <ConnectionsGame
          gameId="day1game1"
          categories={[
            {
              id: "fruits",
              name: "Fruits",
              words: ["Apple", "Banana", "Cherry", "Durian"],
              color: "yellow", // Optional: yellow, green, blue, or purple
            },
            {
              id: "vegetables",
              name: "Vegetables",
              words: ["Carrot", "Broccoli", "Spinach", "Cucumber"],
              color: "green",
            },
            {
              id: "animals",
              name: "Animals with particularly long names that will wrap",
              words: ["Elephant", "Rhinoceros", "Hippopotamus", "Giraffe"],
              color: "blue",
            },
            {
              id: "cities",
              name: "Cities",
              words: ["Tokyo", "Paris", "London", "New York"],
              color: "purple",
            },
          ]}
          onComplete={(success) => console.log(success ? "Won!" : "Lost!")}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
