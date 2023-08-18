/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {Route} from './src/navigations';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import CustomToaster from './src/common/CustomToaster';
import {fontSizes} from './src/utils/theme';
import { View, Text } from 'react-native';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: fontSizes.paragragh1,
        fontWeight: '400',
        borderWidth: 1,
        borderColor: '#000',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: fontSizes.paragragh3,
        borderWidth: 1,
        borderColor: '#000',
      }}
      text2Style={{
        fontSize: fontSizes.paragragh1,
        borderWidth: 1,
        borderColor: '#000',
      }}
    />
  ),
  // @ts-ignore
  custom: ({text1, text2}) => <CustomToaster text1={text1} text2={text2} />,
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Route />
        <Toast
          // @ts-ignore
          // ref={ref => Toast.setRef(ref)}
          visibilityTime={10000}
          autoHide={false}
          onPress={() => Toast.hide()}
          // @ts-ignore
          config={toastConfig}
        />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
