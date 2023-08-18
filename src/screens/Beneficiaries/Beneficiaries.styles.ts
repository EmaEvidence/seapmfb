import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';
import {width, height} from '../../utils/constants';

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
    alignItems: 'center',
    // height: '100%',
    flexWrap: 'wrap',
    padding: '1%',
  },
  notFound: {
    width: '100%',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: colors.tblack,
    marginVertical: 10,
  },
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '80%',
    marginVertical: 5,
  },
  receiptBtn: {
    width: 200,
  },
  receipt: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateWrapper: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    width: '100%',
  },
  beneWrapper: {
    backgroundColor: colors.sLightBlue,
    marginVertical: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  beneMain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  beneLogo: {
    width: 50,
    height: 50,
    backgroundColor: colors.sMainBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 15,
  },
  beneLogoText: {
    color: colors.twhite,
  },
  beneBtn: {
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.sMainBlue,
    borderRadius: 5,
  },
  beneBtnLabel: {
    color: colors.sMainBlue,
  },
  beneDetailsWrapper: {
    alignSelf: 'flex-start',
    width: '70%',
  },
  beneName: {
    width: '100%',
    fontSize: fontSizes.paragragh2,
  },
  deleteModal: {
    width,
    height,
    backgroundColor: colors.twhite,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfBtn: {
    width: '45%',
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
  textColor: {
    color: colors.sMainBlue,
  },
});

export default styles;
