import React from 'react';
import {ImageBackground, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Logo} from '.';
import {colors, fontSizes} from '../utils/theme';
import {Header1, Paragraph} from './Text';
import { SEAPTHEME } from '../utils/theme';
import LogoImage from '../assets/images/logo.png';

interface UnAuthWrapperProps {
  children: React.ReactNode;
  header: string;
  description: string;
  linkText: string;
  onLinkPress: () => void;
  linkText1?: string;
  onLinkPress1?: () => void;
}

export const UnAuthWrapper = ({
  children,
  header,
  description,
  linkText,
  onLinkPress,
  linkText1,
  onLinkPress1,
}: UnAuthWrapperProps) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <ImageBackground
        source={LogoImage}
        imageStyle={styles.bgImgImg}
        style={styles.bgImg}
        resizeMethod='auto'
        resizeMode='contain'>
      <View style={styles.wrapper}
    >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.textWrapper}>
            {/* <Logo /> */}
            <Header1 text={header} overrideStyle={styles.headerStyle} />
            {/* <Paragraph
              overrideStyle={styles.descriptionStyle}
              text={description}
            /> */}
          </View>
          <View>{children}</View>
          <View style={{
            marginBottom: 60,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <Button
              overrideStyle={[styles.button, SEAPTHEME.halfBtn]}
              label={linkText}
              onPress={onLinkPress}
              overrideLabelStyle={styles.buttonLabel}
            />
            {linkText1 && onLinkPress1 && (
              <Button
                overrideStyle={[styles.button, SEAPTHEME.halfBtn]}
                label={linkText1}
                onPress={onLinkPress1}
                overrideLabelStyle={styles.buttonLabel}
              />
            )}
          </View>
        </ScrollView>
      </View>
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
    // opacity: 0.6,
  }
});
