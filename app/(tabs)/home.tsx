import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { MiffyText } from '@/components/MiffyText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  albumArt,
  flowerFacts,
  flowerList,
  instaVideos,
  personName,
  personQuote,
  songList,
  spotifyLinks,
  tiktokVideos,
  youtubeVideos,
} from '@/helpers/utils';
import { useDayContext } from '../contexts/DayContext';
import { getTodayAsString } from '@/helpers/time';

export default function HomeScreen() {
  const { currentDay } = useDayContext();

  // Function to handle link opening
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Date Header */}
        <View style={[styles.dayContainer, { backgroundColor: Colors.miffyPrimary }]}>
          <MiffyText text={getTodayAsString()} size={68} color="#fff" />
          <MiffyText text={`Day ${currentDay}`} size={36} isItalic color={Colors.miffySeconday} />
        </View>

        {/* Flower of the Day */}
        <View style={[styles.dayContainer, { backgroundColor: '#FCE0E5' }]}>
          <MiffyText text="Flower of the day" isItalic color={Colors.miffyAccent} />
          <MiffyText text={flowerList[currentDay - 1]} size={68} color={Colors.miffySeconday} />
          <MiffyText text="Fun fact!" size={18} isItalic color={Colors.miffySeconday} />
          <Text style={styles.flowerFactText}>{flowerFacts[currentDay - 1]}</Text>
        </View>

        {/* Guest Spot */}
        {personName[currentDay - 1] != 'blank' && (
          <View style={styles.guestSpotContainer}>
            <LinearGradient
              colors={['#787FD2', '#D389A5']}
              style={styles.linearGradient}
              start={{ x: 1, y: 0.2 }}
              end={{ x: 1, y: 1 }}>
              <View style={styles.gradientContent}>
                <MiffyText text="Guest Spot" color="#fff" />
                <MiffyText text={personName[currentDay - 1]} isItalic color={Colors.miffyOther} />
                <View style={styles.guestMessageContainer}>
                  <View style={styles.guestMessageDivider} />
                  <MiffyText
                    text={personQuote[currentDay - 1]}
                    size={18}
                    isItalic={true}
                    color={Colors.miffyOther}
                  />
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Media Section */}
        <View style={[styles.dayContainer, styles.mediaSectionContainer]}>
          <MiffyText text="Bored of this already Watch these instead" size={30} color="#fff" />
          <Image style={styles.jasmineTopLeft} source={require('@assets/jasmine-min.png')} />
          <Image style={styles.jasmineTopRight} source={require('@assets/jasmine-min.png')} />
          <Image style={styles.jasmineBottomLeft} source={require('@assets/jasmine-min.png')} />

          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => openLink(instaVideos[currentDay - 1])}>
            <MiffyText text="Daily Reel" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => openLink(tiktokVideos[currentDay - 1])}>
            <MiffyText text="Daily TikTok" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => openLink(youtubeVideos[currentDay - 1])}>
            <MiffyText text="Youtube Video" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Song Section */}
        <View style={[styles.dayContainer, styles.songContainer]}>
          <Image style={styles.musicBackground} source={require('@assets/music.png')} />
          <MiffyText text="Song Time" size={68} color="#fff" />
          <View style={styles.songDetailsContainer}>
            <Text style={styles.songTitle}>{songList[currentDay - 1]}</Text>
            <Image style={styles.songArtwork} source={albumArt[currentDay - 1]} />
          </View>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => openLink(spotifyLinks[currentDay - 1])}>
            <MiffyText text="Give me a Listen!" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.miffyOther,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayContainer: {
    gap: 12,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  flowerFactText: {
    fontFamily: 'DMSerifDisplay_400Regular',
    fontSize: 18,
    color: Colors.miffySeconday,
    textAlign: 'center',
  },
  guestSpotContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientContent: {
    padding: 40,
    gap: 12,
    justifyContent: 'center',
  },
  guestMessageContainer: {
    flexDirection: 'row',
    gap: 12,
    width: 180,
  },
  guestMessageDivider: {
    backgroundColor: Colors.miffyOther,
    height: 100,
    width: 1,
  },
  mediaSectionContainer: {
    backgroundColor: Colors.miffyAccent,
    gap: 24,
    overflow: 'hidden',
  },
  mediaButton: {
    width: '100%',
    alignItems: 'center',
    borderColor: '#ffffff60',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    backgroundColor: '#D7E1FB40',
  },
  jasmineTopLeft: {
    position: 'absolute',
    top: 130,
    left: -95,
    transform: [{ rotate: '49deg' }],
  },
  jasmineTopRight: {
    position: 'absolute',
    top: 160,
    right: -85,
    transform: [{ rotate: '-20deg' }, { scaleX: -1 }],
  },
  jasmineBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    transform: [{ rotate: '-24deg' }],
  },
  songContainer: {
    backgroundColor: Colors.miffyAccent,
    gap: 24,
    padding: 20,
    overflow: 'hidden',
  },
  musicBackground: {
    position: 'absolute',
  },
  songDetailsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  songTitle: {
    fontFamily: 'DMSerifDisplay_400Regular',
    fontSize: 26,
    color: 'white',
    textAlign: 'right',
  },
  songArtwork: {
    borderRadius: 10,
  },
});
