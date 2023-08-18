import {Dimensions} from 'react-native';
import LoanServices from '../assets/images/loans.jpeg';
import Hall from '../assets/images/hall.jpeg';
import ATM from '../assets/images/atm.jpeg';

export const {width, height} = Dimensions.get('screen');
export const transactionAuthTypes = [
  'PIN',
  'OTP', // does not need work
  'Biometric',
  'Pin and OTP', // no otp work needed
  'Transaction Password',
];

export const transactionAuthTypesObj: Record<string, number> = {
  PIN: 1,
  OTP: 2, // does not need work
  Biometric: 3,
  'Pin and OTP': 4, // no otp work needed
  'Transaction Password': 5,
};

export const secretQuestions = [
  'What is your mothers maiden name?',
  'Where were you born?',
  'What is the name of your first school?',
];

export const getDate = (val: Date) => {
  return val.toISOString().split('T')[0];
};

export const advertContents = [
  {
    img: ATM,
    text: '24 hours ATM Services',
  },
  {
    img: Hall,
    text: 'Conducive Bank Hall',
  },
  {
    img: LoanServices,
    text: 'Low Interest Loan Services',
  },
];
