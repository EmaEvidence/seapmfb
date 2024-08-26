import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';
import {width,height} from '../../utils/constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width,
    justifyContent: 'space-between',
    backgroundColor: colors.sMainBlue,
  },
  scrollContent: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    width,
    height,
  },
  content: {
    height: '40%',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#0F2A93',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: '2%',
    width,
  },
  dotWrapper: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btn: {
    paddingHorizontal: 10,
    width: width * 0.4,
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  btnLabel: {
    color: colors.sYellow,
    width: '100%',
    textAlign: 'right'
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: '10%',
    paddingBottom: 70,
    paddingHorizontal: 30,
  },
  logo: {
    alignSelf: 'flex-end',
    marginRight: 30,
    width: 80,
    height: 80,
  },
  title: {
    color: colors.sYellow,
    fontWeight: '800',
    fontSize: 28,
    lineHeight: 32,
  },
  detail: {
    color: colors.twhite,
    fontSize: fontSizes.paragragh1,
  },
});

export default styles;
