import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
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
  fgtPswordbutton: {
    backgroundColor: 'transparent',
    width: '100%',
    marginVertical: '10%',
  },
  fgtPswordbuttonLabel: {
    color: colors.tblue,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: fontSizes.header1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.tblack,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default styles;
