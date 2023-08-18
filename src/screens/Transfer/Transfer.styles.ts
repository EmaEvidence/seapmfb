import {Platform, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';
import {height} from '../../utils/constants';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
    paddingHorizontal: '5%',
  },
  actionBtn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    margin: 10,
  },
  actionText: {
    color: colors.tblue,
    fontWeight: '500',
    fontSize: fontSizes.paragragh,
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
    width: '100%',
  },
  imgWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  paymentWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    flexWrap: 'wrap',
    padding: '1%',
  },
  pickerStyle: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#F4F4F5',
    borderColor: 'transparent',
  },
  pickerWrapper: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  pickerItem: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfBtn: {
    width: '45%',
  },
  getOTPBtn: {
    backgroundColor: 'transparent',
    width: '25%',
    textAlign: 'left',
    borderWidth: 1,
    borderColor: colors.sMainBlue,
    borderRadius: 5,
    marginBottom: 3,
    maxHeight: 60,
    height: height * 0.06,
  },
  getOTPlabelStyle: {
    color: colors.sMainBlue,
    width: '100%',
    textAlign: 'center',
    fontSize: fontSizes.bodyText2,
  },
  confirm: {
    padding: 20,
  },
  confirmText: {
    textAlign: 'center',
    color: colors.sMainBlue,
    fontSize: fontSizes.paragragh3,
  },
  textInputStyle: {
    marginVertical: 35,
  },
  otpInputStyle: {
    width: '70%',
  },
  fingerWrapper: {
    width: 70,
    height: 70,
  },
  fingerImg: {
    width: '100%',
    height: '100%',
  },
  fingerPrintText: {
    color: colors.sMainBlue,
    marginTop: 20,
  },
});

export default styles;
