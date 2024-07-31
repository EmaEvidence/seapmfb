import {StyleSheet, Dimensions} from 'react-native';
import {loadItem} from './localStorage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const isSmall = width <= 320 || height <= 600;

export const flexRow = StyleSheet.create({
  style: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const flexCol = StyleSheet.create({
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const colors = {
  tblack: '#000000',
  tgrey: '#C4C4C4',
  tlightgrey: '#EDEDED',
  tfaintgrey: '#E0E0E0',
  tblue: '#2D87AE',
  twhite: '#FFFFFF',
  sMainBlue: '#182880',
  sYellow: '#DEBF16',
  sLightBlue: '#EEF4FF',
  sTextYellow: '#FAFAFA',
  sLighterBlue: '#4F5783',
  sRed: 'red',
};

const handleModifyFontSize = async (val: number) => {
  const savedFontSize = await loadItem('fontSize');
  if (!savedFontSize) {
    return val;
  }
  switch (savedFontSize) {
    case 'Smaller':
      return val - 2;
    case 'Default':
      return val;
    case 'Bigger':
      return val + 2;
    default:
      return val;
  }
};

export const fontSizes = {
  bodyText: isSmall ? 9 : 10,
  bodyText1: isSmall ? 10 : 11,
  bodyText2: isSmall ? 11 : 12,
  paragragh: isSmall ? 12 : 14,
  paragragh1: isSmall ? 13 : 15,
  paragragh2: isSmall ? 14 : 16,
  paragragh3: isSmall ? 16 : 17,
  header1: isSmall ? 20 : 24,
  header2: isSmall ? 20 : 24,
  header3: isSmall ? 20 : 24,
  header4: isSmall ? 18 : 20,
  header5: isSmall ? 16 : 18,
  bigHeader: isSmall ? 24 : 28,
};

export const SEAPTHEME = StyleSheet.create({
  container: {
    width: '100%',
  },
  style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.sMainBlue,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: colors.twhite,
  },
  label: {
    flex: 1,
    color: colors.sMainBlue,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  tickIcon: {
    width: 20,
    height: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  badgeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.sLightBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 8,
    backgroundColor: colors.tfaintgrey,
  },
  badgeSeparator: {
    width: 5,
  },
  listBody: {
    height: '100%',
  },
  listBodyContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  dropDownContainer: {
    position: 'absolute',
    backgroundColor: colors.twhite,
    borderRadius: 8,
    borderColor: colors.sMainBlue,
    borderWidth: 1,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1000,
  },
  modalContentContainer: {
    flexGrow: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 40,
  },
  listItemLabel: {
    flex: 1,
    color: colors.sMainBlue,
  },
  iconContainer: {
    marginRight: 10,
  },
  arrowIconContainer: {
    marginLeft: 10,
  },
  tickIconContainer: {
    marginLeft: 10,
  },
  closeIconContainer: {
    marginLeft: 10,
  },
  listParentLabel: {},
  listChildLabel: {},
  listParentContainer: {},
  listChildContainer: {
    paddingLeft: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: colors.sMainBlue,
    borderBottomWidth: 1,
  },
  searchTextInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: colors.sMainBlue,
    borderWidth: 1,
    color: colors.sMainBlue,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.sMainBlue,
  },
  flatListContentContainer: {
    flexGrow: 1,
  },
  customItemContainer: {},
  customItemLabel: {
    fontStyle: 'italic',
  },
  listMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  listMessageText: {},
  selectedItemContainer: {},
  selectedItemLabel: {},
  modalTitle: {
    fontSize: 18,
    color: colors.sMainBlue,
  },
  extendableBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  extendableBadgeItemContainer: {
    marginVertical: 3,
    marginEnd: 7,
  },
  halfBtn: {
    width: '47%',
  },
});
