import React from 'react';
import {Pressable, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {height, width} from '../utils/constants';
import {colors, fontSizes} from '../utils/theme';
import {Header5} from './Text';

interface ButtonProps {
  label: string;
  overrideStyle?: ViewStyle | ViewStyle[];
  overrideLabelStyle?: TextStyle | TextStyle[];
  onPress: () => void;
  renderContent?: () => React.ReactElement;
  disabled?: boolean;
}

export const Button = ({
  label,
  overrideStyle,
  overrideLabelStyle,
  onPress,
  renderContent,
  disabled = false
}: ButtonProps) => {
  return (
    <Pressable
      // style={[styles.container, overrideStyle]}
      style={({ pressed }) => [
        styles.container, overrideStyle,
        { opacity: pressed || disabled ? 0.5 : 1.0 },
      ]}
      onPress={() => {
        if (disabled) return
        onPress()
      }}>
      {renderContent ? (
        renderContent()
      ) : (
        <Header5
          overrideStyle={[styles.text as TextStyle, overrideLabelStyle]}
          text={label}
        />
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: width * 0.25,
    height: height * 0.05,
    maxHeight: 50,
    minHeight: 45,
    borderRadius: 200,
    backgroundColor: colors.sMainBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 990999,
  },
  text: {
    color: colors.twhite,
    fontWeight: '400',
    fontSize: fontSizes.paragragh1,
  },
});
