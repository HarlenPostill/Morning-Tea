import { MiffyText } from '@/components/MiffyText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';

export default function Slide4() {
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          padding: 30,
        }}>
        <View style={{ gap: 30, flex: 1 }}>
          <View
            style={{
              backgroundColor: '#228CFF',
              gap: 10,
              borderRadius: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginLeft: 30,
            }}>
            <MiffyText size={22} color={'#fff'} text={'Harlen'} />
            <MiffyText
              size={22}
              color={'#fff'}
              text={
                'Hey I`ve been working on something for Amelie`s hospital stay. Can anyone help out?'
              }
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.miffyPrimary,
              gap: 10,
              borderRadius: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginRight: 30,
            }}>
            <MiffyText size={22} color={'#000'} text={'Josie'} />
            <MiffyText size={22} color={'#000'} text={'Omg this is amazing!'} />
          </View>
          <View
            style={{
              backgroundColor: Colors.miffyPrimary,
              gap: 10,
              borderRadius: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginRight: 30,
            }}>
            <MiffyText size={22} color={'#000'} text={'Ari'} />
            <MiffyText
              size={22}
              color={'#000'}
              text={'Hey Harlen, sorry for late reply. Yes I`m so in, making some up now!'}
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.miffyPrimary,
              gap: 10,
              borderRadius: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginRight: 30,
            }}>
            <MiffyText size={22} color={'#000'} text={'Alycia'} />
            <MiffyText
              size={22}
              color={'#000'}
              text={
                'Heya ! This is so sweet of you, i just know she`ll love it ☺️ i`ll give it my best shot'
              }
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.miffyPrimary,
              gap: 10,
              borderRadius: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginRight: 30,
            }}>
            <MiffyText size={22} color={'#000'} text={'Nina'} />
            <MiffyText
              size={22}
              color={'#000'}
              text={
                'That`s so lovely! Thank you for letting me participate! I`ll do it right now :)'
              }
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.miffyPrimary,
              gap: 10,
              borderRadius: 17,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginRight: 30,
            }}>
            <MiffyText size={22} color={'#000'} text={'Jade'} />
            <MiffyText
              size={22}
              color={'#000'}
              text={'Hey that`s so cute! I`ll have a look sometime soon :)'}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            gap: 8,
            width: '100%',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            router.push('/(intro)/slide3');
          }}>
          <MiffyText color={Colors.miffySeconday} text="Next" />
          <IconSymbol name={'chevron.forward.circle.fill'} size={30} color={Colors.miffySeconday} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
