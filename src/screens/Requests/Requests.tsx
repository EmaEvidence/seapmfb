import React from 'react';
import {View} from 'react-native';
import {Button, Header} from '../../common';
import styles from './Requests.styles';

export const AccountRequests = ({navigation}: any) => {
  const handleNavigation = (subject: string) => {
    navigation.navigate('Feedback', {
      subject,
      title: 'Requests',
    });
  };

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.goBack()}
        showBackBtn
        title={'Account Requests'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          {/* <Button
            label="Request for a Debit Card"
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={() => handleNavigation('Request for a Debit Card')}
          /> */}
          {/* <Button
            label="Request for a Cheque Book"
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={() => handleNavigation('Request for a Cheque Book')}
          /> */}
          <Button
            label="Request for Account Statement"
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={() => navigation.navigate('Statement')}
          />
        </View>
      </View>
    </View>
  );
};

export default AccountRequests;
