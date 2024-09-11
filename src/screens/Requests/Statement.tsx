import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
// import Pdf from 'react-native-pdf';
import {AccountSelector, Button, ColumnView, Header} from '../../common';
import {Header3, Header4, Paragraph} from '../../common/Text';
import styles from './Requests.styles';
import {validateEmail, validateNonEmpty} from '../../validator';
import toaster from '../../utils/toaster';
import {getStatement} from '../../app/actions/account';
import RNFetchBlob from 'react-native-blob-util';
import InputText, { Checkbox } from '../../common/InputText';
import { AuthTypeComponent } from '../Transfer';
const {fs} = RNFetchBlob;

export const saveBase64ToFile = async (base64String: any, fileName: any) => {
  const pdfPath = `${fs.dirs.DocumentDir}/${fileName}.pdf`;
  await fs.writeFile(pdfPath, base64String, 'base64');
  return pdfPath;
};

export const Statement = ({navigation}: any) => {
  const [whichDate, setWhichDate] = useState('');
  const [_, setString] = useState('');
  const [dateObj, setDate] = useState({
    start: new Date().toDateString(),
    end: new Date().toDateString(),
    account: '',
    recipient: '',
    sendToEmail: '',
    otp: '',
    password: '',
    transactionPin: '',
    authName: ''
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleGetCredential = () => {
    let result: Record<string, string> = {};
    let valid = true;
    if (dateObj.authName === 'password & otp') {
      result = {
        password: dateObj.password,
        otp: dateObj.otp,
      };
    } else if (dateObj.authName === 'transactionPin & Otp') {
      result = {
        transactionPin: dateObj.transactionPin,
        otp: dateObj.otp,
      };
    } else {
      result = {
        // @ts-ignore
        [dateObj.authName]: dateObj[dateObj.authName],
      };
    }
    const objArr = Object.entries(result);
    for (let a = 0; a < objArr.length; a++) {
      if (!objArr[a][1]) {
        toaster('Error', `Enter your ${objArr[a][0]} to continue!`, 'custom');
        valid = false;
      }
    }
    return !valid ? undefined : result;
  };


  const handleSetDate = (date: Date) => {
    setDate(prevState => ({
      ...prevState,
      [whichDate]: date.toDateString(),
    }));
    setModalOpen(false);
  };

  const handleOpenModal = (type: string) => {
    setModalOpen(true);
    setWhichDate(type);
  };

  const handleTextChange = (label: string, value: string) => {
    setDate(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const saveFile = async (str: string, name: string) => {
    const path = await saveBase64ToFile(str, name);
    if (path) {
      toaster(
        'Success',
        `Account statement downloaded to ${path} successfully`,
        'custom',
      );
    } else {
      toaster('Error', 'Error downloading statement', 'custom');
    }
  };

  const handleSubmit = async () => {
    const startError = !validateNonEmpty(dateObj.start);
    const endError = !validateNonEmpty(dateObj.end);
    const acctError = !validateNonEmpty(dateObj.account);
    const isEmailValid = validateEmail(dateObj.recipient);
    if (startError || endError || acctError) {
      toaster('Error', 'Enter all details to continue', 'custom');
      return;
    }
    if (dateObj.sendToEmail === 'yes' && !isEmailValid) {
      toaster('Error', 'Please provide a valid recipient email.', 'custom');
      return;
    }
    const resp = await getStatement({
      "accountNumber": dateObj.account.split(' - ')[0],
      "fromDate": new Date(dateObj.start).toISOString().split('T')[0],
      "toDate": new Date(dateObj.end).toISOString().split('T')[0],
      "fileType": "PDF",
      "sendToEmail": dateObj.sendToEmail === 'yes',
      "password": dateObj.password,
      "recipient": dateObj.recipient,
      "auth": handleGetCredential()
    });
    if (resp?.status === 200) {
      saveFile(
        resp.data.data,
        `account-statement${dateObj.start}-${dateObj.end}`,
      );
      setString(resp.data.data);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.goBack()}
        showBackBtn
        title={'Account Statement'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          <AccountSelector
            value={dateObj.account}
            handleTextChange={handleTextChange}
          />
          <View style={styles.dateWrapper}>
            <TouchableOpacity onPress={() => handleOpenModal('start')}>
              <Header3 text="Choose Start Date" />
              <Header4 text={dateObj.start} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOpenModal('end')}>
              <Header3 text="Choose End Date" />
              <Header4 text={dateObj.end} />
            </TouchableOpacity>
          </View>
          <ColumnView justify='isBtw' overrideStyle={{
            width: '100%'
          }}>
            <Checkbox
              value={dateObj.sendToEmail}
              onChange={handleTextChange}
              name={'sendToEmail'}
              label="Send statement to email"
            />
            {
              dateObj.sendToEmail === 'yes' ? (
                <>
                  <InputText
                    value={dateObj.recipient}
                    onChange={handleTextChange}
                    name={'recipient'}
                    label='Receiving email'
                  />
                  <AuthTypeComponent handleAuthChange={handleTextChange} />
                </>
              ) : <View />
            }
          </ColumnView>
          <ColumnView justify='isEnd' overrideStyle={{
            flexGrow: 1,
            width: '100%'
          }}>
            <Button
              label="Get Statement"
              overrideStyle={styles.securityBtn}
              overrideLabelStyle={styles.actionText}
              onPress={handleSubmit}
            />
          </ColumnView>
          <DatePicker
            date={new Date()}
            // onDateChange={handleSetDate}
            modal={true}
            open={modalOpen}
            onConfirm={date => handleSetDate(date)}
            onCancel={() => setModalOpen(false)}
            title={`Choose ${whichDate} date.`}
            confirmText="Done"
            cancelText="Cancel"
            mode="date"
            maximumDate={new Date()}
            minimumDate={new Date('2000-01-01')}
            androidVariant="iosClone"
          />
        </View>
      </View>
    </View>
  );
};

export default Statement;
