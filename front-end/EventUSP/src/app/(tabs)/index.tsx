import HomeHeader from '@/components/HomeHeader';
import { colors, globalStyles } from '@/styles/global';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { EventCard } from '@/components/EventCard';
import { SocialPost } from '@/components/SocialPost';

const images = [
  require('../../../assets/images/Card.png'),
  require('../../../assets/images/card2.jpg'),
  require('../../../assets/images/card3.jpg'),
];

// Legenda exibida sobre cada slide (deixe vazio '' para slides sem legenda)
const captions = ['', '', 'Viva a USP'];

const minhaFoto = require('../../../assets/images/Event.png');

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const imageWidth = width - 40;
  const imageHeight = 200;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / imageWidth);
    setActiveIndex(index);
  };

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho com título e sino de notificações */}
      <HomeHeader />

      {/* Slider de imagens com legenda e indicadores */}
      <View style={styles.sliderWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
          contentContainerStyle={styles.sliderContent}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
        >
          {images.map((imageSource, index) => (
            <View key={index} style={{ width: imageWidth, height: imageHeight }}>
              <Image
                source={imageSource}
                style={[styles.sliderImage, { width: imageWidth, height: imageHeight }]}
                resizeMode="cover"
              />
              {captions[index] ? (
                <View style={styles.captionWrapper}>
                  <Text style={styles.captionText}>{captions[index]}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </ScrollView>

        {/* Indicadores (dots) */}
        <View style={styles.dotsWrapper}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Eventos em destaque */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Eventos em destaque</Text>
        <Text style={styles.sectionLink}>Ver todos</Text>
      </View>

      <EventCard />

      <EventCard
        title="Rock na Vala"
        organizer="FAUD-USP"
        location="Vala da FAUD-USP"
        dates="12/08"
        time="18:00 - 23:00"
        free={false}
        image={minhaFoto}
      />

      {/* Feed de amigos */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Feed de amigos</Text>
        <Text style={styles.sectionLink}>Explorar</Text>
      </View>

      <SocialPost />

      {/* ou customizado: */}
      <SocialPost
        username="Lucar Aura"
        handle="@TheMostAura"
        timeAgo="5h"
        eventName="Junime"
        likes={34}
        comments={8}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 110,
  },
  sliderWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  slider: {
    width: '100%',
  },
  sliderContent: {
    paddingHorizontal: 0,
  },
  sliderImage: {
    borderRadius: 16,
    marginHorizontal: 0,
  },
  captionWrapper: {
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  captionText: {
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: colors.bluePrimary,
    width: 16,
  },
  dotInactive: {
    backgroundColor: colors.backgroundDarkSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    color: colors.textPrimaryDark,
  },
  sectionLink: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    color: colors.orangePrimary,
  },
});