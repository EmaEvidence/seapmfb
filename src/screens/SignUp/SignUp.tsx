import React, {useState} from 'react';
import {View} from 'react-native';
import {
  accountVerify,
  requestOTPCallUnAuth,
  confirmEnrollment,
} from '../../app/actions/auth';
import {Button} from '../../common';
import InputText, {Checkbox, GenericDropdown} from '../../common/InputText';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import useDeviceInfo from '../../hooks/useDeviceInfo';
import useLanguage from '../../hooks/useLanguage';
import {secretQuestions} from '../../utils/constants';
import toaster from '../../utils/toaster';
// import {saveItem} from '../../utils/localStorage';
import {validatePassword, validateNonEmpty} from '../../validator';
import styles from './SignUp.styles';
import { INavigation } from '../../types';

interface SignUpProps {
  navigation: INavigation;
}

export const SignUp = ({navigation}: SignUpProps) => {
  const {os, osVersion, deviceId} = useDeviceInfo();
  const {lang} = useLanguage();
  const [step, setStep] = useState(0);
  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleNext2 = () => {
    const {otp, secretAnswer, secretQuestion} = userData;
    const optError = !validateNonEmpty(otp);
    const questionError = !validateNonEmpty(secretQuestion);
    const answerError = !validateNonEmpty(secretAnswer);
    if (optError || questionError || answerError) {
      setError({
        ...userError,
        otp: optError,
        secretAnswer: answerError,
        secretQuestion: questionError,
      });
      return;
    }
    handleNext();
  };

  const [userData, setData] = useState({
    email: '',
    username: '',
    accountNo: '',
    otp: '',
    secretAnswer: '',
    secretQuestion: secretQuestions[0],
    password: '',
    confirmPassword: '',
    isPrimay: '',
  });
  const [userError, setError] = useState({
    email: false,
    username: false,
    accountNo: false,
    otp: false,
    secretAnswer: false,
    secretQuestion: false,
    password: false,
    confirmPassword: false,
    isPrimary: false,
  });

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
    const {password, confirmPassword} = userData;
    const passError = !validatePassword(password);
    const cPassError = !(confirmPassword === password);
    if (passError || cPassError) {
      setError({
        ...userError,
        password: passError,
        confirmPassword: cPassError,
      });
      return;
    }
    const resp = await confirmEnrollment({
      accountNumber: userData.accountNo,
      otp: userData.otp,
      secretQuestion: userData.secretQuestion,
      secretAnswer: userData.secretAnswer,
      password: userData.password,
      confirmPassword: userData.password,
      // @ts-ignore
      isPrimaryDevice: userData.isPrimary === 'yes',
      deviceId,
      deviceName: 'string',
      os,
      osVersion,
    });
    // @ts-ignore
    if (resp?.status === 200) {
      // @ts-ignore
      toaster('Success', resp?.data.message, 'custom');
      navigation.navigate('Login');
    }
  };

  const verifyAcct = async () => {
    if (!userData.accountNo) {
      return handleErrorChange('accountNo', true);
    }
    const resp = await accountVerify(userData.accountNo);
    toaster('Success', resp?.data.message, 'custom');
    setStep(1);
  };

  const resendOTP = async () => {
    if (!userData.accountNo) {
      toaster('Error', 'No account Number found!', 'custom');
      setStep(0);
    }
    const resp = await requestOTPCallUnAuth(userData.accountNo);
    // @ts-ignore
    toaster('Success', resp?.data.message, 'custom');
    setStep(1);
  };
  return (
    <UnAuthWrapper
      goBack={navigation.goBack}
      header={lang.signUp}
      description="Enter your Account Number to create your unique space in our virtual Banking Hall."
      linkText={lang.haveAnAcc}
      onLinkPress={() => navigation.navigate('Login')}
      linkText1={lang.getSeap}
      onLinkPress1={() => navigation.navigate('GetSeapAccount')}>
      <View style={{marginBottom: 20}}>
        {step === 0 && (
          <>
            <InputText
              label={lang.accNum}
              overrideStyle={styles.textInput}
              name="accountNo"
              onChange={handleTextChange}
              value={userData.accountNo}
              errorText="Please enter your Account Number!"
              inValid={userError.accountNo}
              placeholder="e.g 1010101010"
            />
            <View style={styles.buttonWrapper}>
              <Button
                overrideStyle={styles.button}
                label={lang.submit}
                onPress={verifyAcct}
              />
            </View>
          </>
        )}
        {step === 1 && (
          <>
            <InputText
              name="otp"
              onChange={handleTextChange}
              label="Enter OTP"
              overrideStyle={styles.textInput}
              value={userData.otp}
              errorText="Please enter a valid OTP!"
              inValid={userError.otp}
              placeholder="e.g 101010"
            />
            <GenericDropdown
              data={secretQuestions.map(question => ({
                label: question,
                value: question,
              }))}
              onChange={handleTextChange}
              label={'Secret Question.'}
              name={'secretQuestion'}
              value={userData.secretQuestion}
              inValid={userError.secretQuestion}
              error={'Please select a secret question!'}
              listMode="MODAL"
              searchable={true}
              placeholder="Secret Question."
              overrideStyle={{}}
            />
            <InputText
              name="secretAnswer"
              onChange={handleTextChange}
              label="Secret Answer"
              overrideStyle={styles.textInput}
              value={userData.secretAnswer}
              errorText="Please enter a valid answer!"
              inValid={userError.secretAnswer}
            />
            <View style={[styles.buttonWrapper, styles.row]}>
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Resend OTP'}
                onPress={resendOTP}
              />
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Next'}
                onPress={handleNext2}
              />
            </View>
          </>
        )}
        {step === 2 && (
          <>
            <InputText
              obsureText
              name="password"
              onChange={handleTextChange}
              label="Password"
              overrideStyle={styles.textInput}
              value={userData.password}
              errorText="Please enter a valid password with alphanumberic, lowercase, uppercase, special characters!"
              inValid={userError.password}
            />
            <InputText
              obsureText
              name="confirmPassword"
              onChange={handleTextChange}
              label="Confirm Password"
              overrideStyle={styles.textInput}
              value={userData.confirmPassword}
              errorText="Password and Confirm Password do not match"
              inValid={userError.confirmPassword}
            />

            <Checkbox
              name="isPrimary"
              onChange={handleTextChange}
              label="Make Primary Device?"
              overrideStyle={styles.textInput}
              value={userData.isPrimay}
              errorText="Please enter a valid answer!"
              inValid={userError.isPrimary}
            />
            <View style={[styles.buttonWrapper, styles.row]}>
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Prev'}
                onPress={handlePrev}
              />
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Sign Up'}
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </View>
    </UnAuthWrapper>
  );
};

export default SignUp;
