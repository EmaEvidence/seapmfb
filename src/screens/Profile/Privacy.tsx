import React from 'react';
import {View, ScrollView} from 'react-native';
import {Header4, Paragraph} from '../../common/Text';
import {Header} from '../../common';
import styles from './Profile.styles';

const privacy = [
  {
    title: 'Introduction',
    content:
      'SEAP MFB has a reputation for playing a pivotal role in the conception, nurturing and growth small and medium-sized enterprises (SMEs) whether as startups or existing business.',
  },
  {
    title: 'Types of Data we collect',
    content:
      'SEAP MFB has a reputation for playing a pivotal role in the conception, nurturing and growth small and medium-sized enterprises (SMEs) whether as startups or existing business.',
  },
  {
    title: 'Use of your Personal Data',
    content:
      'SEAP MFB has a reputation for playing a pivotal role in the conception, nurturing and growth small and medium-sized enterprises (SMEs) whether as startups or existing business.',
  },
  {
    title: 'Disclosure of Your Personal Data',
    content:
      'SEAP MFB has a reputation for playing a pivotal role in the conception, nurturing and growth small and medium-sized enterprises (SMEs) whether as startups or existing business.',
  },
];

export const Privacy = ({navigation}: any) => {
  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Profile')}
        showBackBtn
        title={'Privacy'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.detailsBox}>
          {privacy.map(({title, content}) => (
            <View key={title} style={styles.privacyBlock}>
              <Header4 text={title} overrideStyle={styles.privacyTitle} />
              <Paragraph text={content} overrideStyle={styles.privacyContent} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Privacy;
