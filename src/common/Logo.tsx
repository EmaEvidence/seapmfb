import React from 'react';
import {Image, ImageStyle, StyleSheet} from 'react-native';
import LogoImage from '../assets/images/logo.png';

interface LogoProps {
  overrideStyle?: ImageStyle;
}

export const Logo = ({overrideStyle}: LogoProps) => {
  return (
    <Image
      resizeMethod="resize"
      resizeMode="contain"
      source={LogoImage}
      style={[styles.img, overrideStyle]}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
  },
});
