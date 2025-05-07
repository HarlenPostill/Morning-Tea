//@ts-nocheck
import { StyleSheet, Button, Image, TouchableOpacity, View } from 'react-native';

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

export default function TabTwoScreen() {
  const { currentDay, isInitialized } = useDayContext();

  return (
    <AlternateScrollView>
      <MiffyText text="The Daily" color={Colors.miffySeconday} size={45} />
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
      <View style={{ height: 180 }} />
      <Image style={styles.jasmine} source={require('@assets/jasmine-min.png')} />
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
  jasmine: {
    position: 'absolute',
    bottom: -100,
    left: -25,
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
