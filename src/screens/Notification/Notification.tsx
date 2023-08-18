import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card, Header} from '../../common';
import styles from './Notification.styles';

export const Notification = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.wrapper}>
      <Header
        showBackBtn
        title={'Notifications'}
        navigation={navigation}
        overrideGoBack={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View>
            <Card
              data={{
                icon: '',
                title: 'Notification Title',
                subTitle: 'Notification Subtitle',
              }}
            />
            <Card
              data={{
                icon: '',
                title: 'Notification Title',
                subTitle: 'Notification Subtitle',
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notification;
