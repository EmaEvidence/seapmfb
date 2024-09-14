import React, {useRef, useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, Pressable, Switch, View, TouchableOpacity} from 'react-native';
// import {requestOTPCall} from '../../app/actions/auth';
import {Button, Header, RowView} from '../../common';
import {Header2, Header3, Header4, Header5, Paragraph} from '../../common/Text';
import {colors} from '../../utils/theme';
import Caret from '../../assets/images/caretY.png';
import {MFAChoiceComponent} from '../MFA';
import styles from './Profile.styles';
import {height, transactionAuthTypes} from '../../utils/constants';
import {useTransactionAuthType} from '../../hooks';
import RBSheet from 'react-native-raw-bottom-sheet';
import ChangeSecret from './ChangeSecret';
import ChangePin from './ChangePin';
import ChangePassword from './ChangePassword';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../App';

export const mfaChangeMap = {
  [transactionAuthTypes[0]]: 'ChangePin',
  [transactionAuthTypes[1]]: '',
  [transactionAuthTypes[2]]: 'ChangePin',
  [transactionAuthTypes[3]]: 'ChangePassword',
};

export const Security = ({navigation}: any) => {
  const refRBSheet = useRef();
  const refRBSheetSecretQue = useRef();
  const pinRef = useRef();
  const passwordRef = useRef();
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
        overrideGoBack={() => navigation.navigate('Settings')}
        showBackBtn
        title={'Security'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.notifications}>
          {/* {Object.keys(securityType).map(security => (
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
          </View> */}
          {
          setType ? (
            <>
              {
                !isOTP ? (
                  <SecurityCard
                    title={`Modify transaction ${authName}`}
                    onPress={() => (authName.toLowerCase() === 'transaction password' ? passwordRef : pinRef)?.current?.open()}
                  />
                ) : null
              }
              <SecurityCard
                title="Change authorization mode"
                details={authName}
                onPress={() => refRBSheet.current.open()}
              />
            </>
          ) : (
            <>
              <SecurityCard
                title='Set authorization mode'
                onPress={() => refRBSheet.current.open()}
              />
            </>
          )
        }
        <SecurityCard
          title='Reset secret question'
          onPress={() => refRBSheetSecretQue.current.open()}
        />
        </View>
      </View>
      {/* ``change authType */}
      <RBSheet
        height={height * 0.5}
        // @ts-ignore
        ref={refRBSheet}
        // useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: colors.sTransparentBlue,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
          <MFAChoiceComponent
            navigation={navigation}
            handleSuccess={() => refRBSheet.current.close()}
          />
          <Toast
            visibilityTime={10000}
            autoHide={false}
            onPress={() => Toast.hide()}
            // @ts-ignore
            config={toastConfig}
          />
      </RBSheet>
      {/* Reset secret question */}
      <RBSheet
        height={height * 0.8}
        // @ts-ignore
        ref={refRBSheetSecretQue}
        // useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: colors.sTransparentBlue,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
          <ChangeSecret />
          <Toast
            visibilityTime={10000}
            autoHide={false}
            onPress={() => Toast.hide()}
            // @ts-ignore
            config={toastConfig}
          />
      </RBSheet>
      {/* Manage PIN */}
      <RBSheet
        height={height * 0.7}
        // @ts-ignore
        ref={pinRef}
        customStyles={{
          wrapper: {
            backgroundColor: colors.sTransparentBlue,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
          <ChangePin />
          <Toast
            visibilityTime={10000}
            autoHide={false}
            onPress={() => Toast.hide()}
            // @ts-ignore
            config={toastConfig}
          />
      </RBSheet>
      {/* Manage Passcode */}
      <RBSheet
        height={height * 0.7}
        // @ts-ignore
        ref={passwordRef}
        customStyles={{
          wrapper: {
            backgroundColor: colors.sTransparentBlue,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
          <ChangePassword />
          <Toast
            visibilityTime={10000}
            autoHide={false}
            onPress={() => Toast.hide()}
            // @ts-ignore
            config={toastConfig}
          />
      </RBSheet>
    </View>
  );
};

export default Security;

export const SecurityCard = ({title, details, onPress}: { title: string, details?: string, onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.secCard}>
      <View>
        <Header4 text={title} overrideStyle={styles.secTitle} />
        {details && <Paragraph text={details} overrideStyle={styles.secDetail} />}
      </View>
      <Image style={styles.itemCaret} source={Caret} />
    </TouchableOpacity>
  )
}
