import React from 'react';
import {View, StyleSheet} from 'react-native';
import {height} from '../utils/constants';
import {Paragraph} from './Text';

interface Props {
  text: string;
}

export const NoData = ({text}: Props) => {
  return (
    <View style={styles.emptyPartner}>
      <Paragraph text={text} />
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  emptyPartner: {
    flex: 1,
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
