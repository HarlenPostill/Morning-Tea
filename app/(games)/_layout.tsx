//@ts-ignore
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function GameLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: Colors.light.background,
            position: 'relative',
          },
          headerShown: false,
        }}>
        <Stack.Screen name="day1Game1" />
        <Stack.Screen name="day1Game2" />
        <Stack.Screen name="day1Game3" />
        <Stack.Screen name="day2Game1" />
        <Stack.Screen name="day2Game2" />
        <Stack.Screen name="day2Game3" />
      </Stack>
    </ThemeProvider>
  );
}
