import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  textInput: {
    marginVertical: 25,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  mfabuttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mfabutton: {
    borderRadius: 5,
    width: 'auto',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 300
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
    borderColor: colors.tblue,
  },
  codeFieldRoot: {
    marginTop: 10,
    marginBottom: 20,
  },
  fingerWrapper: {
    width: 80,
    height: 80,
    marginBottom: 40,
    alignSelf: 'center',
  },
  fingerImg: {
    width: '100%',
    height: '100%',
  },
  fingerMessage: {
    textAlign: 'center',
    width: '75%',
    alignSelf: 'center',
  },
  fingerPrintWrapper: {
    width: '100%',
  },
  pickerStyle: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.sMainBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainerStyle: {
    borderWidth: 1,
    borderColor: colors.sMainBlue,
    width: '100%',
  },
  pickerWrapper: {
    width: '80%',
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pickerItem: {
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  pickerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
