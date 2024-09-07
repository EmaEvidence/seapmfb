import React, {useState, useEffect, useCallback} from 'react';
import RNRestart from 'react-native-restart';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppState, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Onboarding,
  SplashScreen,
  Login,
  SignUp,
  ForgotPassword,
  SetPassword,
  VerifyEmail,
  Home,
  Payments,
  Notification,
  Profile,
  Passcode,
  MFAChoice,
  FingerPrint,
  NQR,
  Transactions,
  Transaction,
  Transfer,
  Security,
  Privacy,
  NotificationManagement,
  EditProfile,
  ContactUs,
  ChangePin,
  ChangePassword,
  SetupBiometric,
  AccountOthers,
  AccountRequests,
  // Personalize,
  Statement,
  TransactionPassword,
  ChangeSecret,
  Beneficiaries,
  Feedback,
  Debits,
  Welcome,
  LoginWithBio,
} from '../screens';
// import {Loader} from '../common';
import {colors, fontSizes} from '../utils/theme';
import HomeIcon from '../assets/images/home.png';
import HomeBlur from '../assets/images/homeBlur.png';
import LogoImage from '../assets/images/logo.png';
import Payment from '../assets/images/payment.png';
import TransferIcon from '../assets/images/transfer.png';
import TransferBlurIcon from '../assets/images/TransferBlur.png';
import PaymentBlur from '../assets/images/paymentBlur.png';
import Chat from '../assets/images/chat.png';
import ChatBlur from '../assets/images/chatBlur.png';
import Settings from '../assets/images/settings.png';
import {DrawerContent, Loader} from '../common';
import {GetSeapAccount} from '../screens/GetSeapAccount';
import {loadItem, removeItem, saveItem} from '../utils/localStorage';
import {updateLanguage} from '../app/actions/language';
import {useAppDispatch} from '../app/hooks';
import {langType} from '../app/slices/language';
import {useUser} from '../hooks';
import {login, setAuthType, logout} from '../app/slices/auth';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {appDispatch} from '../app/store';
import {EnrollDevice} from '../screens/EnrollDevice';
import toaster from '../utils/toaster';
import useDeviceInfo from '../hooks/useDeviceInfo';
import { loginWithrefreshToken } from '../app/actions/auth';


const {Navigator, Screen} = createBottomTabNavigator();

const MainStack = createNativeStackNavigator();

const routes = ['Home', 'Transfer', 'Payments', 'Help', 'Settings'];

axios.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401 || error.request?.status === 401) {
      const refreshToken = await loadItem('refreshToken');
      const originalRequest = error.config;
      if (refreshToken && originalRequest) {
          const token = await loadItem('refreshToken');
          axios.defaults.headers.common.Authorization = token;
          const resp = await loginWithrefreshToken() as AxiosResponse;
          if (resp?.status === 200) {
            saveItem('authToken', resp.data.authenticationToken);
            saveItem('refreshToken', resp.data.refreshToken);
            // toaster('Success', 'Login Successful', 'custom');
            axios.defaults.headers.common.Authorization = `Bearer ${resp.data.authenticationToken}`;
            originalRequest.headers.Authorization = `Bearer ${resp.data.authenticationToken}`;
            return axios(originalRequest);
          } else {
            delete axios.defaults.headers.common.Authorization;
            appDispatch(logout());
            removeItem('authToken');
            removeItem('refreshToken');
            toaster('Error', 'Your session has expired! re-token else', 'custom');
          }
      } else {
        delete axios.defaults.headers.common.Authorization;
        appDispatch(logout());
        removeItem('authToken');
        removeItem('refreshToken');
        toaster('Error', 'Your session has expired! else', 'custom');
      }
    }
    return Promise.reject(error);
  },
);

const MainAuthPage = () => {
  return (
    <Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tblack,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === routes[0]) {
            iconName = HomeIcon;
          } else if (route.name === routes[1]) {
            iconName = TransferIcon;
          } else if (route.name === routes[2]) {
            iconName = Payment;
          } else if (route.name === routes[3]) {
            iconName = Chat;
          } else if (route.name === routes[4]) {
            iconName = Settings;
          }
          return <Image source={iconName} style={{
            width: 15,
            height: 15,
            opacity: focused ? 1 : 0.5
          }} />;
        },
        tabBarLabelStyle: {
          fontSize: fontSizes.bodyText,
          fontWeight: '500',
          color: colors.sMainBlue,
          fontFamily: 'Trebuchet MS',
          marginTop: -5,
          paddingBottom: 10,
          lineHeight: fontSizes.bodyText,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        }
      })}>
      <Screen component={Home} name={routes[0]} />
      <Screen component={Transfer} name={routes[1]} />
      <Screen component={Payments} name={routes[2]} />
      <Screen component={Profile} name={routes[4]} />
    </Navigator>
  );
};

