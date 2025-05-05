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
      </Stack>
    </ThemeProvider>
  );
}
