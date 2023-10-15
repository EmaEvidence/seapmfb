import React, {useState} from 'react';
import {Switch, View} from 'react-native';
import {Paragraph} from '../../common/Text';
import {Header} from '../../common';
import styles from './Profile.styles';
import {colors} from '../../utils/theme';

const notifTypes = [
  'General Notification',
  'Sound',
  'Vibration',
  'App Updates',
  'Transactions',
  'New Services',
];

export const NotificationManagement = ({navigation}: any) => {
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    'General Notification': true,
    Sound: false,
    Vibration: false,
    'App Updates': false,
    Transactions: false,
    'New Services': false,
  });

  const handleSetNotifcation = (notType: string) => {
    setNotifications(prevState => ({
      ...prevState,
      [notType]: !notifications[notType],
    }));
  };
  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Profile')}
        showBackBtn
        title={'Manage Notification'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          {notifTypes.map(item => (
            <View key={item} style={styles.notificationWrapper}>
              <Switch
                trackColor={{false: colors.tlightgrey, true: colors.sMainBlue}}
                thumbColor={
                  notifications[item] ? colors.sYellow : colors.twhite
                }
                ios_backgroundColor={colors.tlightgrey}
                onValueChange={() => handleSetNotifcation(item)}
                value={notifications[item]}
              />
              <Paragraph text={item} overrideStyle={styles.notificationLabel} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NotificationManagement;
