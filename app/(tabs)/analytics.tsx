import { StyleSheet, Image, View, SafeAreaView, ScrollView } from 'react-native';
import { AsyncStorageViewer } from '@/components/AsyncStorageViewer';
import { DayPicker } from '@/components/DayPicker';
import { MiffyText } from '@/components/MiffyText';
import { Colors } from '@/constants/Colors';
import { Collapsible } from '@/components/Collapsible';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.miffyOther }}>
      <ScrollView>
        <View style={{ minHeight: '100%', width: '100%', padding: 24, gap: 16 }}>
          <MiffyText text="Stats & Settings" color={Colors.miffySeconday} size={45} />
          <Image style={styles.jasmine} source={require('@assets/jasmine-min.png')} />
          <MiffyText
            color={Colors.miffyAccent}
            size={24}
            text="Special thanks to everyone who contributed to the puzzles"
          />

          <Collapsible title={'Day 1 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 2 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 3 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Andre" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 4 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Josie" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 5 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Ari" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Ari" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Ari" />
          </Collapsible>

          <Collapsible title={'Day 6 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Daniel" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Daniel" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Daniel" />
          </Collapsible>

          <Collapsible title={'Day 7 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Nina" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Nina" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 8 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 9 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Brad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 10 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Dad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Dad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 11 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Alycia" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 12 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 13 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Brad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 14 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 15 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Tom's Sister" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 16 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Lilly" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 17 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 18 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Dad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Belinda" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Belinda" />
          </Collapsible>

          <Collapsible title={'Day 19 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Dad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 20 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 21 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Ari" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Tom's Sister" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Tom" />
          </Collapsible>

          <Collapsible title={'Day 22 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Brad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Fio" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 23 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Ladders: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 24 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 25 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Dad" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Dad" />
          </Collapsible>

          <Collapsible title={'Day 26 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Tom" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 27 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 28 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
          </Collapsible>

          <Collapsible title={'Day 29 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Dad" />
          </Collapsible>

          <Collapsible title={'Day 30 Puzzles Credits'}>
            <MiffyText color={Colors.miffyAccent} size={18} text="Mini: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Wordle: Harlen" />
            <MiffyText color={Colors.miffyAccent} size={18} text="Connection: Dad" />
          </Collapsible>

          <Collapsible title={'WARNING SCARY STUFF'}>
            <MiffyText size={20} color={'#000000'} text={'Manually Change the Day'} />
            <DayPicker />
            <AsyncStorageViewer />
          </Collapsible>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
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
  jasmine: {
    position: 'absolute',
    transform: [{ scaleX: -1 }, { rotateZ: '45deg' }],
    top: 550,
    right: -50,
  },
});
