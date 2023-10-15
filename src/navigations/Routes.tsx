import React, {useState, useEffect, useCallback} from 'react';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppState, Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
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
  Personalize,
  Statement,
  TransactionPassword,
  ChangeSecret,
  Beneficiaries,
  Feedback,
  Debits,
  Welcome,
} from '../screens';
// import {Loader} from '../common';
import {colors, fontSizes} from '../utils/theme';
import HomeIcon from '../assets/images/home.png';
import HomeBlur from '../assets/images/homeBlur.png';
import Payment from '../assets/images/payment.png';
import PaymentBlur from '../assets/images/paymentBlur.png';
import Chat from '../assets/images/chat.png';
import ChatBlur from '../assets/images/chatBlur.png';
import {DrawerContent, Loader} from '../common';
import {GetSeapAccount} from '../screens/GetSeapAccount';
import {loadItem, removeItem} from '../utils/localStorage';
import {updateLanguage} from '../app/actions/language';
import {useAppDispatch} from '../app/hooks';
import {langType} from '../app/slices/language';
import {useUser} from '../hooks';
import {login, setAuthType, logout} from '../app/slices/auth';
import axios, {AxiosError} from 'axios';
import {appDispatch} from '../app/store';
import {EnrollDevice} from '../screens/EnrollDevice';
import toaster from '../utils/toaster';
import useDeviceInfo from '../hooks/useDeviceInfo';


const {Navigator, Screen} = createBottomTabNavigator();

const MainStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const routes = ['Home', 'Payments', 'Help'];

axios.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401 || error.request.status === 401) {
      delete axios.defaults.headers.common.Authorization;
      appDispatch(logout());
      removeItem('authToken');
      toaster('Error', 'Your session has expired!', 'custom');
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
            iconName = focused ? HomeIcon : HomeBlur;
          } else if (route.name === routes[1]) {
            iconName = focused ? Payment : PaymentBlur;
          } else if (route.name === routes[3]) {
            iconName = focused ? Chat : ChatBlur;
          }
          return <Image source={iconName} />;
        },
        tabBarLabelStyle: {
          fontSize: fontSizes.paragragh,
          fontWeight: '700',
          color: colors.sMainBlue,
          fontFamily: 'Trebuchet MS',
        },
      })}>
      <Screen component={Home} name={routes[0]} />
      <Screen component={Payments} name={routes[1]} />
      {/* <Screen component={Analytics} name={routes[3]} /> */}
    </Navigator>
  );
};

export function Route() {
  const {deviceId} = useDeviceInfo();
  const dispatch = useAppDispatch();
  const {isAuthenticated} = useUser();
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
      isAuthenticated && removeAuth();
    };
  }, [isAuthenticated]);

  const loadLang = async () => {
    const lang = await loadItem('lang');
    if (lang) {
      updateLanguage(lang as unknown as langType, dispatch);
    }
  };

  useEffect(() => {
    // removeItem('user');
    loadLang();
    axios.defaults.headers.common.DeviceId = deviceId;
    axios.defaults.headers.DeviceId = deviceId;
  }, []);

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

  if (isAppLoading) {
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
      <MainStack.Screen component={Personalize} name="Personalise" />
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
          <Drawer.Navigator
            drawerContent={props => (
              <DrawerContent {...props} userRole={userRole} />
            )}
            screenOptions={{
              headerShown: false,
            }}>
            <Drawer.Screen name="Home" component={AuthComponent} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Beneficiaries" component={Beneficiaries} />
            <Drawer.Screen name="Feedback" component={Feedback} />
          </Drawer.Navigator>
        </>
      ) : (
        UnauthComponent()
      )}
      <Loader showLoader={isAppLoading} />
    </>
  );
}

// export const Route = () => {
//   return (
//     <View style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
//       <Welcome navigation={{navigate: (itm) => {}}} />
//     </View>
//   )
// }

export default Route;