export function Route() {
  const {deviceId} = useDeviceInfo();
  const dispatch = useAppDispatch();
  const {isAuthenticated, userLoading} = useUser();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const isLoggedIn = isAuthenticated;
  const userRole = 'admin';
  const [autoLogOut, setAutoLogOut] = useState<null | number>();
  const [onboardingIsDone, setOnboardingIsDone] = useState<string | null>(null);
  const {isSignedIn} = {isSignedIn: false};

  const removeAuth = () => {
    autoLogOut && clearTimeout(autoLogOut);
    setAutoLogOut(null);
    removeItem('authToken');
    RNRestart.restart();
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && autoLogOut) {
        autoLogOut && clearTimeout(autoLogOut);
        setAutoLogOut(null);
      } else if (
        (nextAppState === 'background' || nextAppState === 'inactive') &&
        isAuthenticated
      ) {
        const timerr = setTimeout(removeAuth, 180000);
        setAutoLogOut(timerr);
      }
    });

    return () => {
      subscription.remove();
      // isAuthenticated && removeAuth();
    };
  }, [isAuthenticated]);

  const loadLang = async () => {
    const lang = await loadItem('lang');
    if (lang) {
      updateLanguage(lang as unknown as langType, dispatch);
    }
  };

  useEffect(() => {
    loadLang();
    axios.defaults.headers.common.DeviceId = deviceId;
    axios.defaults.headers.DeviceId = deviceId;
  }, [deviceId]);

  useEffect(() => {
    loginState();
  }, [isSignedIn]);

  const isOnboardingDone = async () => {
    setIsAppLoading(true);
    const resp = await AsyncStorage.getItem('onboardingDone');
    if (resp) {
      setOnboardingIsDone(resp);
      setIsAppLoading(false);
    } else {
      setIsAppLoading(false);
    }
  };

  useEffect(() => {
    isOnboardingDone();
  }, []);

  const getAuthType = useCallback(async () => {
    const resp = await AsyncStorage.getItem('authType');
    if (resp) {
      dispatch(setAuthType(resp as unknown as number));
    }
  }, []);

  useEffect(() => {
    getAuthType();
  }, [getAuthType]);

  const loginState = async () => {
    setIsAppLoading(true);
    const value = await AsyncStorage.getItem('authToken');
    const user = await loadItem('user');
    if (value) {
      axios.defaults.headers.common.Authorization = `Bearer ${value}`;
      user && dispatch(login(JSON.parse(user)));
      setIsAppLoading(false);
    } else {
      setIsAppLoading(false);
    }
  };

  if (isAppLoading || userLoading) {
    return <SplashScreen />;
  }

  const AuthComponent = () => (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen component={MainAuthPage} name="HomeScreen" />
      <MainStack.Screen component={Notification} name="Notification" />
      <MainStack.Screen component={Transactions} name="Transactions" />
      <MainStack.Screen component={Debits} name="Debits" />
      <MainStack.Screen component={Transaction} name="Transaction" />
      <MainStack.Screen component={Transfer} name="Transfer" />
      <MainStack.Screen component={NQR} name="NQR" />
      <MainStack.Screen component={EditProfile} name="EditProfile" />
      <MainStack.Screen component={Security} name="Security" />
      <MainStack.Screen component={Privacy} name="Privacy" />
      <MainStack.Screen component={ContactUs} name="ContactUs" />
      <MainStack.Screen component={ChangePin} name="ChangePin" />
      <MainStack.Screen component={ChangePassword} name="ChangePassword" />
      <MainStack.Screen component={ChangeSecret} name="ChangeSecret" />
      <MainStack.Screen component={SetupBiometric} name="SetupBiometric" />
      <MainStack.Screen component={AccountOthers} name="AccountOthers" />
      <MainStack.Screen component={AccountRequests} name="AccountRequests" />
      {/* <MainStack.Screen component={Personalize} name="Personalise" /> */}
      <MainStack.Screen component={Statement} name="Statement" />
      <MainStack.Screen component={Passcode} name="Passcode" />
      <MainStack.Screen component={FingerPrint} name="FingerPrint" />
      <MainStack.Screen
        component={TransactionPassword}
        name="TransactionPassword"
      />
      <MainStack.Screen
        component={NotificationManagement}
        name="NotifcationManagement"
      />
    </MainStack.Navigator>
  );

  const UnauthComponent = () => {
    // const initialRouteName = onboardingIsDone ? 'Welcome' : 'Onboarding';
    const initialRouteName = 'Onboarding';
    return (
      <>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={initialRouteName}
        >
          <MainStack.Screen component={Onboarding} name="Onboarding" />
          <MainStack.Screen component={Welcome} name="Welcome" />
          <MainStack.Screen component={Login} name="Login" />
          <MainStack.Screen component={LoginWithBio} name="LoginWithBio" />
          <MainStack.Screen component={SignUp} name="SignUp" />
          <MainStack.Screen component={GetSeapAccount} name="GetSeapAccount" />
          <MainStack.Screen component={ForgotPassword} name="ForgotPassword" />
          <MainStack.Screen component={SetPassword} name="SetPassword" />
          <MainStack.Screen component={VerifyEmail} name="VerifyEmail" />
          <MainStack.Screen component={Passcode} name="Passcode" />
          <MainStack.Screen component={MFAChoice} name="MFAChoice" />
          <MainStack.Screen component={FingerPrint} name="FingerPrint" />
          <MainStack.Screen
            component={TransactionPassword}
            name="TransactionPassword"
          />
          <MainStack.Screen component={EnrollDevice} name="EnrollDevice" />
        </MainStack.Navigator>
      </>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      {isLoggedIn ? (
        <>
          <SafeAreaView />
          <AuthComponent />
        </>
      ) : (
        UnauthComponent()
      )}
      <Loader showLoader={isAppLoading} />
    </>
  );
}

export default Route;

const styles = StyleSheet.create({
  bgImgImg: {
    opacity: 0.04
  },
  bgImg: {
    backgroundColor: colors.sLightBlue,
  },
})
