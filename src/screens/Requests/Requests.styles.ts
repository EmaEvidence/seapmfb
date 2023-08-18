import {StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../utils/theme';

export const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: colors.twhite,
    paddingHorizontal: '5%',
  },
  actionBtn: {
    backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 10,
  },
  actionText: {
    color: colors.twhite,
    fontWeight: '500',
    fontSize: fontSizes.bodyText2,
  },
  content: {
    paddingVertical: '10%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifications: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  notificationWrapper: {
    flexDirection: 'row-reverse',
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  notificationLabel: {
    fontSize: fontSizes.paragragh2,
    fontWeight: '500',
    color: colors.sMainBlue,
  },
  securityBtn: {
    width: '80%',
    backgroundColor: colors.sMainBlue,
    marginVertical: 15,
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default styles;
