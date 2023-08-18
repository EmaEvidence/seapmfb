import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../utils/theme';

interface ProgressDotProps {
  length: number;
  current: number;
}

export const ProgressDot = ({length, current}: ProgressDotProps) => {
  const dots = [];
  for (let a = 0; a < length; a++) {
    const dotStyle = a === current ? styles.selectedDot : null;
    dots.push(<View style={[styles.dot, dotStyle]} key={a.toString()} />);
  }
  return <View style={styles.container}>{dots.map(dot => dot)}</View>;
};

export default ProgressDot;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    borderColor: colors.sYellow,
    borderWidth: 1,
    margin: '1%',
  },
  selectedDot: {
    backgroundColor: colors.sYellow,
    width: 50,
  },
});
