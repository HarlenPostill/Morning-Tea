import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ConnectionsGame from "@/components/games/ConnectionsGame";
import Confetti from "react-native-confetti";

export default function Day1Game2() {
  const [gameWon, setGameWon] = useState(false);
  const confettiRef = useRef<Confetti | null>(null);

  const handleGameComplete = (
    success: boolean | ((prevState: boolean) => boolean)
  ) => {
    setGameWon(success);
    if (success && confettiRef.current) {
      confettiRef.current.startConfetti();
    } else if (confettiRef.current) {
      confettiRef.current.stopConfetti();
    }
    console.log(success ? "Won!" : "Lost!");
  };

  return (
    <ThemedView style={styles.container}>
      <ConnectionsGame
        gameId="day1game1"
        title="Harlens Connection"
        categories={[
          {
            id: "fruits",
            name: "Fruits",
            words: ["Apple", "Banana", "Cherry", "Durian"],
            color: "yellow",
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
        onComplete={handleGameComplete}
      />
      <Confetti size={2} ref={confettiRef} />
    </ThemedView>
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
