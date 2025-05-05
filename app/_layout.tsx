import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  //@ts-ignore
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display/400Regular";
import { DMSerifDisplay_400Regular_Italic } from "@expo-google-fonts/dm-serif-display/400Regular_Italic";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    DMSerifDisplay_400Regular,
    DMSerifDisplay_400Regular_Italic,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(games)"
          options={{
            contentStyle: {
              backgroundColor: Colors.light.background,
              position: "relative",
            },
            headerShown: true,
            headerBackVisible: true,
            headerBackTitle: "Back",
            headerTitle: "Daily Gauntlet",
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerShadowVisible: false,
            headerTintColor: Colors.light.tint,
          }}
        />
        <Stack.Screen name="(intro)" options={{ headerShown: false }} />
        <Stack.Screen name="(daily)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
