import React from 'react';
import {Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from '.';
import {colors, fontSizes} from '../utils/theme';
import {Header1, Paragraph} from './Text';
import { SEAPTHEME } from '../utils/theme';
import LogoImage from '../assets/images/logo.png';
import BackIcon from '../assets/images/goBack.png';

interface UnAuthWrapperProps {
  children: React.ReactNode;
  header: string;
  description: string;
  linkText: string;
  onLinkPress: () => void;
  linkText1?: string;
  onLinkPress1?: () => void;
  goBack: () => void;
}

export const UnAuthWrapper = ({
  children,
  header,
  description,
  linkText,
  onLinkPress,
  linkText1,
  onLinkPress1,
  goBack
}: UnAuthWrapperProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <ImageBackground
        source={LogoImage}
        imageStyle={styles.bgImgImg}
        style={styles.bgImg}
        resizeMethod='auto'
        resizeMode='contain'>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.wrapper]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={50} style={styles.content}>
          <Pressable style={styles.goBack} onPress={goBack}>
            <Image source={BackIcon} />
          </Pressable>
          <View style={styles.textWrapper}>
            <Header1 text={header} overrideStyle={styles.headerStyle} />
            {/* <Paragraph
              overrideStyle={styles.descriptionStyle}
              text={description}
            /> */}
          </View>
          <View>{children}</View>
          <Button
            overrideStyle={[styles.button, SEAPTHEME.halfBtn, styles.floatBtn]}
            label={linkText}
            onPress={onLinkPress}
            overrideLabelStyle={styles.buttonLabel}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UnAuthWrapper;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: colors.twhite,
  },
  wrapper: {
    height: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  headerStyle: {
    marginTop: '5%',
    textAlign: 'left',
    color: colors.sMainBlue,
    fontWeight: '600',
    fontSize: fontSizes.bigHeader,
    width: '60%',
  },
  descriptionStyle: {
    textAlign: 'center',
    marginTop: '2%',
    width: '85%',
    color: colors.sMainBlue,
    fontWeight: '400',
    fontSize: fontSizes.paragragh,
  },
  textWrapper: {
    alignItems: 'flex-start',
  },
  button: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 5,
    flexBasis: 'auto',
    borderWidth: 1,
    borderColor: colors.sMainBlue,
    marginVertical: 5,
  },
  buttonLabel: {
    color: colors.sMainBlue,
    textDecorationColor: colors.sMainBlue,
    textAlign: 'right',
  },
  content: {
    justifyContent: 'center',
    height: '100%'
  },
  bgImgImg: {
    opacity: 0.04
  },
  bgImg: {
    backgroundColor: colors.sLightBlue,
  },
  goBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.tlightgrey,
    padding: 10,
    borderRadius: 300,
    zIndex: 99999
  },
  floatBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 0,
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  }
});
