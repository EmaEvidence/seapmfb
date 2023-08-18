import {StyleSheet, Pressable, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {Header3, Paragraph} from './Text';
import Button from './Button';
import Toast from 'react-native-toast-message';
import {colors, fontSizes} from '../utils/theme';

export const CustomToaster = ({
  text1,
  text2,
}: {
  text1: string;
  text2: string;
}) => {
  const failureStyle = text1.toLowerCase() === 'failure' ? styles.error : {};
  const shadow = Platform.OS === 'ios' ? styles.shadowProp : styles.elevation;
  useEffect(() => {
    const timeOut = setTimeout(() => Toast.hide(), 15000);
    () => {
      return clearTimeout(timeOut);
    };
  }, []);

  return (
    <Pressable
      style={[styles.wrapper, failureStyle, shadow]}
      onPress={() => Toast.hide()}>
      <Header3 text={text1} />
      <Paragraph text={text2} />
      <Button
        overrideStyle={styles.btn}
        label="close"
        onPress={() => Toast.hide()}
        overrideLabelStyle={styles.btnLabel}
      />
    </Pressable>
  );
};

export default CustomToaster;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 80,
    flexBasis: 'auto',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderLeftWidth: 7,
    borderLeftColor: colors.sMainBlue,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  text1: {},
  text2: {},
  error: {
    borderLeftColor: colors.sRed,
  },
  btn: {
    width: 60,
    height: 30,
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'transparent',
  },
  btnLabel: {
    color: colors.sMainBlue,
    fontSize: fontSizes.bodyText2,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#171717',
  },
});
