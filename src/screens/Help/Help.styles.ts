import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
  },
  section: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingLeft: '5%',
    marginVertical: 15,
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    backgroundColor: colors.tgrey,
    width: '95%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dotWrapper: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
  },
  insightSection: {
    height: Dimensions.get('screen').height * 0.3,
    flexDirection: 'column',
  },
  scrollStyle: {
    height: '80%',
  },
  insightText: {
    color: colors.tblack,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  sourceText: {
    color: colors.tblack,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
