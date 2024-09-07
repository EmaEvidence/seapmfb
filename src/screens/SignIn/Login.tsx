import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import {Button} from '../../common';
import InputText from '../../common/InputText';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import styles from './Login.styles';
import {INavigation} from '../../types';
import {validateNonEmpty} from '../../validator';
import {loginCall} from '../../app/actions/auth';
import {loadItem, saveItem} from '../../utils/localStorage';
import toaster from '../../utils/toaster';
import useDeviceInfo from '../../hooks/useDeviceInfo';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import useLanguage from '../../hooks/useLanguage';
import { FingerPrintComponent } from '../MFA';
import useRefreshToken from '../../hooks/useRefreshToken';
import useHasBiometric from '../../hooks/useHasBiometric';

interface LoginProps {
  navigation: INavigation;
}

const reenrollError =
  'This device is not authorized to access your account. Please use the device enrollment feature to register this device for access on your account';

export const Login = ({navigation}: LoginProps) => {
  const {hasBiometric} = useHasBiometric();
  const {lang} = useLanguage();
  const dispatch = useAppDispatch();
  const {deviceId} = useDeviceInfo();
  const [userData, setData] = useState({
    userId: '',
    password: '',
  });

  const [userError, setError] = useState({
    userId: false,
    password: false,
  });

  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    handleErrorChange(label, !value);
  };

  const handleMFA = async (
    authType: string,
    user: Record<string, string | number>,
  ) => {
    const isMFASet = await loadItem('isMFASet');
    saveItem('user', JSON.stringify(user.UserData));
    if ((!isMFASet && !authType) || user.SDData === 0) {
      navigation.replace('MFAChoice', {isFrom: 'login'});
    } else if ((user.SDData as number) > 0 && !isMFASet) {
      saveItem('isMFASet', user.SDate.toString());
      dispatch(login(user.UserData));
    } else {
      dispatch(login(user.UserData));
    }
  };

  const handleSubmit = async () => {
    const {userId, password} = userData;
    const acctError = !validateNonEmpty(userId);
    const passError = !validateNonEmpty(password);
    if (acctError || passError) {
      setError({
        ...userError,
        password: passError,
        userId: acctError,
      });
      return;
    } else {
      setError(prevState => ({
        ...prevState,
        email: false,
        password: false,
      }));
      delete axios.defaults.headers.common.Authorization
      const resp = await loginCall({
        ...userData,
        deviceId,
        sessionId: '090qwqere',
      }) as AxiosResponse;
      if (resp?.status === 200) {
        saveItem('authToken', resp.data.authenticationToken);
        saveItem('refreshToken', resp.data.refreshToken);
        saveItem('acctNo', userId);
        toaster('Success', 'Login Successful', 'custom');
        const decoded: Record<string, string> = jwt_decode(
          resp.data.authenticationToken,
        );
        axios.defaults.headers.common.Authorization = `Bearer ${resp.data.authenticationToken}`;
        handleMFA(resp.data.authType, decoded);
      }
      if (
        // @ts-ignore
        resp?.response?.data?.errorMessage &&
        // @ts-ignore
        resp?.response?.data?.errorMessage === reenrollError
      ) {
        toaster(
          'Failure',
          'This device is not Enrolled to Access your account',
          'custom',
        );
        navigation.navigate('EnrollDevice', {
          acctNumber: userData.userId,
          userData: {
            ...userData,
            deviceId,
            sessionId: '090qwqere',
          }
        });
      }
    }
  };

  return (
    <UnAuthWrapper
      header={lang.signIn}
      goBack={navigation.goBack}
      description={lang.signInText}
      linkText={'Join online banking'}
      onLinkPress={() => navigation.navigate('SignUp')}
      linkText1={lang.getSeap}
      onLinkPress1={() => navigation.navigate('GetSeapAccount')}>
      <ScrollView>
        <>
          <InputText
            name="userId"
            onChange={handleTextChange}
            label={lang.accNum}
            overrideStyle={styles.textInput}
            value={userData.userId}
            errorText="Please enter your Account Number!"
            inValid={userError.userId}
            placeholder="e.g 1010101010"
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
            returnKeyType="next"
            inputMode='numeric'
            keyboardType='numeric'
          />
          <InputText
            label={lang.password}
            overrideStyle={styles.textInput}
            obsureText={true}
            name="password"
            onChange={handleTextChange}
            value={userData.password}
            errorText="Please enter your password!"
            inValid={userError.password}
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={false}
            returnKeyType='done'
          />
          <View style={styles.buttonWrapper}>
            <Button
              overrideStyle={styles.button}
              label="Login"
              onPress={handleSubmit}
            />
            <Button
              overrideStyle={styles.fgtPswordbutton}
              overrideLabelStyle={styles.fgtPswordbuttonLabel}
              label={lang.forgotPass}
              onPress={() => navigation.navigate('ForgotPassword')}
            />
          </View>
        </>
      </ScrollView>
    </UnAuthWrapper>
  );
};

export default Login;
