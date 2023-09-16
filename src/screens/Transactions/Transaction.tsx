import {useRoute} from '@react-navigation/native';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {View, Image, Platform, ImageBackground} from 'react-native';
import {Button, Header, Logo, RowView} from '../../common';
import {Header4, Paragraph} from '../../common/Text';
import LogoImage from '../../assets/images/logo.png';
import styles from './Transactions.styles';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import toaster from '../../utils/toaster';

export const Transaction = ({navigation}: any) => {
   const ref = React.useRef(null)
  const route = useRoute();
  // @ts-ignore
  const transaction = route?.params?.transaction || {};


//  const onShare = async () => {
//     try {
//       const result = await Share.share({
//         message: `SEAP MFB Transaction details| ${transaction.narration} | ${transaction.amount}`,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       // alert(error.message);
//       toaster(
//         'Error',
//         'Error sharing receipt',
//         'custom',
//       );
//     }
//   };

  const captureScreen = async () => {
    if (Platform.OS === 'ios') {
      try {
        const uri = await ref.current?.capture();
        console.log(uri)
        const shareOptions = {
          title: 'Share via',
          message: 'Share the Receipt',
          url: uri,
          social: Share.Social.EMAIL,
        };
        await Share.open(shareOptions);
      } catch (error) {
        toaster(
          'Error',
          'Receipt download failed',
          'custom',
        );
      }
    } else {
      const uri = await ref.current?.capture();
      console.log('0-0=-=-android-==-=-=-', uri)
    }
  };

  const genReceipt = () => {
    return `
      <div>
        <h2>${1 + 1}</h2>
      </div> 
    `;
  }

  const createPDF = async () => {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: `${Date.now()}_receipt`,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    return file;
  }

  return (
    <View style={styles.wrapper} collapsable={false}>
      <Header
        title={'Transaction'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
      />
      <ViewShot
        ref={ref}
        options={{
          format: 'jpg',
          quality: 0.9,
          fileName: 'receipt'
        }}
      >
        <View style={styles.receipt} collapsable={false}>
          <Image
            source={LogoImage}
            resizeMethod='resize'
            resizeMode='contain'
            style={{opacity: 0.1, position: 'absolute', width: '100%', height: '100%'}}
          />
          <Logo
            overrideStyle={{
              width: 50,
              marginBottom: 20,
              height: 50,
            }}
          />
          <Header4 text="Transaction Reciept" />
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
          {
            transaction.receiptData.creditAccountName && (
              <View style={styles.detailWrapper}>
                <Header4 text="Beneficiary" />
                <Paragraph text={transaction.receiptData.creditAccountName} />
              </View>
            )
          }
          {
            transaction.receiptData.beneficiaryBank && (
              <View style={styles.detailWrapper}>
                <Header4 text="Beneficiary Bank" />
                <Paragraph text={transaction.receiptData.beneficiaryBank} />
              </View>
            )
          }
          <View style={styles.detailWrapper}>
            <Header4 text="Beneficiary Account" />
            <Paragraph text={transaction.beneficiaryAccount || transaction.accountNumber || transaction.receiptData.creditAccount || '-'} />
          </View>
          <View style={styles.detailWrapper}>
            <Header4 text="Remarks" />
            <Paragraph
              overrideStyle={{
                width: '50%',
                textAlign: 'right'
              }}
              text={transaction.paymentNarration || transaction.narration}
            />
          </View>
          <View style={styles.detailWrapper}>
            <Header4 text="Amount" />
            <Paragraph text={`NGA ${transaction.amount}`} />
          </View>
          <View style={styles.divider} />
        </View>
      </ViewShot>
      <RowView justify={'isCenter'}>
        <Button
          label={'Share'}
          onPress={captureScreen}
          overrideStyle={styles.receiptBtn}
        />
      </RowView>
    </View>
  );
};

export default Transaction;
