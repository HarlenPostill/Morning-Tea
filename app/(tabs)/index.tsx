import { StyleSheet, ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { MiffyText } from "@/components/MiffyText";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 12,
        backgroundColor: Colors.miffyOther,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.dayContainer,
            { backgroundColor: Colors.miffyPrimary },
          ]}
        >
          <MiffyText text={"May 11th"} size={68} color={"#fff"} />
          <MiffyText
            text={"Day 12"}
            size={36}
            isItalic
            color={Colors.miffySeconday}
          />
        </View>
        <View style={[styles.dayContainer, { backgroundColor: "#FCE0E5" }]}>
          <MiffyText
            text={"Flower of the day"}
            isItalic
            color={Colors.miffyAccent}
          />
          <MiffyText text={"Tulips"} size={68} color={Colors.miffySeconday} />
          <MiffyText
            text={"Fun fact!"}
            size={18}
            isItalic
            color={Colors.miffySeconday}
          />
          <MiffyText
            text={
              "Tulips were so valuable in 17th century Netherlands that they caused 'Tulip Mania', a speculative bubble where bulbs traded for prices higher than houses!"
            }
            size={18}
            color={Colors.miffySeconday}
          />
        </View>
        <View
          style={{
            gap: 12,
            borderRadius: 20,
            padding: 40,
            justifyContent: "center",
            marginBottom: 12,
            backgroundColor: Colors.miffyAccent,
          }}
        >
          <MiffyText text={"Guest Spot"} color={"#fff"} />
          <MiffyText text={"Andre"} isItalic color={Colors.miffyOther} />
          <View style={{ flexDirection: "row", gap: 12, width: 180 }}>
            <View
              style={{
                backgroundColor: Colors.miffyOther,
                height: 100,
                width: 1,
              }}
            />
            <MiffyText
              text={
                "“Hey Amelie, I hope you enjoy my crossword. you got this!”"
              }
              size={18}
              isItalic
              color={Colors.miffyOther}
            />
          </View>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dayContainer: {
    gap: 12,
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  linearGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
