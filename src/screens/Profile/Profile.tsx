import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Button, Header} from '../../common';
import {Header4, Header5, Paragraph} from '../../common/Text';
import {removeItem} from '../../utils/localStorage';
import styles from './Profile.styles';
// import Edit from '../../assets/images/editY.png';
// import Notify from '../../assets/images/notifY.png';
import Security from '../../assets/images/securityB.png';
import Privacy from '../../assets/images/privacyY.png';
import Contact from '../../assets/images/contactY.png';
// import Customise from '../../assets/images/customise.png';
import Help from '../../assets/images/helpB.png';
import Caret from '../../assets/images/caretY.png';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {logout} from '../../app/slices/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toaster from '../../utils/toaster';
import axios from 'axios';

export const Profile = ({navigation}: {navigation: any}) => {
  const {user} = useAppSelector(state => state.auth);
  // @ts-ignore
  const {Name, email} = user && JSON.parse(user);
  const profileItems = [
    // {
    //   name: 'Edit Profile',
    //   image: Edit,
    //   link: 'EditProfile',
    // },
    // {
    //   name: 'Notification',
    //   image: Notify,
    //   link: 'NotifcationManagement',
    // },
    {
      name: 'Security',
      image: Security,
      link: 'Security',
    },
    // {
    //   name: 'Personalize',
    //   image: Customise,
    //   link: 'Personalise',
    // },
    {
      name: 'Privacy Policy',
      image: Privacy,
      link: 'Privacy',
    },
    {
      name: 'Help & Support',
      image: Help,
      link: 'Feedback',
    },
    {
      name: 'Contact Us',
      image: Contact,
      link: 'ContactUs',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => {
          navigation.navigate('HomeScreen');
        }}
        showBackBtn
        title={'Settings'}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={[styles.content]}>
        <View style={styles.detailsBox}>
          <Header4 text={Name} overrideStyle={styles.detailText} />
          <Header5 text={email} overrideStyle={styles.badgeHeader} />
          <View style={styles.divider} />
        </View>
        <View style={styles.badges}>
          {profileItems.map(item => (
            <ProfileListItem
              item={item}
              key={item.name}
              navigation={navigation}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <LogOutBtn type="clear" />
          <LogOutBtn type="normal" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const ProfileListItem = ({
  item,
  navigation,
}: {
  item: Record<string, string>;
  navigation: any;
}) => {
  return (
    <TouchableOpacity
      style={styles.badge}
      onPress={() => navigation.navigate(item.link)}>
      <View style={styles.left}>
        <Image
          style={styles.itemImg}
          source={item.image as unknown as ImageSourcePropType}
        />
        <Paragraph overrideStyle={styles.badgeHeader} text={item.name} />
      </View>
      <Image style={styles.itemCaret} source={Caret} />
    </TouchableOpacity>
  );
};

export const LogOutBtn = ({
  type,
  overrideStyle,
}: {
  type: 'clear' | 'normal';
  overrideStyle?: ViewStyle;
}) => {
  const isWithClearData = type === 'clear';
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    delete axios.defaults.headers.common.Authorization;
    removeItem('authToken');
    dispatch(logout());
  };

  const clearData = () => {
    handleLogOut();
    AsyncStorage.getAllKeys()
      .then(keys => {
        AsyncStorage.multiRemove(keys);
      })
      .then(() => {
        removeItem('authToken');
        dispatch(logout());
      })
      .catch(() => {
        toaster('Failure', 'Error clearing app data!', 'custom');
      });
  };

  return (
    <Button
      label={isWithClearData ? 'Clear Data' : 'Log Out'}
      overrideStyle={[styles.actionBtn, overrideStyle]}
      overrideLabelStyle={styles.actionText}
      onPress={isWithClearData ? clearData : handleLogOut}
    />
  );
};
