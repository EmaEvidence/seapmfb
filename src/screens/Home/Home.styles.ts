import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
    paddingHorizontal: '5%',
  },
  nuggetWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '4%',
  },
  nugget: {
    fontFamily: 'Trebuchet MS',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.paragragh,
    color: colors.sMainBlue,
  },
  nuggetSource: {
    fontFamily: 'Trebuchet MS',
    marginTop: 10,
    fontWeight: '600',
    fontSize: fontSizes.paragragh,
    color: colors.sMainBlue,
  },
  actionBtn: {
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
  },
  actionText: {
    color: colors.tblue,
    fontWeight: '500',
    fontSize: fontSizes.bodyText2,
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    width: '100%',
  },
  section: {
    width: '100%',
    marginVertical: 10,
  },
  limitLabel: {
    bottom: 15,
    position: 'absolute',
    color: colors.twhite,
    textAlign: 'center',
    width: '100%',
  },
  subheaderText: {
    color: colors.sMainBlue,
  },
  articleCard: {
    width: Dimensions.get('screen').width * 0.3,
    marginRight: 20,
    height: 170,
    borderRadius: 10,
    backgroundColor: colors.sLightBlue,
  },
  articleCardTitle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.sMainBlue,
    width: '100%',
    height: '25%',
  },
  card: {
    width: Dimensions.get('screen').width * 0.85,
    margin: 'auto',
    alignSelf: 'center',
    height: 250,
    backgroundColor: colors.sMainBlue,
    borderRadius: 20,
    padding: '6%',
    marginRight: 10,
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
  cardTop: {},
  account: {
    color: colors.twhite,
    fontSize: fontSizes.header4,
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
  menu: {
    marginRight: 10,
  },
  menuIcon: {
    width: 30,
    height: 30
  },
  noTransaction: {
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 50,
  },
  advertCard: {
    flexDirection: 'row',
    marginRight: 15,
    backgroundColor: colors.sLightBlue,
    borderRadius: 10,
    height: 100,
    width: Dimensions.get('screen').width * 0.7,
  },
  advertImgWrapper: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  advertImg: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  advertTextWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  advertText: {
    fontSize: fontSizes.header4,
    width: '100%',
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  hideBtn: {
    position: 'absolute',
    top: 20,
    right: 25,
  },
});

export default styles;
