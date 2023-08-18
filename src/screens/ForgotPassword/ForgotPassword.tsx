import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from '../../common';
import InputText from '../../common/InputText';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import styles from './ForgotPassword.styles';
import {requestOTPCallUnAuth, resetPassword} from '../../app/actions/auth';
import toaster from '../../utils/toaster';
import {validateNonEmpty, validatePassword} from '../../validator';
import useLanguage from '../../hooks/useLanguage';

interface ForgotPasswordProps {
  navigation: {
    navigate: (route: string, ...arg: any) => void;
  };
}

export const ForgotPassword = ({navigation}: ForgotPasswordProps) => {
  const {lang} = useLanguage();
  const [step, setStep] = useState(0);
  const [descrip, setDescrip] = useState(
    'Enter Account Number to begin account recovery process.',
  );
  const [userData, setData] = useState({
    accountNumber: '',
    otp: '',
    secretAnswer: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userError, setError] = useState({
    accountNumber: false,
    otp: false,
    secretAnswer: false,
    newPassword: false,
    confirmPassword: false,
  });
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    handleErrorChange(label, !value);
  };

  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleSubmit = async () => {
    const {otp, secretAnswer, newPassword, confirmPassword} = userData;
    const otpError = !validateNonEmpty(otp);
    const secretError = !validateNonEmpty(secretAnswer);
    const passError = !validatePassword(newPassword);
    const cPassError = !(newPassword === confirmPassword);
    if (otpError || secretError || passError || cPassError) {
      setError({
        ...userError,
        otp: otpError,
        secretAnswer: secretError,
        newPassword: passError,
        confirmPassword: cPassError,
      });
      return;
    }
    const resp = await resetPassword(userData);
    if (resp?.status === 200) {
      toaster('Success', resp.data.message, 'custom');
      navigation.navigate('Login');
    }
  };

  const requestOTP = async () => {
    if (!userData.accountNumber) {
      toaster('Error', 'Enter account Number', 'custom');
      handleErrorChange('accountNumber', true);
      return;
    }
    const resp = await requestOTPCallUnAuth(userData.accountNumber);
    if (resp?.status === 200) {
      toaster('Success', resp.data.message, 'custom');
      setDescrip('Enter your new details.');
      handleNext();
    }
  };

  return (
    <UnAuthWrapper
      header={lang.forgotPass}
      description={descrip}
      linkText={lang.haveAnAcc}
      onLinkPress={() => navigation.navigate('Login')}>
      <View>
        {step === 0 ? (
          <>
            <InputText
              name="accountNumber"
              onChange={handleTextChange}
              label={lang.accNum}
              overrideStyle={styles.textInput}
              value={userData.accountNumber}
              errorText="Please enter a valid Account Number!"
              inValid={userError.accountNumber}
              placeholder="e.g 1010101010"
            />
            <View style={styles.buttonWrapper}>
              <Button
                overrideStyle={styles.button}
                label={lang.submit}
                onPress={requestOTP}
              />
            </View>
          </>
        ) : (
          <>
            <InputText
              name="otp"
              onChange={handleTextChange}
              label="Enter OTP"
              overrideStyle={styles.textInput}
              value={userData.otp}
              errorText="Please enter a OTP sent to you!"
              inValid={userError.otp}
              placeholder="e.g 101010"
            />
            <InputText
              obsureText
              name="secretAnswer"
              onChange={handleTextChange}
              label="Secret Answer"
              overrideStyle={styles.textInput}
              value={userData.secretAnswer}
              errorText="Please enter your secret answer!"
              inValid={userError.secretAnswer}
            />
            <InputText
              obsureText
              name="newPassword"
              onChange={handleTextChange}
              label="New Password"
              overrideStyle={styles.textInput}
              value={userData.newPassword}
              errorText="Please enter a valid password with alphanumberic, lowercase, uppercase, special characters!"
              inValid={userError.newPassword}
            />
            <InputText
              obsureText
              name="confirmPassword"
              onChange={handleTextChange}
              label="confirmPassword"
              overrideStyle={styles.textInput}
              value={userData.confirmPassword}
              errorText="Password does not match!"
              inValid={userError.confirmPassword}
            />
            <View style={[styles.buttonWrapper, styles.row]}>
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Resend OTP'}
                onPress={requestOTP}
              />
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Next'}
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </View>
    </UnAuthWrapper>
  );
};

export default ForgotPassword;
