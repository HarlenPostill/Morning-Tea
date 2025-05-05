import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  //@ts-ignore
} from "@react-navigation/native";
import { Stack } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function IntroLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.miffyOther,
            position: "relative",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="day1Intro" />
        <Stack.Screen name="day2Intro" />
        <Stack.Screen name="day3Intro" />
        <Stack.Screen name="day4Intro" />
        <Stack.Screen name="day5Intro" />
        <Stack.Screen name="day6Intro" />
        <Stack.Screen name="day7Intro" />
        <Stack.Screen name="day8Intro" />
        <Stack.Screen name="day9Intro" />
        <Stack.Screen name="day10Intro" />
        <Stack.Screen name="day11ntro" />
        <Stack.Screen name="day12Intro" />
        <Stack.Screen name="day13Intro" />
        <Stack.Screen name="day14Intro" />
        <Stack.Screen name="day15Intro" />
        <Stack.Screen name="day16Intro" />
        <Stack.Screen name="day17Intro" />
        <Stack.Screen name="day18Intro" />
        <Stack.Screen name="day19Intro" />
        <Stack.Screen name="day20Intro" />
        <Stack.Screen name="day21Intro" />
        <Stack.Screen name="day22Intro" />
        <Stack.Screen name="day23Intro" />
        <Stack.Screen name="day24Intro" />
        <Stack.Screen name="day25Intro" />
        <Stack.Screen name="day26Intro" />
        <Stack.Screen name="day27Intro" />
        <Stack.Screen name="day28Intro" />
        <Stack.Screen name="day29Intro" />
        <Stack.Screen name="day30Intro" />
      </Stack>
    </ThemeProvider>
  );
}
