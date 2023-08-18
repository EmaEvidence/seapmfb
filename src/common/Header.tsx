import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Header1, Header4} from './Text';
import {colors, fontSizes} from '../utils/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useAppSelector } from '../app/hooks';

export const Header = ({
  title,
  navigation,
  showBackBtn,
  renderRightIcon,
  overrideGoBack,
  renderLeftIcon,
}: {
  title: string;
  navigation: any;
  showBackBtn?: boolean;
  overrideGoBack?: () => void;
  renderRightIcon?: () => React.ReactElement;
  renderLeftIcon?: () => React.ReactElement;
}): JSX.Element => {
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {showBackBtn ? (
          <TouchableOpacity
            onPress={() => {
              if (isAuthenticated) {
                overrideGoBack ? overrideGoBack() : navigation.jumpTo('Home');
              } else {
                navigation.navigate('Welcome');
              }
            }}
            style={styles.backBtn}>
            <Header1 text="<" />
          </TouchableOpacity>
        ) : renderLeftIcon ? (
          renderLeftIcon()
        ) : null}
        <Header4 text={title} overrideStyle={styles.title} />
      </View>
      {renderRightIcon ? (
        renderRightIcon()
      ) : (
        <TouchableOpacity
          // onPress={() => navigation.navigate('Notification')}
          style={styles.avatarWrapper}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    color: colors.sMainBlue,
    fontFamily: 'Trebuchet MS',
    fontSize: fontSizes.header5,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'android' ? '3%' : 0,
    marginBottom: 10,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    marginRight: 15,
    // backgroundColor: colors.sYellow,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  avatarWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // backgroundColor: colors.tblack,
  },
});
