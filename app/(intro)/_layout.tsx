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
        <Stack.Screen name="slide1" />
        <Stack.Screen name="slide2" />
        <Stack.Screen name="slide3" />
        <Stack.Screen
          name="slide4"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="slide5" />
      </Stack>
    </ThemeProvider>
  );
}
