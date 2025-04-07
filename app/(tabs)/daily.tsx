//@ts-nocheck
import { StyleSheet, Button } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AlternateScrollView from '@/components/AlternateScrollView';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

import React, { useState } from 'react';
import { AsyncStorageViewer } from '@/components/AsyncStorageViewer';

export default function TabTwoScreen() {
  const [day, setDay] = useState(1);
  return (
    <AlternateScrollView
      headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Daily Gauntlet</ThemedText>
      </ThemedView>
      <ThemedText>Try out today's daily gauntlet!</ThemedText>
      <Picker selectedValue={day} onValueChange={itemValue => setDay(itemValue)}>
        {[...Array(30)].map((_, index) => (
          <Picker.Item key={index + 1} label={`Day ${index + 1}`} value={index + 1} />
        ))}
      </Picker>

      <Button
        title="First Game"
        onPress={() => router.push(`/(games)/day${day}Game1`)}
        color={Colors.light.tint}
      />
      <Button
        title="Second Game"
        onPress={() => router.push(`/(games)/day${day}Game2`)}
        color={Colors.light.tint}
      />
      <Button
        title="Third Game"
        onPress={() => router.push(`/(games)/day${day}Game3`)}
        color={Colors.light.tint}
      />
      <AsyncStorageViewer />
    </AlternateScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
