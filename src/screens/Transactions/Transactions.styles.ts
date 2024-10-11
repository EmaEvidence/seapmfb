import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.sTextYellow,
    paddingHorizontal: '2%',
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
    width: '90%',
    padding: 20,
    marginVertical: 5,
    backgroundColor: colors.twhite,
    borderRadius: 10,
  },
  detWrapper: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 40,
    width: '100%',
    padding: 20,
    marginVertical: 5,
    backgroundColor: colors.twhite,
    borderRadius: 10,
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
    marginVertical: 5,
  },
  btnStyle: {
    width: '48%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: fontSizes.bodyText,
    opacity: 0.8,
    marginBottom: 20
  },
  periodChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    backgroundColor: colors.sLightBlue,
    borderWidth: 1,
  },
  periodChipLabel: {
    color: colors.sMainBlue
  },
  customWrapper: {
    padding: 20,
    paddingTop: 50,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default styles;
