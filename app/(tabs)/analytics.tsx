import { StyleSheet, Image, View, SafeAreaView } from 'react-native';

import { AsyncStorageViewer } from '@/components/AsyncStorageViewer';
import { DayPicker } from '@/components/DayPicker';
import { MiffyText } from '@/components/MiffyText';
import { Colors } from '@/constants/Colors';
import { Collapsible } from '@/components/Collapsible';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.miffyOther }}>
      <View style={{ height: '100%', width: '100%', padding: 24, gap: 16 }}>
        <MiffyText text="Stats & Settings" color={Colors.miffySeconday} size={45} />

        <Image style={styles.jasmine} source={require('@assets/jasmine-min.png')} />
        <Collapsible title={'WARNING SCARY STUFF'}>
          <MiffyText size={20} color={'#000000'} text={'Manually Change the Day'} />
          <DayPicker />
          <AsyncStorageViewer />
        </Collapsible>
      </View>
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
    transform: [{ scaleX: -1 }, { rotateZ: '10deg' }],
    bottom: 0,
    right: -30,
  },
});
