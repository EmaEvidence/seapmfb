import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {Button, Header} from '../../common';
import styles from './Loans.styles';
import {Paragraph} from '../../common/Text';
import TransferIcon from '../../assets/images/transfer.png';
import AcctMore from '../../assets/images/acctmore.png';
import RequestIcon from '../../assets/images/request.png';
import {useAppSelector} from '../../app/hooks';

export const Loans = ({navigation}: {navigation: any}) => {
  return (
    <LoanWrapper>
      <View style={styles.wrapper}>
        <Header
          showBackBtn
          overrideGoBack={() => navigation.goBack()}
          title={'Loans'}
          navigation={navigation}
        />
        <View style={styles.subwrapper}>
          {/* <AppliedLoanCard /> */}
          <Paragraph text="You have not applied for any loan yet!" />
          <Button
            label="Click to Apply for a Loan"
            onPress={() => navigation.navigate('LoanTypes')}
            overrideStyle={styles.btn}
          />
        </View>
      </View>
    </LoanWrapper>
  );
};

export default Loans;

export const AppliedLoanCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.account}>Payday Loan</Text>
        <Text style={styles.account}>Due in 10days</Text>
      </View>
      <View style={styles.cardMiddle}>
        <Text style={styles.balanceLabel}>Loan Status</Text>
        <Text style={styles.balance}>NGA 30,000.00 of </Text>
        <Text style={styles.balance}>NGA 3,000,000.00</Text>
      </View>
      <View style={styles.cardBottom}>
        <TouchableOpacity style={styles.cardAction}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.actionImg}
              resizeMode="contain"
              source={TransferIcon}
            />
          </View>
          <Text style={styles.actionCardText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardAction}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.actionImg}
              resizeMode="contain"
              source={RequestIcon}
            />
          </View>
          <Text style={styles.actionCardText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardAction}>
          <View style={styles.imgWrapper}>
            <Image
              style={styles.actionImg}
              resizeMode="contain"
              source={AcctMore}
            />
          </View>
          <Text style={styles.actionCardText}>Others</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const LoanWrapper = ({children}) => {
  const {isAuthenticated} = useAppSelector(state => state.auth);
  return (
    <>
      {!isAuthenticated && <SafeAreaView style={styles.safeWrapper} />}
      {children}
    </>
  );
};
