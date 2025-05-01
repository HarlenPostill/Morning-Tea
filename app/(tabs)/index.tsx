import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { MiffyText } from "@/components/MiffyText";
import { LinearGradient } from "expo-linear-gradient";

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
          <MiffyText text="May 11th" size={68} color="#fff" />
          <MiffyText
            text="Day 12"
            size={36}
            isItalic
            color={Colors.miffySeconday}
          />
        </View>

        <View style={[styles.dayContainer, { backgroundColor: "#FCE0E5" }]}>
          <MiffyText
            text="Flower of the day"
            isItalic
            color={Colors.miffyAccent}
          />
          <MiffyText text="Tulips" size={68} color={Colors.miffySeconday} />
          <MiffyText
            text="Fun fact!"
            size={18}
            isItalic
            color={Colors.miffySeconday}
          />
          <Text
            style={{
              fontFamily: "DMSerifDisplay_400Regular",
              fontSize: 18,
              color: Colors.miffySeconday,
              textAlign: "center",
            }}
          >
            Tulips were so valuable in 17th century Netherlands that they caused
            'Tulip Mania', a speculative bubble where bulbs traded for prices
            higher than houses!
          </Text>
        </View>

        <View style={styles.guestSpotContainer}>
          <LinearGradient
            colors={["#787FD2", "#D389A5"]}
            style={styles.linearGradient}
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.gradientContent}>
              <MiffyText text="Guest Spot" color="#fff" />
              <MiffyText text="Andre" isItalic color={Colors.miffyOther} />
              <View style={{ flexDirection: "row", gap: 12, width: 180 }}>
                <View
                  style={{
                    backgroundColor: Colors.miffyOther,
                    height: 100,
                    width: 1,
                  }}
                />
                <MiffyText
                  text="Hey Amelie, I hope you enjoy my crossword. you got this!"
                  size={18}
                  isItalic={true}
                  color={Colors.miffyOther}
                />
              </View>
            </View>
          </LinearGradient>
        </View>
        <View
          style={[
            styles.dayContainer,
            {
              backgroundColor: Colors.miffyAccent,
              gap: 24,
              overflow: "hidden",
            },
          ]}
        >
          <MiffyText
            text="Bored of this already Watch these instead"
            size={30}
            color={"#fff"}
          />
          <Image
            style={{
              position: "absolute",
              top: 130,
              left: -95,
              transform: [{ rotate: "49deg" }],
            }}
            source={require("@assets/jasmine-min.png")}
          />
          <Image
            style={{
              position: "absolute",
              top: 160,
              right: -85,
              transform: [{ rotate: "-20deg" }, { scaleX: -1 }],
            }}
            source={require("@assets/jasmine-min.png")}
          />
          <Image
            style={{
              position: "absolute",
              bottom: -60,
              left: -50,
              transform: [{ rotate: "-24deg" }],
            }}
            source={require("@assets/jasmine-min.png")}
          />
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              borderColor: "#ffffff60",
              borderWidth: 2,
              borderRadius: 12,
              paddingVertical: 16,
              backgroundColor: "#D7E1FB40",
            }}
            onPress={() => {
              Linking.openURL("https://www.youtube.com/watch?v=JW5q4w0DDwA");
            }}
          >
            <MiffyText text="Daily Reel" size={30} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              borderColor: "#ffffff60",
              borderWidth: 2,
              borderRadius: 12,
              paddingVertical: 16,
              backgroundColor: "#D7E1FB40",
            }}
            onPress={() => {
              Linking.openURL(
                "https://www.tiktok.com/@alecjimenez31/video/7250885316276669742?lang=en"
              );
            }}
          >
            <MiffyText text="Daily TikTok" size={30} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              borderColor: "#ffffff60",
              borderWidth: 2,
              borderRadius: 12,
              paddingVertical: 16,
              backgroundColor: "#D7E1FB40",
            }}
            onPress={() => {
              Linking.openURL("https://www.youtube.com/watch?v=JW5q4w0DDwA");
            }}
          >
            <MiffyText text="Youtube Video" size={30} color={"#fff"} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.dayContainer,
            {
              backgroundColor: Colors.miffyAccent,
              gap: 24,
              padding: 20,
              overflow: "hidden",
            },
          ]}
        >
          <Image
            style={{
              position: "absolute",
            }}
            source={require("@assets/music.png")}
          />
          <MiffyText text="Song Time" size={68} color={"#fff"} />
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              paddingLeft: 40,
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: "DMSerifDisplay_400Regular",
                fontSize: 26,
                color: "white",
                textAlign: "right",
                textOverflow: "wrap",
              }}
            >
              Flightless bird, American Mouth
            </Text>

            <Image
              style={{ borderRadius: 10 }}
              source={require("@assets/songArt/1.jpg")}
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
  guestSpotContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 12,
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientContent: {
    padding: 40,
    gap: 12,
    justifyContent: "center",
  },
});
