import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
} from 'react-native';
import {width} from '../utils/constants';
import {colors, fontSizes} from '../utils/theme';
import {Header2, Paragraph} from './Text';

interface ConfirmationProps {
  actionText: string;
  overrideStyle?: ViewStyle | ViewStyle[];
  overrideLabelStyle?: TextStyle;
  onPressNo: () => void;
  onPressYes: () => void;
  overrideWrapper?: ViewStyle | ViewStyle[];
  renderContent?: () => React.ReactElement;
}

export const Confirmation = ({
  actionText,
  onPressYes,
  onPressNo,
  overrideWrapper,
  renderContent,
}: ConfirmationProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, overrideWrapper]}>
        {renderContent ? (
          renderContent()
        ) : (
          <>
            <View style={styles.header}>
              <Header2
                text="Confirm Action"
                overrideStyle={styles.headerText}
              />
            </View>
            <View style={styles.infoWrapper}>
              <Paragraph overrideStyle={styles.info} text={actionText} />
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity style={styles.yesBtn} onPress={onPressYes}>
                <Header2 overrideStyle={styles.yesText} text="Yes" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.noBtn} onPress={onPressNo}>
                <Header2 text="No" overrideStyle={styles.noText} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: colors.sLightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: 200,
    width: '80%',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    shadowOpacity: 0.5,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.twhite,
  },
  header: {
    height: 50,
    width: '100%',
    backgroundColor: colors.sMainBlue,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: colors.twhite,
  },
  infoWrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: fontSizes.paragragh1,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.sMainBlue,
  },
  actionText: {
    fontSize: fontSizes.bodyText2,
    fontWeight: '700',
    textAlign: 'center',
  },
  noBtn: {
    height: 50,
    borderColor: '#FFF',
    borderBottomRightRadius: 20,
    width: '49.5%',
    borderWidth: 1,
    backgroundColor: colors.sMainBlue,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.twhite,
  },
  yesBtn: {
    height: 50,
    borderColor: '#FFF',
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    width: '49.5%',
    backgroundColor: colors.sMainBlue,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.twhite,
  },
  noText: {
    fontSize: fontSizes.paragragh1,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.twhite,
  },
  yesText: {
    fontSize: fontSizes.paragragh1,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.twhite,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
