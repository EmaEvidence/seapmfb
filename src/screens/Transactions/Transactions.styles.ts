import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

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
    height: Dimensions.get('screen').height * 0.65,
    flexWrap: 'wrap',
    padding: '1%',
    marginTop: 20,
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
    minHeight: 40,
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
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  btnStyle: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default styles;
