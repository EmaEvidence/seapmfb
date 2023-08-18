import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  textInput: {
    marginVertical: 15,
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
  fgtPswordbutton: {
    backgroundColor: 'transparent',
    width: '100%',
    marginVertical: '10%',
  },
  fgtPswordbuttonLabel: {
    color: colors.tblue,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfBtn: {
    width: '45%',
  },
});

export default styles;
