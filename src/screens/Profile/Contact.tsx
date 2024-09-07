import React from 'react';
import {Image, View} from 'react-native';
import {Header} from '../../common';
import styles from './Profile.styles';
import {Header4, Paragraph} from '../../common/Text';
import Email from '../../assets/images/contactMail.png';
import Call from '../../assets/images/contactCall.png';

const contacts = [
  {
    title: '08123456789',
    img: Call,
  },
  {
    title: 'info@seapmfb.com',
    img: Email,
  },
];

export const ContactUs = ({navigation}: any) => {
  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Settings')}
        showBackBtn
        title={'Contact Us'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.privacyBlock}>
          <Header4
            text="SEAP MFB has a reputation for playing a pivotal role in the conception, nurturing and growth small and medium-sized enterprises (SMEs) whether as startups or existing business."
            overrideStyle={styles.privacyContent}
          />
        </View>
        <View style={styles.notifications}>
          {contacts.map(item => (
            <View key={item.title} style={styles.notificationWrapper}>
              <Paragraph
                text={item.title}
                overrideStyle={styles.notificationLabel}
              />
              <Image source={item.img} style={styles.contactImg} />
            </View>
          ))}
        </View>
      </View>
      <Paragraph
        text="All rights reserverd SEAP MFB App Version 1.1.0"
        overrideStyle={styles.copyWrite}
      />
    </View>
  );
};

export default ContactUs;
