import React from 'react';
import {View} from 'react-native';
import {Button, Header} from '../../common';
// import {Paragraph} from '../../common/Text';
// import {colors} from '../../utils/theme';
import styles from './AccountOthers.styles';

// const secTypes = ['Lock Debit on Account', 'Lock Debit Card'];

export const AccountOthers = ({navigation}: any) => {
  // const [confirmCloseAcct, setConfirmCloseAcct] = useState(false);
  // const [securityType, setSecurityType] = useState<Record<string, boolean>>({
  //   [secTypes[0]]: false,
  //   [secTypes[1]]: false,
  // });

  // const handleSetNotifcation = (notType: string) => {
  //   setSecurityType(prevState => ({
  //     ...prevState,
  //     [notType]: !securityType[notType],
  //   }));
  // };
  const handleMoveToFeedback = () => {
    navigation.navigate('Feedback');
  };

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.goBack()}
        showBackBtn
        title={'Account Others'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          {/* {secTypes.map(security => (
            <View style={styles.notificationWrapper} key={security}>
              <Switch
                trackColor={{false: colors.tlightgrey, true: colors.sMainBlue}}
                thumbColor={
                  securityType[security] ? colors.sYellow : colors.twhite
                }
                ios_backgroundColor={colors.tlightgrey}
                onValueChange={() => handleSetNotifcation(security)}
                value={securityType[security]}
              />
              <Paragraph
                text={security}
                overrideStyle={styles.notificationLabel}
              />
            </View>
          ))} */}
          <Button
            label="Close Account."
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={handleMoveToFeedback}
          />
          <Button
            label="Open Another Account."
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={handleMoveToFeedback}
          />
          <Button
            label="Report Fraud"
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={handleMoveToFeedback}
          />
        </View>
      </View>
      {/* {securityType[secTypes[0]] && (
        <Confirmation
          actionText={'Are You Sure you want to Lock Your Account?'}
          onPressNo={() => handleSetNotifcation(secTypes[0])}
          onPressYes={() => handleSetNotifcation(secTypes[0])}
        />
      )}
      {securityType[secTypes[1]] && (
        <Confirmation
          actionText={'Are You Sure you want to Lock Your Debit Card?'}
          onPressNo={() => handleSetNotifcation(secTypes[1])}
          onPressYes={() => handleSetNotifcation(secTypes[1])}
        />
      )}
      {confirmCloseAcct && (
        <Confirmation
          actionText={'Are You Sure you want to close your account?'}
          onPressNo={() => setConfirmCloseAcct(false)}
          onPressYes={() => setConfirmCloseAcct(false)}
        />
      )} */}
    </View>
  );
};

export default AccountOthers;
