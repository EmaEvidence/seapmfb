import {Dimensions, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    backgroundColor: '#18288074',
  },
  logo: {
    alignSelf: 'center',
    width: '40%',
    height: 200,
  },
  header: {
    marginVertical: 5,
    fontWeight: '600',
    fontSize: fontSizes.header1,
    fontFamily: 'Poppins-Regular',
    color: colors.twhite,
    textAlign: 'center',
  },
  fullBtn: {
    width: '100%',
    marginVertical: 10,
    minHeight: 50,
  },
  halfBtn: {
    width: '47%',
    marginVertical: 10,
    minHeight: 50,
    // backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.sMainBlue,
  },
  halfBtnWrapper: {
    width: '100%',
  },
  video: {
    position: 'absolute',
    height: Dimensions.get('screen').height,
    alignItems: 'stretch',
    width: Dimensions.get('screen').width,
  },
});

export default styles;
