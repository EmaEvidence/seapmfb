import {useRoute} from '@react-navigation/native';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {View, Image, Platform, ImageBackground, PermissionsAndroid} from 'react-native';
import {Button, Header, Logo, RowView} from '../../common';
import {Header4, Paragraph} from '../../common/Text';
import LogoImage from '../../assets/images/logo.png';
import styles from './Transactions.styles';
import RNFS from 'react-native-fs';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import toaster from '../../utils/toaster';

export const Transaction = ({navigation}: any) => {
  const ref = React.useRef(null);
  const androidRef = React.useRef(null);
  const route = useRoute();
  // @ts-ignore
  const transaction = route?.params?.transaction || {};

  const captureScreen = async () => {
    if (Platform.OS === 'ios') {
      try {
        const uri = await ref.current?.capture();
        const shareOptions = {
          title: 'Share via',
          message: 'Share the Receipt',
          url: uri,
          social: Share.Social.EMAIL,
        };
        await Share.open(shareOptions);
      } catch (error) {
        getRecieptFrmHTML();
        // toaster(
        //   'Error',
        //   'Receipt download failed',
        //   'custom',
        // );
      }
    } else {
      getRecieptFrmHTML();
    }
  };

  const getRecieptFrmHTML = async () => {
    try {
      const uri = await createPDF();
      const shareOptions = {
        title: 'Share via',
        message: 'Share the Receipt',
        url: uri.filePath,
        social: Share.Social.EMAIL,
      };
      if (uri.filePath) {
        const shareOptions = {
          title: 'Share via',
          message: 'Share the Receipt',
          url: 'file://' + uri.filePath,
          social: Share.Social.EMAIL,
        };
        await Share.open(shareOptions);
      }
      await Share.open(shareOptions);
    } catch (error) {
        toaster(
          'Error',
          'Receipt download failed',
          'custom',
        );
    }
  }

  const genReceipt = () => {
    const logoImg = 'https://ibank.seapmfb.ng/assets/img/seapmfb.png';
    return `
      <div width="400px" style="position: relative; passing: 50px; margin: auto; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 50px;">
        <img src="${logoImg}" style="width: 80px; height: 80px" />
        <h1>SEAP MFB</h1>
        <h2 >Transaction Reciept</h2>
        <div style="border-top: 1px solid black; border-bottom: 1px solid black; padding: 50px; width: 400px;">
          <table border="0" style="width: 100%; margin: auto; font-size: 20px; font-weight: 600;">
            <tr>
              <td>Reference</td>
              <td>${transaction.referenceID}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>${new Date(transaction?.transactionDate)?.toDateString() || '-'}</td>
            </tr>
            <tr>
              <td>Beneficiary</td>
              <td>${transaction?.receiptData?.creditAccountName || '-'}</td>
            </tr>
            <tr>
              <td>Beneficiary Bank</td>
              <td>${transaction?.receiptData?.beneficiaryBank || '-'}</td>
            </tr>
            <tr>
              <td>Beneficiary Account</td>
              <td>${transaction.beneficiaryAccount || transaction.accountNumber || transaction.receiptData.creditAccount || '-'}</td>
            </tr>
            <tr>
              <td>Remark</td>
              <td>${transaction.paymentNarration || transaction.narration}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>NGA ${transaction.amount}</td>
            </tr>
          </table>
        </div>
        <div style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; opacity: 0.2; background: url(${logoImg}); background-repeat: no-repeat; background-position: center; background-size: contain;"></div>
      </div> 
    `;
  }

  const createPDF = async () => {
    let options = {
      html: genReceipt(),
      fileName: `${Date.now()}_receipt`,
      directory: `${RNFS.DocumentDirectoryPath}/`,
    };

    let file = await RNHTMLtoPDF.convert(options)
    return file;
  }

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.wrapper}>
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
          <View style={styles.receipt}>
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
              <Header4 text="Date" />
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
    )
  }

  return (
    <View style={styles.wrapper}>
      <Header
        title={'Transaction'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
      />
      <View ref={androidRef} style={styles.receipt}>
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
