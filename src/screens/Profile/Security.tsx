import React, {useState} from 'react';
import {Switch, View} from 'react-native';
// import {requestOTPCall} from '../../app/actions/auth';
import {Button, Header, RowView} from '../../common';
import {Header2, Paragraph} from '../../common/Text';
import {colors} from '../../utils/theme';
import {MFAChoiceComponent} from '../MFA';
import styles from './Profile.styles';
import {transactionAuthTypes} from '../../utils/constants';
import {useTransactionAuthType} from '../../hooks';

export const mfaChangeMap = {
  [transactionAuthTypes[0]]: 'ChangePin',
  [transactionAuthTypes[1]]: '',
  [transactionAuthTypes[2]]: 'FingerPrint',
  [transactionAuthTypes[3]]: 'ChangePin',
  [transactionAuthTypes[4]]: 'ChangePassword',
};

export const Security = ({navigation}: any) => {
  const [showMFAChoice, setShowMFAChoice] = useState(false);
  const authTypeObj = useTransactionAuthType();
  const setType = authTypeObj.type;
  const {authName} = authTypeObj;
  // const {hasBiometric} = useHasBiometric();
  const [securityType, setSecurityType] = useState<Record<string, boolean>>({
    // 'Biometric ID': true,
    // 'Remember Me': true,
  });

  const handleSetNotifcation = (notType: string) => {
    setSecurityType(prevState => ({
      ...prevState,
      [notType]: !securityType[notType],
    }));
  };

  // const handleChangeSecret = async () => {
  //   const acctNo = (await loadItem('acctNo')) || '';
  //   const resp = await requestOTPCall(acctNo);
  //   if (resp?.status === 200) {
  //     navigation.navigate('ChangeSecret');
  //     toaster('Success', 'An OTP has being sent to You!', 'custom');
  //   }
  // };

  const isOTP = authName === transactionAuthTypes[1];

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Profile')}
        showBackBtn
        title={'Security'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          {Object.keys(securityType).map(security => (
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
          ))}
          <View style={styles.mfaChoice}>
            <Paragraph
              overrideStyle={styles.securityTitle1}
              text={
                setType
                  ? 'Manage Transaction Authorization Type'
                  : 'Set Transaction Authorization Type'
              }
            />
            {setType ? (
              <View>
                <Paragraph
                  overrideStyle={styles.securityTitle}
                  text={'Your current Transaction Authentication is '}
                />
                <Header2
                  overrideStyle={styles.securityType}
                  text={`${authName}.`}
                />
                {showMFAChoice && (
                  <MFAChoiceComponent navigation={navigation} />
                )}
                <RowView justify={isOTP ? 'isCenter' : 'isBtw'}>
                  <>
                    <Button
                      label={showMFAChoice ? 'Done' : 'Choose New Type'}
                      overrideStyle={styles.securityBtn}
                      overrideLabelStyle={styles.actionText}
                      onPress={() => setShowMFAChoice(!showMFAChoice)}
                    />
                    {!isOTP && (
                      <Button
                        label="Modify Value"
                        overrideStyle={styles.securityBtn}
                        overrideLabelStyle={styles.actionText}
                        onPress={() =>
                          navigation.navigate(mfaChangeMap[authName])
                        }
                      />
                    )}
                  </>
                </RowView>
              </View>
            ) : (
              <MFAChoiceComponent navigation={navigation} />
            )}
          </View>
          <Button
            label="Reset secret question"
            overrideStyle={styles.securityBtn}
            overrideLabelStyle={styles.actionText}
            onPress={() => navigation.navigate('ChangeSecret')}
          />
        </View>
      </View>
    </View>
  );
};

export default Security;
