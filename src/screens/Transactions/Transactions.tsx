import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View, FlatList, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {getHistory} from '../../app/actions/account';
import {useAppSelector} from '../../app/hooks';
import {AccountSelector, Button, RowView, TransactionCard} from '../../common';
import {Header} from '../../common';
import {Header5, Paragraph} from '../../common/Text';
import styles from './Transactions.styles';
import toaster from '../../utils/toaster';
import dayjs from 'dayjs';
import { colors } from '../../utils/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import { height } from '../../utils/constants';
import generalStyles from '../../index.styles';
import getPeriodDates from '../../utils/getPeriodDates';

const periods = ['Current week', 'Current month', 'Last month', 'Current year', 'Last year', 'Custom'];

export const Transactions = ({navigation}: any) => {
  const refRBSheet = useRef();
  const [period, setPeriod] = useState();
  const {history} = useAppSelector(state => state.account);
  const [whichDate, setWhichDate] = useState('');
  const [dateObj, setDate] = useState({
    start: new Date().toDateString(),
    end: new Date().toDateString(),
    account: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  const selectedHistory = history[parseInt(dateObj.account, 10)];

  useEffect(() => {
    if ((!selectedHistory || selectedHistory.length === 0) && dateObj.account) {
      getHistory(parseFloat(dateObj.account));
    }
  }, [dateObj.account, selectedHistory]);

  useEffect(() => {
    if (period === 'Custom') {
      refRBSheet.current.open();
    } else if (period) {
      const dateResp = getPeriodDates(period);
      handleGetHistory(dateResp.endDate, dateResp.startDate)
    }
  }, [period]);

  const handleSetDate = (date: Date) => {
    setDate(prevState => ({
      ...prevState,
      [whichDate]: date.toDateString().split('T')[0],
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

  const handleGetHistory = (end: string, start: string) => {
    const {account} = dateObj;
    if (!account) {
      toaster('Error', 'Enter all details to continue', 'custom');
      return;
    }
    // const date1 = dayjs(end);
    // const date2 = dayjs(start);
    // if (date1.diff(date2, 'month') > 3) {
    //   toaster(
    //     'Error',
    //     'You can only get history for 3 months here, use account statement to get more.',
    //     'custom',
    //   );
    //   return;
    // }
    getHistory(parseFloat(dateObj.account), start, end);
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title={'Transactions'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
        
      />
      <View style={[styles.dateWrapper]}>
        <AccountSelector
          value={dateObj.account}
          handleTextChange={handleTextChange}
        />
      </View>
      <View style={styles.dateWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            periods.map((itm) => (
              <TouchableOpacity
                key={itm}
                style={[styles.periodChip, {
                  borderColor: period === itm ? colors.sYellow : 'transparent'
                }]}
                onPress={() => {
                  setPeriod(itm);
                  itm === 'Custom' && refRBSheet.current.open();
                }}
              >
                <Paragraph text={itm} overrideStyle={styles.periodChipLabel} />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
      
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
      <View style={styles.paymentWrapper}>
        <FlatList
          data={selectedHistory}
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
      <RBSheet
        height={height * 0.2}
        // @ts-ignore
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: colors.sTransparentBlue,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
          <View style={styles.customWrapper}>
            <RowView justify='isBtw' align='isCenter' overrideStyle={{
              width: '100%'
            }}>
              <TouchableOpacity style={{
                width: '48%'
              }} onPress={() => handleOpenModal('start')}>
                <Header5 text="Choose Start Date" />
                <Paragraph text={dateObj.start} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: '48%'
              }} onPress={() => handleOpenModal('end')}>
                <Header5 text="Choose End Date" />
                <Paragraph text={dateObj.end} />
              </TouchableOpacity>
            </RowView>
            <RowView justify='isBtw' align='isCenter' overrideStyle={{
              marginTop: 20
            }}>
              <Button
                overrideStyle={[styles.btnStyle, generalStyles.transparentBtn]}
                label="Cancel"
                onPress={() => refRBSheet.current.close()}
                overrideLabelStyle={generalStyles.transparentBtnLabel}
              />
              <Button
                overrideStyle={styles.btnStyle}
                label="Apply"
                onPress={() => {
                  refRBSheet.current.close();
                  handleGetHistory(dateObj.end, dateObj.start);
                }}
              />
            </RowView>
          </View>
      </RBSheet>
    </View>
  );
};

export default Transactions;
