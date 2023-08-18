import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
const rnBiometrics = new ReactNativeBiometrics();

export const handleBiometric = async () => {
  const {biometryType} = await rnBiometrics.isSensorAvailable();
  if (biometryType === BiometryTypes.Biometrics) {
    //do something face id specific
  }
};
