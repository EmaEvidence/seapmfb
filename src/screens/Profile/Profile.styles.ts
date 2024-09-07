import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
    paddingHorizontal: '5%',
  },
  actionBtn: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
  },
  actionText: {
    color: colors.twhite,
    fontWeight: '500',
    fontSize: fontSizes.bodyText1,
  },
  content: {
    paddingVertical: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailText: {
    color: colors.sMainBlue,
  },
  detailsBox: {
    alignItems: 'center',
    width: '100%',
  },
  badges: {
    justifyContent: 'flex-start',
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: '5%',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
  },
  badgeHeader: {
    textAlign: 'center',
    color: colors.sMainBlue,
    fontWeight: '500',
    fontSize: fontSizes.paragragh2,
  },
  divider: {
    height: 1,
    marginVertical: 30,
    width: '80%',
    backgroundColor: colors.sLighterBlue,
  },
  itemImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  itemCaret: {
    width: 20,
    height: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  privacyBlock: {
    marginBottom: 15,
    width: '85%',
  },
  privacyTitle: {
    marginBottom: 10,
    color: colors.sMainBlue,
  },
  privacyContent: {
    marginBottom: 10,
    color: colors.sMainBlue,
  },
  textInput: {
    marginVertical: 40,
    width: '80%',
  },
  buttonWrapper: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 50,
    width: '100%',
  },
  notifications: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  notificationWrapper: {
    flexDirection: 'row-reverse',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  notificationLabel: {
    fontSize: fontSizes.paragragh2,
    fontWeight: '500',
    color: colors.sMainBlue,
  },
  securityTitle1: {
    fontSize: fontSizes.header5,
    fontWeight: '500',
    color: colors.sMainBlue,
    textAlign: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  securityTitle: {
    fontSize: fontSizes.paragragh,
    fontWeight: '400',
    color: colors.sMainBlue,
    textAlign: 'center',
    borderColor: 'red',
  },
  securityType: {
    fontSize: fontSizes.paragragh,
    fontWeight: '900',
    color: colors.sMainBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  securityBtn: {
    width: '47%',
    backgroundColor: colors.sMainBlue,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  contactImg: {
    width: 40,
    height: 40,
  },
  copyWrite: {
    marginBottom: 40,
    textAlign: 'center',
  },
  securityFormWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  biometricWrapper: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerStyle: {
    width: 180,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  pickerWrapper: {
    width: 120,
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
  resetWrapper: {
    marginVertical: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '90%',
  },
  resetBtn: {
    backgroundColor: 'transparent',
    width: 150,
  },
  resetQuestion: {
    color: colors.sMainBlue,
    fontSize: fontSizes.paragragh2,
  },
  resetBtnText: {
    textDecorationColor: colors.sMainBlue,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    color: colors.sMainBlue,
    fontSize: fontSizes.paragragh2,
  },
  secretAnswerInputWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  mfaChoice: {
    width: '90%',
    marginTop: 70,
  },
  menuIcon: {
    width: 50,
    height: 50
  },
  // security card
  secCard: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: colors.sLighterBlue,
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.sTextYellow
  },
  secTitle: {
    color: colors.sMainBlue
  },
  secDetail: {
    // color: colors.sLightBlue
  },
  authTypeWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  halfBtn: {
    width: '48%',
  },
  tabHeader: {
    paddingVertical: '3%',
    paddingHorizontal: '4%',
  }
});

export default styles;
