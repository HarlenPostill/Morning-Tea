import { MiffyText } from '@/components/MiffyText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { getTimeOfDay } from '@/helpers/time';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

export default function Day7Intro() {
  const now = new Date();
  const timeOfDay = getTimeOfDay(now);

  const topRightAnim = useRef(new Animated.Value(0)).current;
  const bottomLeftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createBounceAnimation = (animValue: Animated.Value) => {
      return Animated.timing(animValue, {
        toValue: 1,
        duration: 1600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      });
    };

    Animated.parallel([
      createBounceAnimation(topRightAnim),
      Animated.sequence([Animated.delay(200), createBounceAnimation(bottomLeftAnim)]),
    ]).start();
  }, []);

  const topRightTranslateY = topRightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const topRightRotate = topRightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['30deg', '0deg'],
  });

  const bottomLeftTranslateX = bottomLeftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 0],
  });

  const bottomLeftRotate = bottomLeftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['50deg', '30deg'],
  });

  const bottomLeftScale = bottomLeftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

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
          <Animated.Image
            style={[
              styles.jasmineTopRight,
              {
                transform: [
                  { translateY: topRightTranslateY },
                  { rotate: topRightRotate },
                  { scaleY: -1 },
                ],
              },
            ]}
            source={require('@assets/flowers/orchid.png')}
          />

          <Animated.Image
            style={[
              styles.jasmineBottomLeft,
              {
                transform: [
                  { translateX: bottomLeftTranslateX },
                  { rotate: bottomLeftRotate },
                  { scale: bottomLeftScale },
                ],
              },
            ]}
            source={require('@assets/flowers/orchid.png')}
          />
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
  },
  jasmineBottomLeft: {
    position: 'absolute',
    bottom: -70,
    left: -55,
  },
});
