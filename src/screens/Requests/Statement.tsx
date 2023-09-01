import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
// import Pdf from 'react-native-pdf';
import {AccountSelector, Button, Header} from '../../common';
import {Header3, Header4} from '../../common/Text';
import styles from './Requests.styles';
import {validateNonEmpty} from '../../validator';
import toaster from '../../utils/toaster';
import {getStatement} from '../../app/actions/account';
import RNFetchBlob from 'react-native-blob-util';
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
    start: '',
    end: '',
    account: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

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
    if (startError || endError || acctError) {
      toaster('Error', 'Enter all details to continue', 'custom');
      return;
    }
    const payload = {
      ...dateObj,
      account: dateObj.account.split(' - ')[0],
    };
    const resp = await getStatement(payload);
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
          <Button
            label="Get Statement"
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={handleSubmit}
          />
          <DatePicker
            date={new Date()}
            onDateChange={handleSetDate}
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
