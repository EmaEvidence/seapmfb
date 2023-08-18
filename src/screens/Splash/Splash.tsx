import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useSpring, animated} from '@react-spring/native';
import {colors} from '../../utils/theme';
import Logo from '../../assets/images/logo.png';
import {Header2} from '../../common/Text';
import useLanguage from '../../hooks/useLanguage';

const AnimatedView = animated(View);

export const SplashScreen = () => {
  const {lang} = useLanguage();
  const [flip] = useState(false);
  const props = useSpring({
    to: {opacity: 1},
    from: {opacity: 0.7},
    config: {
      duration: 2000,
      bounce: 3,
    },
    reset: true,
    reverse: flip,
  });
  return (
    <AnimatedView style={[props, styles.body]}>
      <Image source={Logo} style={styles.img} resizeMode="contain" />
      <Header2 overrideStyle={styles.text} text={lang.tagline} />
    </AnimatedView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sMainBlue,
  },
  header1: {
    color: colors.tblack,
    marginTop: '2%',
  },
  img: {
    width: '60%',
    height: 400,
  },
  text: {
    color: colors.twhite,
  },
});
