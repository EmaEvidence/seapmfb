import React from 'react';
import {TouchableOpacity, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {height, width} from '../utils/constants';
import {colors, fontSizes} from '../utils/theme';
import {Header5} from './Text';

interface ButtonProps {
  label: string;
  overrideStyle?: ViewStyle | ViewStyle[];
  overrideLabelStyle?: TextStyle;
  onPress: () => void;
  renderContent?: () => React.ReactElement;
}

export const Button = ({
  label,
  overrideStyle,
  overrideLabelStyle,
  onPress,
  renderContent,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, overrideStyle]}
      onPress={() => onPress()}>
      {renderContent ? (
        renderContent()
      ) : (
        <Header5
          overrideStyle={[styles.text as TextStyle, overrideLabelStyle]}
          text={label}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    height: height * 0.05,
    maxHeight: 40,
    minHeight: 35,
    borderRadius: 200,
    backgroundColor: colors.sMainBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.twhite,
    fontWeight: '500',
    fontSize: fontSizes.paragragh2,
  },
});
