import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface Props {
  children: JSX.Element | JSX.Element[];
  justify: 'isCenter' | 'isArd' | 'isBtw' | 'isStart' | 'isEnd';
  align?: 'isCenter' | 'isArd' | 'isBtw' | 'isStart' | 'isEnd';
  overrideStyle?: ViewStyle;
}

export const ColumnView = ({
  children,
  justify,
  align,
  overrideStyle,
}: Props) => {
  return (
    <View
      style={[
        styles.column,
        styles[justify],
        align && alignStyles[align],
        overrideStyle,
      ]}>
      {children}
    </View>
  );
};

export const RowView = ({children, justify, align, overrideStyle}: Props) => {
  return (
    <View
      style={[
        styles.isRow,
        styles[justify],
        align && alignStyles[align],
        overrideStyle,
        {width: '100%'},
      ]}>
      {children}
    </View>
  );
};

const alignStyles = StyleSheet.create({
  isCenter: {
    alignItems: 'center',
  },
  isArd: {
    alignItems: 'baseline',
  },
  isBtw: {
    alignItems: 'stretch',
  },
  isStart: {
    alignItems: 'flex-start',
  },
  isEnd: {
    alignItems: 'flex-end',
  },
});

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  isCenter: {
    justifyContent: 'center',
  },
  isArd: {
    justifyContent: 'space-around',
  },
  isBtw: {
    justifyContent: 'space-between',
  },
  isStart: {
    justifyContent: 'flex-start',
  },
  isEnd: {
    justifyContent: 'flex-end',
  },
  isRow: {
    flexDirection: 'row',
  },
});
