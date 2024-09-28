import React from 'react';
import {View} from 'react-native';
import {Header} from '../../common';
import {FingerPrintComponent} from '../MFA';
import styles from './Profile.styles';

export const SetupBiometric = ({navigation}: any) => {
  const handleSubmit = () => {};
  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Security')}
        showBackBtn
        title={'Continue with Biometric'}
        navigation={navigation}
      />
      <View style={styles.biometricWrapper}>
        <FingerPrintComponent handleSubmit={handleSubmit} />
      </View>
    </View>
  );
};

export default SetupBiometric;
