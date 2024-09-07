import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  textInput: {
    marginVertical: 25,
  },
  text: {
    marginTop: 10,
    color: colors.tblue,
  },
  name: {
    marginBottom: 30,
    color: colors.tblue,
  },
  img: {
    width: 50,
    height: 50,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 200,
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
});

export default styles;
