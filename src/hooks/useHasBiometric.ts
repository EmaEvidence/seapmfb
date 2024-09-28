import {useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {updateLoader} from '../app/actions/loader';
const rnBiometrics = new ReactNativeBiometrics();

const useHasBiometric = () => {
  const [hasBiometric, setHasBiometric] = useState(false);
  const checkForBiometric = async () => {
    updateLoader(true);
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (available && (biometryType === BiometryTypes.Biometrics || biometryType === 'FaceID' || biometryType === 'TouchID')) {
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
