import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  textInput: {
    marginVertical: 25,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
    width: '48%',
  },
  device: {
    width: '90%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.sLightBlue,
  },
  details: {
    width: '70%',
  },
  checkBox: {
    borderRadius: 50,
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: colors.sMainBlue,
    backgroundColor: colors.twhite,
  },
  checked: {
    backgroundColor: colors.sMainBlue,
  },
  checkBoxWrapper: {
    backgroundColor: colors.sLightBlue,
  },
});

export default styles;
