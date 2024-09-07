import React from 'react';
import {View, StyleSheet, Share} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Header4, Paragraph} from './Text';
import {colors, fontSizes} from '../utils/theme';
import {useAppSelector} from '../app/hooks';
import {LogOutBtn} from '../screens';

const content = [
  {name: 'Beneficiaries', link: 'Beneficiaries'},
  // {name: 'Feedback', link: 'Feedback'},
  {name: 'Settings', link: 'Profile'},
  {name: 'Share', link: 'Profile'},
];

export const onShare = async () => {
  try {
    await Share.share({
      message: 'SEAP MFB | Your entire banking hall in your hands!',
    });
    // if (result.action === Share.sharedAction) {
    //   if (result.activityType) {
    //     // shared with activity type of result.activityType
    //   } else {
    //     // shared
    //   }
    // } else if (result.action === Share.dismissedAction) {
    //   // dismissed
    // }
  } catch (error) {
    // alert(error.message);
  }
};

export const DrawerContent = ({navigation}: any) => {
  const {user} = useAppSelector(state => state.auth);
  const {Name, Email} = user && JSON.parse(user);
  const renderContent = () => {
    return (
      <View>
        {content.map((menu: {name: string; link: string}) => (
          <DrawerItem
            labelStyle={styles.menuItem}
            label={menu.name}
            onPress={() => {
              if (menu.name === 'Share') {
                return onShare();
              }
              navigation.navigate(menu.link);
            }}
            key={menu.name}
            style={styles.menuItemWrapper}
          />
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header4 text={Name} overrideStyle={styles.contentText} />
        <Paragraph text={Email} overrideStyle={styles.contentText} />
      </View>
      <View style={styles.menuList}>
        <DrawerContentScrollView showsVerticalScrollIndicator={false}>
          {renderContent()}
        </DrawerContentScrollView>
      </View>
      <View style={styles.logOutWrapper}>
        <LogOutBtn type="normal" overrideStyle={styles.logOutBtn} />
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: colors.twhite,
  },
  header: {
    height: '10%',
    backgroundColor: colors.sLightBlue,
    paddingHorizontal: '5%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logOutWrapper: {
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutBtn: {
    width: '80%',
  },
  contentText: {
    color: colors.sMainBlue,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
  },
  sectionTitle: {
    fontWeight: '800',
    textTransform: 'uppercase',
    fontSize: fontSizes.paragragh2,
    letterSpacing: 2,
  },
  menuItem: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '500',
    fontSize: fontSizes.paragragh1,
    letterSpacing: 1,
    lineHeight: 16,
    color: colors.sMainBlue,
  },
  menuItemWrapper: {
    height: 40,
    paddingVertical: 0,
  },
});
