import { MiffyText } from "@/components/MiffyText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function Slide5() {
  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            gap: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
          }}
        >
          <MiffyText
            color={Colors.miffyPrimary}
            text={"Over 90 custom NYT style Puzzles"}
          />
          <MiffyText
            color={Colors.miffyAccent}
            text={"With 60 of them made by Harlen"}
          />
          <MiffyText
            color={Colors.miffySeconday}
            text={"And 30 celebrity guest puzzles"}
          />
          <Image
            style={styles.jasmineTopRight}
            source={require("@assets/jasmine-min.png")}
          />
          <Image
            style={styles.jasmineBottomLeft}
            source={require("@assets/jasmine-min.png")}
          />
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 705,
            gap: 8,
            right: 45,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          <MiffyText color={Colors.miffySeconday} text="Next" />
          <IconSymbol
            name={"chevron.forward.circle.fill"}
            size={30}
            color={Colors.miffySeconday}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  jasmineTopRight: {
    position: "absolute",
    top: -80,
    right: -30,
    transform: [{ scaleY: -1 }],
  },
  jasmineBottomLeft: {
    position: "absolute",
    bottom: -70,
    left: -55,
    transform: [{ rotate: "30deg" }],
  },
});
