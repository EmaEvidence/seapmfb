import React from 'react';
import {View} from 'react-native';
import {Header} from '../../common';
import {Paragraph} from '../../common/Text';
import styles from './Help.styles';

export const Analytics = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.wrapper}>
      <Header title={'Help'} navigation={navigation} />
      <View style={styles.insightSection}>
        <View style={styles.scrollContent}>
          <View style={styles.content}>
            <Paragraph
              overrideStyle={styles.insightText}
              text={
                'Money  Nuggets Money  Nuggets Money  Nuggets Money  Nuggets Money  Nuggetsh udhsdfihds sd dfsdfusdif dsufisdf sdufsd iusdfsd skdfsd sdufisdfuihsdf sdufsdf isdufsdds'
              }
            />
            <Paragraph overrideStyle={styles.sourceText} text={'SEAP MFB'} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Analytics;
