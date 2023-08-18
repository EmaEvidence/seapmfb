import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
    paddingHorizontal: '5%',
    paddingBottom: '9%',
  },
  safeWrapper: {
    backgroundColor: colors.twhite,
  },
  subwrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
    minHeight: '100%',
    height: 'auto',
  },
  section: {
    width: '100%',
    marginVertical: 15,
  },
  btn: {
    width: 'auto',
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.sMainBlue,
    borderRadius: 5,
  },
  loanCard: {
    width: Dimensions.get('screen').width * 0.3,
    margin: 20,
    height: 150,
    borderRadius: 10,
    backgroundColor: colors.sLightBlue,
  },
  loanCardTitle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.sMainBlue,
    width: '100%',
    height: '25%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  cardLabel: {
    flexDirection: 'column',
    fontWeight: '500',
    color: colors.twhite,
    textAlign: 'center',
  },
  loanWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    paddingHorizontal: 0,
  },
  applyBtn: {
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
  description: {
    fontSize: fontSizes.paragragh2,
    fontWeight: '600',
  },
  listItem: {
    marginVertical: 5,
    fontSize: fontSizes.paragragh,
    fontWeight: '400',
  },
  card: {
    width: '90%',
    margin: 'auto',
    alignSelf: 'center',
    height: 250,
    backgroundColor: colors.sMainBlue,
    borderRadius: 20,
    padding: '7%',
    justifyContent: 'space-between',
  },
  cardBottom: {
    width: '100%',
    height: 60,
    backgroundColor: colors.twhite,
    borderRadius: 10,
    borderWidth: 0,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardMiddle: {},
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  account: {
    color: colors.twhite,
    fontSize: fontSizes.paragragh2,
    letterSpacing: 3,
    fontWeight: '600',
    fontFamily: 'Trebuchet MS',
  },
  balanceLabel: {
    color: colors.twhite,
    fontSize: fontSizes.paragragh,
    fontFamily: 'Trebuchet MS',
  },
  balance: {
    color: colors.twhite,
    fontSize: fontSizes.header1,
    fontWeight: '800',
    fontFamily: 'Trebuchet MS',
  },
  actionCardText: {
    fontSize: fontSizes.bodyText1,
    color: colors.sMainBlue,
  },
  cardAction: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.sLightBlue,
  },
  actionImg: {
    width: 15,
    height: 15,
  },

  textInput: {
    marginVertical: 30,
    width: '80%',
  },
  buttonWrapper: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
  },
  comingSoon: {
    width: '80%',
    textAlign: 'center',
    color: colors.sMainBlue,
    marginVertical: 20,
  },
});

export default styles;
