import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {FlatList} from 'react-native-gesture-handler';
import {getDebits} from '../../app/actions/account';
import {useAppSelector} from '../../app/hooks';
import {AccountSelector, Button, TransactionCard} from '../../common';
import {Header} from '../../common';
import {Header5, Paragraph} from '../../common/Text';
import styles from './Transactions.styles';
import toaster from '../../utils/toaster';
import dayjs from 'dayjs';

export const Debits = ({navigation}: any) => {
  const {debits} = useAppSelector(state => state.account);
  const [whichDate, setWhichDate] = useState('');
  const [dateObj, setDate] = useState({
    start: '',
    end: '',
    account: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!debits) {
      const today = dayjs();
      const end = today.subtract(7, 'day');
      getDebits({
        startDate: today.toISOString(),
        endDate: end.toISOString(),
      });
    }
  }, [debits]);

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

  const handleGetHistory = () => {
    const {account, end, start} = dateObj;
    if (!account || !end || !start) {
      toaster('Error', 'Enter all details to continue', 'custom');
      return;
    }
    const date1 = dayjs(end);
    const date2 = dayjs(start);
    if (date1.diff(date2, 'month') > 3) {
      toaster(
        'Error',
        'You can only get history for 3 months here, use account statement to get more.',
        'custom',
      );
      return;
    }
    getDebits({startDate: dateObj.start, endDate: dateObj.end});
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title={'Debits Transactions'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
      />
      <View style={styles.subheader} />
      <View style={styles.dateWrapper}>
        <AccountSelector
          value={dateObj.account}
          handleTextChange={handleTextChange}
        />
      </View>
      <View style={styles.dateWrapper}>
        <TouchableOpacity onPress={() => handleOpenModal('start')}>
          <Header5 text="Choose Start Date" />
          <Paragraph text={dateObj.start} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenModal('end')}>
          <Header5 text="Choose End Date" />
          <Paragraph text={dateObj.end} />
        </TouchableOpacity>
      </View>
      <Button
        overrideStyle={styles.btnStyle}
        label="Fetch Transactions"
        onPress={handleGetHistory}
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
      <View style={styles.paymentWrapper}>
        <FlatList
          data={debits}
          renderItem={({item}) => (
            <TransactionCard
              key={item.key}
              onPress={() =>
                navigation.navigate('Transaction', {transaction: item})
              }
              // @ts-ignore
              transaction={{
                id: item.key,
                title: item.narration,
                date: item.transactionDate,
                amount: parseFloat(item.amount),
              }}
              type={item.recordType}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Debits;
