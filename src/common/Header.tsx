import React from 'react';
import {Platform, StyleSheet, View, TouchableOpacity, Image, TextStyle, ViewStyle} from 'react-native';
import {Header1, Header3, Header4} from './Text';
import {colors, fontSizes} from '../utils/theme';
import { useAppSelector } from '../app/hooks';
import BackIcon from '../assets/images/goBack.png';

export const Header = ({
  title,
  navigation,
  showBackBtn,
  renderRightIcon,
  overrideGoBack,
  renderLeftIcon,
  overrideLabelStyle
}: {
  title: string;
  navigation: any;
  showBackBtn?: boolean;
  overrideGoBack?: () => void;
  renderRightIcon?: () => React.ReactElement;
  renderLeftIcon?: () => React.ReactElement;
  overrideLabelStyle?: TextStyle;
  overrideStyle?: ViewStyle;
}): JSX.Element => {
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  return (
    <View style={[styles.header]}>
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
            <Image source={BackIcon} style={styles.backImg} />
          </TouchableOpacity>
        ) : renderLeftIcon ? (
          renderLeftIcon()
        ) : null}
        <Header3 text={title} overrideStyle={[styles.title, overrideLabelStyle]} />
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
    fontWeight: '700',
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
    backgroundColor: colors.tlightgrey,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  backImg: {
    width: 15,
    height: 15
  },
  avatarWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // backgroundColor: colors.tblack,
  },
});
