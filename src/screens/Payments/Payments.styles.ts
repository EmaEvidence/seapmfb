import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
    paddingHorizontal: '5%',
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
    width: '100%',
  },
  paymentWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    flexWrap: 'wrap',
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
  },
  cardLabel: {
    flexDirection: 'column',
    fontWeight: '500',
    color: colors.twhite,
    textAlign: 'center',
  },
  dataWrapper: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '85%',
    height: '90%',
  },
  pickerStyle: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#F4F4F5',
    borderColor: 'transparent',
    marginVertical: 10,
  },
  pickerWrapper: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  pickerItem: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  chargeWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.sTextYellow,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  chargeInput: {
    width: '45%',
  },
  continueWrapper: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  step1Wrapper: {
    width: '100%',
    // paddingHorizontal: '10%',
    flex: 1,
  },
  authTitle: {
    marginBottom: 50,
    color: colors.sMainBlue,
    backgroundColor: colors.sTextYellow,
    borderRadius: 5,
    padding: 20,
  },
  btnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  btn: {
    width: '40%',
  },
  serviceWrapper: {
    width: '40%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  serviceTitle: {
    fontSize: fontSizes.paragragh2,
    color: colors.sMainBlue,
  },
  serviceAmt: {
    fontSize: fontSizes.paragragh,
    color: colors.sMainBlue,
  },
  acctSelector: {
    width: '100%',
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: colors.sTextYellow,
  },
  containerScroll: {
    minHeight: '100%',
    paddingBottom: 50,
    backgroundColor: colors.twhite,
  },
  electricityWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  electricityInput: {
    width: '48%',
  },
  tvInput: {
    width: '100%',
  },
  inputStyle: {
    marginVertical: 10,
  },
  validate: {
    width: '100%',
    alignItems: 'center',
  },
  reValidateBtn: {
    backgroundColor: 'transparent',
  },
  reValidateLabel: {
    color: colors.sMainBlue,
    fontSize: fontSizes.bodyText2,
  },
  categoryChip: {
    width: Dimensions.get('screen').width * 0.4,
    paddingVertical: 15,
    height: 90,
    backgroundColor: colors.sLightBlue,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  billerChip: {
    height: 55,
    width: Dimensions.get('screen').width * 0.6,
    backgroundColor: colors.sLightBlue,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  selectedChip: {
    borderWidth: 2,
    borderColor: colors.sYellow,
  },
  chipLabel: {
    textAlign: 'left',
    color: colors.sMainBlue,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: fontSizes.paragragh2,
    marginVertical: 10,
  },
  categoryLabel: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
    width: '80%',
    fontSize: fontSizes.paragragh,
    lineHeight: 16,
  },
  more: {
    fontSize: fontSizes.bodyText,
  },
  catImage: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  dropdownImg: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  textLogoText: {
    color: colors.sYellow,
    fontWeight: '700',
  },
  textLogoWrapper: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    backgroundColor: colors.sMainBlue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: fontSizes.header5,
    width: '80%',
    marginHorizontal: 'auto',
    fontWeight: '500',
  },
  noPackage: {
    fontSize: fontSizes.bodyText2,
    marginVertical: 20,
  },
  chipWrapper: {
    width: '100%',
    flexWrap: 'wrap',
  },
  paymentDetailsView: {
    backgroundColor: colors.sTextYellow,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  }
});

export default styles;
