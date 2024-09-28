import React, {useState} from 'react';
import {ScrollView, Image, Platform} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import MenuIcon from '../../assets/images/accountIcon.png';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import styles from './Login.styles';
import {INavigation} from '../../types';
import {loginWithrefreshToken} from '../../app/actions/auth';
import {loadItem, saveItem} from '../../utils/localStorage';
import toaster from '../../utils/toaster';
import useDeviceInfo from '../../hooks/useDeviceInfo';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import useLanguage from '../../hooks/useLanguage';
import { FingerPrintComponent } from '../MFA';
import useRefreshToken from '../../hooks/useRefreshToken';
import { Header1, Header2 } from '../../common/Text';

interface LoginProps {
  navigation: INavigation;
}

export const LoginWithBio = ({navigation}: LoginProps) => {
  const {name} = useRefreshToken();
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

  const handleLoginWithRefreshToken = async () => {
    const token = await loadItem('refreshToken');
    axios.defaults.headers.common.Authorization = token;
    const resp = await loginWithrefreshToken() as AxiosResponse;
    if (resp?.status === 200) {
      saveItem('authToken', resp.data.authenticationToken);
      saveItem('refreshToken', resp.data.refreshToken);
      toaster('Success', 'Login Successful', 'custom');
      const decoded: Record<string, string> = jwt_decode(
        resp.data.authenticationToken,
      );
      axios.defaults.headers.common.Authorization = `Bearer ${resp.data.authenticationToken}`;
      handleMFA(resp.data.authType, decoded);
    } else {
      navigation.navigate('Login')
    }
  };

  return (
    <UnAuthWrapper
      header={''}
      goBack={navigation.goBack}
      description=''
      linkText={'Continue with Email'}
      onLinkPress={() => navigation.navigate('Login')}
      linkText1={lang.getSeap}
      onLinkPress1={() => navigation.navigate('GetSeapAccount')}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Image source={MenuIcon} style={styles.img} />
        <Header2 text='Welcome back' overrideStyle={styles.text} />
        <Header1 text={name} overrideStyle={styles.name} />
        <FingerPrintComponent
          handleSuccess={handleLoginWithRefreshToken}
          handleError={() => navigation.navigate('Login')}
          label="Press the finger print to continue with Biometric"
        />
      </ScrollView>
    </UnAuthWrapper>
  )
};

export default LoginWithBio;
