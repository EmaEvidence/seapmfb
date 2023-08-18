import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
  },
  actionBtn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  actionText: {
    color: colors.tblue,
    fontWeight: '500',
    fontSize: fontSizes.bodyText2,
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
  },
  section: {
    width: '100%',
    paddingHorizontal: '5%',
    marginVertical: 15,
  },
});

export default styles;
