import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TextProps as BaseTextProps,
} from 'react-native';
import {colors, fontSizes} from '../utils/theme';

interface TextProps extends BaseTextProps {
  text: string;
  overrideStyle?: TextStyle | Array<TextStyle | undefined>;
}

export const Header1 = ({text, overrideStyle}: TextProps) => {
  return (
    <Text style={[styles.text, styles.header1, overrideStyle]}>{text}</Text>
  );
};

export const Header2 = ({text, overrideStyle}: TextProps) => {
  return (
    <Text style={[styles.text, styles.header2, overrideStyle]}>{text}</Text>
  );
};

export const Header3 = ({text, overrideStyle}: TextProps) => {
  return (
    <Text style={[styles.text, styles.header3, overrideStyle]}>{text}</Text>
  );
};

export const Header4 = ({text, overrideStyle}: TextProps) => {
  return (
    <Text style={[styles.text, styles.header4, overrideStyle]}>{text}</Text>
  );
};

export const Header5 = ({text, overrideStyle}: TextProps) => {
  return (
    <Text style={[styles.text, styles.header5, overrideStyle]}>{text}</Text>
  );
};

export const Paragraph = ({text, overrideStyle}: TextProps) => {
  return (
    <Text style={[styles.text, styles.paragraph, overrideStyle]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Medium',
    color: colors.tblack,
    // fontWeight: '200',
  },
  header1: {
    fontSize: fontSizes.header1,
  },
  header2: {
    fontSize: fontSizes.header4,
  },
  header3: {
    fontSize: fontSizes.header5,
  },
  header4: {
    fontSize: fontSizes.paragragh2,
  },
  header5: {
    fontSize: fontSizes.paragragh,
  },
  paragraph: {
    fontSize: fontSizes.bodyText2,
    fontFamily: 'Poppins-Regular',
  },
});
