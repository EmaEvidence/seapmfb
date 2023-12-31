import React, {useState} from 'react';
import {View} from 'react-native';
import axios from 'axios';
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

interface LoginProps {
  navigation: INavigation;
}

const reenrollError =
  'This device is not authorized to access your account. Please use the device enrollment feature to register this device for access on your account';

export const Login = ({navigation}: LoginProps) => {
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
      const resp = await loginCall({
        ...userData,
        deviceId,
        sessionId: '090qwqere',
      });
      // @ts-ignore
      if (resp?.status === 200) {
        // @ts-ignore
        saveItem('authToken', resp.data.authenticationToken);
        saveItem('acctNo', userId);
        toaster('Success', 'Login Successful', 'custom');
        const decoded: Record<string, string> = jwt_decode(
          // @ts-ignore
          resp.data.authenticationToken,
        );
        // @ts-ignore
        axios.defaults.headers.common.Authorization = `Bearer ${resp.data.authenticationToken}`;
        // @ts-ignore
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
      description={lang.signInText}
      linkText={lang.signUp}
      onLinkPress={() => navigation.navigate('SignUp')}
      linkText1={lang.getSeap}
      onLinkPress1={() => navigation.navigate('GetSeapAccount')}>
      <View>
        <InputText
          name="userId"
          onChange={handleTextChange}
          label={lang.accNum}
          overrideStyle={styles.textInput}
          value={userData.userId}
          errorText="Please enter your Account Number!"
          inValid={userError.userId}
          placeholder="e.g 1010101010"
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
        />
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={lang.signIn}
            onPress={handleSubmit}
          />
          <Button
            overrideStyle={styles.fgtPswordbutton}
            overrideLabelStyle={styles.fgtPswordbuttonLabel}
            label={lang.forgotPass}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>
    </UnAuthWrapper>
  );
};

export default Login;
