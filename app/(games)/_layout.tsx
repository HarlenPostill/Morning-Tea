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
        <Stack.Screen name="day3Game1" />
        <Stack.Screen name="day3Game2" />
        <Stack.Screen name="day3Game3" />
        <Stack.Screen name="day4Game1" />
        <Stack.Screen name="day4Game2" />
        <Stack.Screen name="day4Game3" />
        <Stack.Screen name="day5Game1" />
        <Stack.Screen name="day5Game2" />
        <Stack.Screen name="day5Game3" />
        <Stack.Screen name="day6Game1" />
        <Stack.Screen name="day6Game2" />
        <Stack.Screen name="day6Game3" />
        <Stack.Screen name="day7Game1" />
        <Stack.Screen name="day7Game2" />
        <Stack.Screen name="day7Game3" />
        <Stack.Screen name="day8Game1" />
        <Stack.Screen name="day8Game2" />
        <Stack.Screen name="day8Game3" />
        <Stack.Screen name="day9Game1" />
        <Stack.Screen name="day9Game2" />
        <Stack.Screen name="day9Game3" />
        <Stack.Screen name="day10Game1" />
        <Stack.Screen name="day10Game2" />
        <Stack.Screen name="day10Game3" />
        <Stack.Screen name="day11Game1" />
        <Stack.Screen name="day11Game2" />
        <Stack.Screen name="day11Game3" />
        <Stack.Screen name="day12Game1" />
        <Stack.Screen name="day12Game2" />
        <Stack.Screen name="day12Game3" />
        <Stack.Screen name="day13Game1" />
        <Stack.Screen name="day13Game2" />
        <Stack.Screen name="day13Game3" />
        <Stack.Screen name="day14Game1" />
        <Stack.Screen name="day14Game2" />
        <Stack.Screen name="day14Game3" />
        <Stack.Screen name="day15Game1" />
        <Stack.Screen name="day15Game2" />
        <Stack.Screen name="day15Game3" />
        <Stack.Screen name="day16Game1" />
        <Stack.Screen name="day16Game2" />
        <Stack.Screen name="day16Game3" />
        <Stack.Screen name="day17Game1" />
        <Stack.Screen name="day17Game2" />
        <Stack.Screen name="day17Game3" />
        <Stack.Screen name="day18Game1" />
        <Stack.Screen name="day18Game2" />
        <Stack.Screen name="day18Game3" />
        <Stack.Screen name="day19Game1" />
        <Stack.Screen name="day19Game2" />
        <Stack.Screen name="day19Game3" />
        <Stack.Screen name="day20Game1" />
        <Stack.Screen name="day20Game2" />
        <Stack.Screen name="day20Game3" />
        <Stack.Screen name="day21Game1" />
        <Stack.Screen name="day21Game2" />
        <Stack.Screen name="day21Game3" />
        <Stack.Screen name="day22Game1" />
        <Stack.Screen name="day22Game2" />
        <Stack.Screen name="day22Game3" />
        <Stack.Screen name="day23Game1" />
        <Stack.Screen name="day23Game2" />
        <Stack.Screen name="day23Game3" />
        <Stack.Screen name="day24Game1" />
        <Stack.Screen name="day24Game2" />
        <Stack.Screen name="day24Game3" />
        <Stack.Screen name="day25Game1" />
        <Stack.Screen name="day25Game2" />
        <Stack.Screen name="day25Game3" />
        <Stack.Screen name="day26Game1" />
        <Stack.Screen name="day26Game2" />
        <Stack.Screen name="day26Game3" />
        <Stack.Screen name="day27Game1" />
        <Stack.Screen name="day27Game2" />
        <Stack.Screen name="day27Game3" />
        <Stack.Screen name="day28Game1" />
        <Stack.Screen name="day28Game2" />
        <Stack.Screen name="day28Game3" />
        <Stack.Screen name="day29Game1" />
        <Stack.Screen name="day29Game2" />
        <Stack.Screen name="day29Game3" />
        <Stack.Screen name="day30Game1" />
        <Stack.Screen name="day30Game2" />
        <Stack.Screen name="day30Game3" />
      </Stack>
    </ThemeProvider>
  );
}
