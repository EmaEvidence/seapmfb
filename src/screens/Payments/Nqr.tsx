import React from 'react';
import {View} from 'react-native';
import {Header} from '../../common';
import styles from './Payments.styles';
import {Paragraph} from '../../common/Text';

export const NQR = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.goBack()}
        showBackBtn
        title={'Scan to Pay'}
        navigation={navigation}
      />
      <View style={styles.subheader} />
      <Paragraph text="Payment for NQR" />
    </View>
  );
};

export default NQR;
