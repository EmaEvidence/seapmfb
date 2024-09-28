import {Platform, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';
import {height, width} from '../../utils/constants';
import { Beneficiaries } from '../Beneficiaries';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.sTextYellow,
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height,
    flexWrap: 'wrap',
    paddingHorizontal: '1%',
    width: '100%',
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
    // flex: 0.45,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  button: {
    borderRadius: 50,
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
    // borderWidth: 1,
    // borderColor: colors.sMainBlue,
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
    // textDecorationLine: 1,
    // textDecorationStyle: 'solid'
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
    width: '100%',
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
  beneficiariesWrapper: {
    height: '100%',
    width: width * 0.85,
    marginTop: 10,
  },
  secCard: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    // borderWidth: 1,
    marginBottom: 10,
    borderColor: colors.sLighterBlue,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.twhite,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: colors.sLightBlue, padding: 3, borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    textAlign: 'center',
    paddingTop: 7,
    color: colors.sMainBlue
  },
  acct: {
    fontSize: fontSizes.bodyText
  },
  acctName: {
    fontWeight: '400',
    color: colors.sMainBlue,
    width: '90%',
    height: 18,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
    // borderWidth: 1,
  },
  receipientWrapper: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: colors.twhite,
    marginBottom: 10,
  },
  amountWrapper: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: colors.twhite,
    height: 'auto'
  },
  amtInput: {
    backgroundColor: 'transparent',
    textAlign: 'left',
    borderWidth: 0,
    fontSize: fontSizes.bigHeader,
    width: 'auto',
    paddingHorizontal: 0,
    paddingLeft: 5,
    color: colors.sMainBlue,
  },
  amtInputWrapper: {
    // borderColor: 'transparent',
    borderWidth: 0,
    width: 'auto',
    paddingHorizontal: 0
  },
  remarkInput: {
    height: 100,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  amtText: {
    paddingHorizontal: 0,
    width: 'auto',
    minWidth: 20,
    color: colors.sMainBlue,
    fontSize: fontSizes.bigHeader
  },
  balanceText: {
    fontSize: fontSizes.paragragh,
    // lineHeight: fontSizes.paragragh2,
    borderColor: colors.sMainBlue,
    // borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // paddingTop: 4,
    textAlign:'center',
    color: colors.sMainBlue
  },
  blueText: {
    color: colors.sMainBlue
  },
  transparentBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.sMainBlue
  },
  transparentBtnLabel: {
    color: colors.sMainBlue
  },
  bankIcon: {
    marginRight: 20,
    backgroundColor: colors.sLightBlue,
    padding: 3,
    borderRadius: 5,
    color: colors.sMainBlue,
  }
});

export default styles;
