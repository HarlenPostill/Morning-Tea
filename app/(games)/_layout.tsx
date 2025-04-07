//@ts-ignore
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function GameLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="day1Game1" options={{ headerShown: false }} />
        <Stack.Screen name="day1Game2" options={{ headerShown: false }} />
        <Stack.Screen name="day1Game3" options={{ headerShown: false }} />
        <Stack.Screen name="day2Game1" options={{ headerShown: false }} />
        <Stack.Screen name="day2Game2" options={{ headerShown: false }} />
        <Stack.Screen name="day2Game3" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
