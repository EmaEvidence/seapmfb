import React from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Image, TouchableOpacity, View} from 'react-native';
import FingerPrintImg from '../../assets/images/fingerprint.png';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import {INavigation} from '../../types';
import styles from './mfa.styles';
import {Paragraph} from '../../common/Text';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import {loadItem} from '../../utils/localStorage';
import {useUser} from '../../hooks';
import {setTransactionBiometric} from '../../app/actions/auth';
import toaster from '../../utils/toaster';
import {appDispatch} from '../../app/store';
import {setAuthType} from '../../app/slices/auth';
// https://www.npmjs.com/package/react-native-biometrics

interface Props {
  navigation: INavigation;
}

export const FingerPrint = ({navigation}: Props) => {
  const {isAuthenticated} = useUser();
  const dispatch = useAppDispatch();

  const handleSkip = async () => {
    if (isAuthenticated) {
      navigation.goBack();
      return;
    }
    const user = await loadItem('user');
    user && dispatch(login(JSON.parse(user)));
  };

  return (
    <UnAuthWrapper
      header="Set Your Fingerprint"
      description="Add a fingerprint to make your account more secure."
      linkText={isAuthenticated ? 'Back' : 'Skip'}
      onLinkPress={() => handleSkip()}>
      <FingerPrintComponent navigation={navigation} />
    </UnAuthWrapper>
  );
};

export default FingerPrint;

let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
let payload = epochTimeSeconds + 'mfbseapmfb';

export const FingerPrintComponent = ({navigation}: any) => {
  const [pKey, setPublicKey] = useState('');
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const handleBiometric = async () => {
    rnBiometrics.biometricKeysExist().then(async resultObject => {
      const result = resultObject;

      if (result.keysExist) {
        handleGenerateSignature();
      } else {
        const resp = await handleCreateKeys();
        if (resp) {
          handleGenerateSignature();
        }
      }
    });
  };

  const handleCreateKeys = () => {
    return rnBiometrics.createKeys().then(resultObject => {
      const {publicKey} = resultObject;
      console.log(publicKey, '=-=-=-=-public key');
      setPublicKey(publicKey);
      return publicKey;
    });
  };

  const handleGenerateSignature = () => {
    rnBiometrics
      .createSignature({
        promptMessage: 'Set Biometric Authentication',
        payload,
      })
      .then(async resultObject => {
        const {success, signature} = resultObject;
        if (success && signature) {
          const resp = await setTransactionBiometric({
            biometricData: signature,
            pkFile: pKey,
            setAsDefault: true,
          });
          if (resp.status === 200) {
            appDispatch(setAuthType(data.authType as unknown as number));
            toaster(
              'Success',
              'Biometric Authentication set successfully.',
              'custom',
            );
            navigation.goBack();
          }
        } else {
          toaster(
            'Error',
            'Error Setting up Biometric Authentication',
            'custom',
          );
        }
      })
      .catch(error => {
        toaster('Error', 'Error Setting up Biometric Authentication', 'custom');
      });
  };

  return (
    <View style={styles.fingerPrintWrapper}>
      <TouchableOpacity style={styles.fingerWrapper} onPress={handleBiometric}>
        <Image source={FingerPrintImg} style={styles.fingerImg} />
      </TouchableOpacity>
      <Paragraph
        overrideStyle={styles.fingerMessage}
        text="Please put your finger on the fingerprint icon to get started."
      />
    </View>
  );
};
