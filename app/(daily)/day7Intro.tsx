import { MiffyText } from '@/components/MiffyText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { getTimeOfDay } from '@/helpers/time';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function Day7Intro() {
  const now = new Date();
  const timeOfDay = getTimeOfDay(now);
  console.log(timeOfDay);

  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 40,
          }}>
          <Image style={{}} source={require('@assets/miffyHide.png')} />
          <MiffyText isItalic color={Colors.miffySeconday} text={`Good ${timeOfDay} Buttercup`} />
          <Image style={styles.jasmineTopRight} source={require('@assets/jasmine-min.png')} />
          <Image style={styles.jasmineBottomLeft} source={require('@assets/jasmine-min.png')} />
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
            router.push('/(tabs)/home');
          }}>
          <MiffyText color={Colors.miffySeconday} text="Continue" />
          <IconSymbol name={'chevron.forward.circle.fill'} size={30} color={Colors.miffySeconday} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  jasmineTopRight: {
    position: 'absolute',
    top: -80,
    right: -30,
    transform: [{ scaleY: -1 }],
  },
  jasmineBottomLeft: {
    position: 'absolute',
    bottom: -70,
    left: -55,
    transform: [{ rotate: '30deg' }],
  },
});
