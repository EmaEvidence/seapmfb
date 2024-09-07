import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';

export const styles = StyleSheet.create({
  textInput: {
    marginVertical: 10,
  },
  formWrapper: {
    marginVertical: 10,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 70
  },
  button: {
    borderRadius: 500,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfBtn: {
    width: '48%',
  },
  successWrapper: {
    width: '90%',
    alignSelf: 'center',
    height: 300,
    backgroundColor: colors.sMainBlue,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    marginVertical: 50,
  },
  successText: {
    color: colors.twhite,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  balDrpdwnMt: {
    marginTop: 15
  }
});

export default styles;
