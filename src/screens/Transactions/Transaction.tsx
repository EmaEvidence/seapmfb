import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Share, View} from 'react-native';
import {Button, Header} from '../../common';
import {Header4, Paragraph} from '../../common/Text';
import styles from './Transactions.styles';

export const Transaction = ({navigation}: any) => {
  const route = useRoute();
  // @ts-ignore
  const transaction = route?.params?.transaction || {};

 const onShare = async () => {
    try {
      const result = await Share.share({
        message: `SEAP MFB Transaction details| ${transaction.narration} | ${transaction.amount}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // alert(error.message);
    }
  };


  return (
    <View style={styles.wrapper}>
      <Header
        title={'Transaction'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
      />
      <View style={styles.receipt}>
        <Paragraph text="Transaction Details" />
        <View style={styles.divider} />
        <View style={styles.detailWrapper}>
          <Header4 text="Reference" />
          <Paragraph text={transaction.referenceID} />
        </View>
        <View style={styles.detailWrapper}>
          <Header4 text="Paid On" />
          <Paragraph
            text={new Date(transaction.transactionDate).toDateString()}
          />
        </View>
        {/* <View style={styles.detailWrapper}>
          <Header4 text="Beneficiary Name" />
          <Paragraph text="Emmanuel Alabi" />
        </View>
        <View style={styles.detailWrapper}>
          <Header4 text="Beneficiary Bank" />
          <Paragraph text="Zenith Bank Plc" />
        </View> */}
        <View style={styles.detailWrapper}>
          <Header4 text="Beneficiary Account" />
          <Paragraph text={transaction.accountNumber || '-'} />
        </View>
        <View style={styles.detailWrapper}>
          <Header4 text="Remarks" />
          <Paragraph
            overrideStyle={{
              width: '50%',
            }}
            text={transaction.narration}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Header4 text="Amount" />
          <Paragraph text={`NGA ${transaction.amount}`} />
        </View>
        <View style={styles.divider} />
        <View>
          <Button
            label={'Share'}
            onPress={onShare}
            overrideStyle={styles.receiptBtn}
          />
        </View>
      </View>
    </View>
  );
};

export default Transaction;
