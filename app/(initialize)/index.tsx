import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { router } from 'expo-router';
import { useDayContext } from '../contexts/DayContext';
import { Colors } from '@/constants/Colors';

export default function InitializeScreen() {
  const { currentDay, isInitialized } = useDayContext();

  console.log('Initialize Screen mounted');
  console.log('Current Day:', currentDay);
  console.log('Is Initialized:', isInitialized);

  useEffect(() => {
    console.log('Initialize Screen useEffect', { isInitialized, currentDay });

    if (isInitialized) {
      console.log('Day system initialized, navigating...');
      router.replace('/(tabs)/daily');
    }
  }, [isInitialized, currentDay]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.miffyOther,
      }}>
      <ActivityIndicator size="large" color={Colors.light.tint} />
    </View>
  );
}
