import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Logo} from '.';
import {colors, fontSizes} from '../utils/theme';
import {Header1, Paragraph} from './Text';

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
      <View style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textWrapper}>
            <Logo />
            <Header1 text={header} overrideStyle={styles.headerStyle} />
            <Paragraph
              overrideStyle={styles.descriptionStyle}
              text={description}
            />
          </View>
          <View>{children}</View>
          <View style={{
            marginBottom: 60
          }}>
            <Button
              overrideStyle={styles.button}
              label={linkText}
              onPress={onLinkPress}
              overrideLabelStyle={styles.buttonLabel}
            />
            {linkText1 && onLinkPress1 && (
              <Button
                overrideStyle={styles.button}
                label={linkText1}
                onPress={onLinkPress1}
                overrideLabelStyle={styles.buttonLabel}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UnAuthWrapper;

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: colors.twhite,
  },
  wrapper: {
    backgroundColor: colors.twhite,
    height: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    // marginBottom: 50,
    justifyContent: 'space-between',
  },
  headerStyle: {
    marginTop: '5%',
    textAlign: 'center',
    color: colors.sMainBlue,
    fontWeight: '600',
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
    alignItems: 'center',
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
    // textDecorationStyle: 'solid',
    // textDecorationLine: 'underline',
  },
});
