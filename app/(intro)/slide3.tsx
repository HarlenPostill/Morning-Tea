import { MiffyText } from '@/components/MiffyText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, View } from 'react-native';

export default function Slide3() {
  return (
    <SafeAreaView>
      <View
        style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{ gap: 50, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <MiffyText color={Colors.miffySeconday} text={'and when I say we, I mean we.....'} />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 705,
            gap: 8,
            right: 45,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            router.push('/(intro)/slide4');
          }}>
          <MiffyText color={Colors.miffySeconday} text="Next" />
          <IconSymbol name={'chevron.forward.circle.fill'} size={30} color={Colors.miffySeconday} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
