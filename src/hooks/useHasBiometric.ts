import {useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {updateLoader} from '../app/actions/loader';
const rnBiometrics = new ReactNativeBiometrics();

const useHasBiometric = () => {
  const [hasBiometric, setHasBiometric] = useState(false);
  const checkForBiometric = async () => {
    updateLoader(true);
    const {biometryType} = await rnBiometrics.isSensorAvailable();
    if (biometryType === BiometryTypes.Biometrics) {
      updateLoader(false);
      setHasBiometric(true);
    } else {
      updateLoader(false);
    }
  };
  useEffect(() => {
    checkForBiometric();
  }, []);
  return {hasBiometric};
};

export default useHasBiometric;
