//@ts-nocheck
import { StyleSheet, Button, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AlternateScrollView from '@/components/AlternateScrollView';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

import React from 'react';
import { AsyncStorageViewer } from '@/components/AsyncStorageViewer';
import { MiffyText } from '@/components/MiffyText';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useDayContext } from '../contexts/DayContext';

import { DayPicker } from '@/components/DayPicker';

export default function TabTwoScreen() {
  const { currentDay, isInitialized } = useDayContext();

  const title = `Amelie's Daily Games: Day ${currentDay}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.miffyOther, padding: 40, gap: 16 }}>
      <MiffyText text={title} color={Colors.miffySeconday} size={45} />
      <MiffyText text="Compete in the Gauntlet" color={Colors.miffyAccent} isItalic size={24} />
      <TouchableOpacity
        style={[
          styles.mediaButton,
          { backgroundColor: Colors.miffyPrimary, borderColor: '#F9D4DB' },
        ]}
        onPress={() => router.push(`/(games)/day${currentDay}Game1`)}>
        <MiffyText text="Game 1" size={30} color="#fff" />
        <IconSymbol name="checkmark.circle.fill" color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.mediaButton,
          { backgroundColor: Colors.miffyAccent, borderColor: '#BDCBF2' },
        ]}
        onPress={() => router.push(`/(games)/day${currentDay}Game2`)}>
        <MiffyText text="Game 2" size={30} color="#fff" />
        <IconSymbol name="checkmark.circle.fill" color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.mediaButton,
          { backgroundColor: Colors.miffySeconday, borderColor: '#EAB2BA' },
        ]}
        onPress={() => router.push(`/(games)/day${currentDay}Game3`)}>
        <MiffyText text="Game 3" size={30} color="#fff" />
        <IconSymbol name="checkmark.circle.fill" color={'white'} />
      </TouchableOpacity>
      <MiffyText
        text="Do you want to time travel to a different day?"
        color={Colors.miffySeconday}
        size={30}
      />
      <DayPicker />
    </SafeAreaView>
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
  mediaButton: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
