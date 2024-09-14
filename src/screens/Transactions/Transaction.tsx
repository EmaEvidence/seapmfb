import {useRoute} from '@react-navigation/native';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {View, Image, Platform, ImageBackground, PermissionsAndroid} from 'react-native';
import {Button, ColumnView, Header, Logo, RowView} from '../../common';
import {Header1, Header2, Header4, Paragraph} from '../../common/Text';
import LogoImage from '../../assets/images/logo.png';
import styles from './Transactions.styles';
import RNFS from 'react-native-fs';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import toaster from '../../utils/toaster';
import generalStyles from '../../index.styles';
import { fontSizes } from '../../utils/theme';

export const Transaction = ({navigation}: any) => {
  const ref = React.useRef(null);
  const androidRef = React.useRef(null);
  const route = useRoute();
  // @ts-ignore
  const transaction = route?.params?.transaction || {};

  const captureScreen = async () => {
    getRecieptFrmHTML();
    // if (Platform.OS === 'ios') {
    //   try {
    //     // const uri = await ref.current?.capture();
    //     // const shareOptions = {
    //     //   title: 'Share via',
    //     //   message: 'Share the Receipt',
    //     //   url: uri,
    //     //   social: Share.Social.EMAIL,
    //     // };
    //     // await Share.open(shareOptions);
    //     getRecieptFrmHTML();
    //   } catch (error) {
    //     getRecieptFrmHTML();
    //     // toaster(
    //     //   'Error',
    //     //   'Receipt download failed',
    //     //   'custom',
    //     // );
    //   }
    // } else {
    //   getRecieptFrmHTML();
    // }
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
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; ">
          <h2>Transaction Receipt</h2>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="${logoImg}" style="width: 20px; height: 20px" />
            <h6>SEAP MFB</h6>
          </div>
        </div>
        <div style="padding: 50px; width: 400px;">
          <div display: flex; justify-content: space-between; align-items: flex-start; min-height: 40px; width: 100%; padding: 20px; margin: 5px 0; background-color: white; border-radius: 10px;">
            <p style="font-weight: 600; font-size: 12px; opacity: 0.8; margin-bottom: 20px;">Recipient</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Bank</p>
              <p style="font-weight: 600; font-size: 12px;">${isSEAP()}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Credit account</p>
              <p style="font-weight: 600; font-size: 12px;">${receiptData?.creditAccountName}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Bill ref.</p>
              <p style="font-weight: 600; font-size: 12px;">${receiptData?.billPaymentDto?.customerReference}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Bill name</p>
              <p style="font-weight: 600; font-size: 12px;">${receiptData?.billPaymentDto?.serviceName}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Payment ref.</p>
              <p style="font-weight: 600; font-size: 12px;">${receiptData?.billPaymentDto?.billerPaymentReference}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Bank</p>
              <p style="font-weight: 600; font-size: 12px;">${receiptData?.beneficiaryBank}</p>
            </div>
          </div>
          <div display: flex; justify-content: space-between; align-items: flex-start; min-height: 40px; width: 100%; padding: 20px; margin: 5px 0; background-color: white; border-radius: 10px;">
            <p style="font-weight: 600; font-size: 12px; opacity: 0.8; margin-bottom: 20px;">Transaction</p>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;"Amount</p>
              <p style="font-weight: 600; font-size: 12px;">${transaction?.amount}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">ReferenceID</p>
              <p style="font-weight: 600; font-size: 12px;">${transaction.referenceID}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Date</p>
              <p style="font-weight: 600; font-size: 12px;">${new Date(transaction.transactionDate).toDateString()}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <p style="font-weight: 300; font-size: 10px;">Status</p>
              <p style="font-weight: 600; font-size: 12px;">${transaction.receiptData?.billPaymentDto?.status}</p>
            </div>
          </div>
          <div display: flex; justify-content: space-between; align-items: flex-start; min-height: 40px; width: 100%; padding: 20px; margin: 5px 0; background-color: white; border-radius: 10px;">
            <p style="font-weight: 600; font-size: 12px; opacity: 0.8; margin-bottom: 20px;">Remarks</p>
            <p style="width: 100%; text-align: left;">${transaction?.paymentNarration || transaction?.narration}</p>
          </div>
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

  const receiptData = transaction?.receiptData || {};
  const isSEAP = () => {
    console.log(transaction, receiptData)
    const isBill = receiptData?.billPaymentDto?.billerPaymentReference;
    const isTransfer = receiptData?.creditAccountNumber;
    const isCard = receiptData.isCardTransation;
    return (isBill || isTransfer || isCard) ? '' : 'SEAP MFB charges'
  }

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.wrapper}>
        <Header
          title={''}
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
        
        <RowView justify="isBtw" overrideStyle={[styles.detWrapper, {width: '100%'}]}>
          <Header1 overrideStyle={[generalStyles.blueText, generalStyles.leftText, { width: '80%'}]} text={'Transaction details'} />
          <Logo
            overrideStyle={{
              width: 35,
              height: 35,
            }}
          />
        </RowView>
        
        <ColumnView justify='isCenter' overrideStyle={styles.detWrapper}>
          <Paragraph text='Recipient' overrideStyle={styles.title} />
          <TransactionItem name="Bank" value={isSEAP()} />
          <TransactionItem name="Credit account" value={receiptData?.creditAccountName} />
          <TransactionItem name="Bill ref." value={receiptData?.billPaymentDto?.customerReference} />
          <TransactionItem name="Bill name" value={receiptData?.billPaymentDto?.serviceName} />
          <TransactionItem name="Payment ref." value={receiptData?.billPaymentDto?.billerPaymentReference} />
          <TransactionItem name="Bank" value={receiptData?.beneficiaryBank} />
        </ColumnView>
        <ColumnView justify='isCenter' overrideStyle={styles.detWrapper}>
          <Paragraph text='Transaction' overrideStyle={styles.title} />
          <TransactionItem name="Amount" value={`₦ ${transaction?.amount}`} />
          <TransactionItem name="ReferenceID" value={transaction.referenceID} />
          <TransactionItem name="Date" value={new Date(transaction.transactionDate).toDateString()} />
          <TransactionItem name="Status" value={transaction.receiptData?.billPaymentDto?.status} />
        </ColumnView>
        <ColumnView justify='isCenter' overrideStyle={styles.detWrapper}>
          <Paragraph text='Remarks' overrideStyle={styles.title} />
          <Paragraph
            overrideStyle={{
              width: '100%',
              textAlign: 'left'
            }}
            text={transaction?.paymentNarration || transaction?.narration}
          />
        </ColumnView>
          </View>
        </ViewShot>
        <RowView justify={'isCenter'} overrideStyle={{
          marginTop: 40
        }}>
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
    <View style={[styles.wrapper, {
      paddingHorizontal: '5%'
    }]}>
      <Header
        title={''}
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
        
        <RowView justify="isBtw" overrideStyle={[styles.detWrapper, {width: '100%'}]}>
          <Header1 overrideStyle={[generalStyles.blueText, generalStyles.leftText, { width: '80%'}]} text={'Transaction details'} />
          <Logo
            overrideStyle={{
              width: 35,
              height: 35,
            }}
          />
        </RowView>
        
        <ColumnView justify='isCenter' overrideStyle={styles.detWrapper}>
          <Paragraph text='Recipient' overrideStyle={styles.title} />
          <TransactionItem name="Bank" value={isSEAP()} />
          <TransactionItem name="Credit account" value={receiptData?.creditAccountName} />
          <TransactionItem name="Bill ref." value={receiptData?.billPaymentDto?.customerReference} />
          <TransactionItem name="Bill name" value={receiptData?.billPaymentDto?.serviceName} />
          <TransactionItem name="Payment ref." value={receiptData?.billPaymentDto?.billerPaymentReference} />
          <TransactionItem name="Bank" value={receiptData?.beneficiaryBank} />
        </ColumnView>
        <ColumnView justify='isCenter' overrideStyle={styles.detWrapper}>
          <Paragraph text='Transaction' overrideStyle={styles.title} />
          <TransactionItem name="Amount" value={`₦ ${transaction?.amount}`} />
          <TransactionItem name="ReferenceID" value={transaction.referenceID} />
          <TransactionItem name="Date" value={new Date(transaction.transactionDate).toDateString()} />
          <TransactionItem name="Status" value={transaction.receiptData?.billPaymentDto?.status} />
        </ColumnView>
        <ColumnView justify='isCenter' overrideStyle={styles.detWrapper}>
          <Paragraph text='Remarks' overrideStyle={styles.title} />
          <Paragraph
            overrideStyle={{
              width: '100%',
              textAlign: 'left'
            }}
            text={transaction?.paymentNarration || transaction?.narration}
          />
        </ColumnView>
      </View>
      <RowView justify={'isCenter'} overrideStyle={{
        marginTop: 40
      }}>
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

const TransactionItem = ({name, value}: {name: string, value: string}) => {
  if (!value) return null;
  return (
    <RowView justify='isBtw' align='isCenter'>
      <Paragraph overrideStyle={{
        fontWeight: '300',
        fontSize: fontSizes.bodyText
      }} text={name} />
      <Paragraph overrideStyle={{
        fontWeight: '600',
        fontSize: fontSizes.bodyText1
      }}  text={value} />
    </RowView>
  )
}
