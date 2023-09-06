import React, {useEffect, useState} from 'react';
import {
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  ImageBackground,
  Animated,
  Platform,
  UIManager,
} from 'react-native';
import {Button, Logo, ProgressDot} from '../../common';
import S3 from '../../assets/images/S3.jpg';
import S1 from '../../assets/images/S1.jpg';
import S2 from '../../assets/images/S2.jpg';
import styles from './Onboarding.style';
import useLanguage from '../../hooks/useLanguage';
import {saveItem} from '../../utils/localStorage';
import {langObj} from '../Profile/Personalise';
import {Header1, Paragraph} from '../../common/Text';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface OnboardingProps {
  navigation: {
    replace: (route: string) => void;
    navigate: (route: string) => void;
  };
}

export const Onboarding = ({navigation}: OnboardingProps) => {
  const bgObjArr = [
    {
      img: S1,
      title: 'BORDERLESS BANKING EXPERIENCE',
      detail:
        'Banking comfortably from anywhere within Nigeria with our multichannel Banking platforms.',
    },
    {
      img: S3,
      title: 'GET A LOAN',
      detail: 'At a very low interest rate and convinient repay plan.',
    },
    {
      img: S2,
      title: 'FUND TRANSFER',
      detail: 'Transaction made easy send money to any bank in Nigeria.',
    },
  ];
  const len = bgObjArr.length;
  const [selectedLang] = useState('English');
  const [selectedLangCode, setLangCode] = useState<'en' | 'yr' | 'hu' | 'ig'>(
    'en',
  );
  const {lang} = useLanguage(selectedLangCode);
  const [contentIndex, setIndex] = useState(0);

  useEffect(() => {
    setLangCode(langObj[selectedLang]);
  }, [selectedLang]);

  const moveToAuth = () => {
    saveItem('onboardingDone', 'true');
    return navigation.navigate('Login');
  };

  const handleScrollIndex = (offset: number) => {
    const pageWidth = Dimensions.get('screen').width;
    return Math.round(offset / pageWidth);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <Animated.ScrollView
          snapToAlignment={'center'}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
            setIndex(handleScrollIndex(event.nativeEvent.contentOffset.x));
          }}
          scrollEventThrottle={0}
          decelerationRate="fast"
          pagingEnabled
          contentContainerStyle={{width: `${100 * len}%`}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {bgObjArr.map((item, index) => (
            <ImageBackground
              key={index}
              source={item.img}
              style={styles.scrollContent}
              resizeMethod="auto"
              resizeMode="stretch">
              <Logo overrideStyle={styles.logo} />
              <View style={styles.bottomWrapper}>
                <Header1 text={item.title} overrideStyle={styles.title} />
                <Paragraph text={item.detail} overrideStyle={styles.detail} />
              </View>
            </ImageBackground>
          ))}
        </Animated.ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.dotWrapper}>
          <ProgressDot length={len} current={contentIndex} />
        </View>
        <Button
          label={contentIndex === len - 1 ? lang.continue : lang.skip}
          onPress={moveToAuth}
          overrideStyle={styles.btn}
          overrideLabelStyle={styles.btnLabel}
        />
      </View>
    </View>
  );
};

export default Onboarding;

// https://rossbulat.medium.com/react-native-carousels-with-horizontal-scroll-views-60b0587a670c
