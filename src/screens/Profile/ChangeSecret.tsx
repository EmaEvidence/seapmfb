import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Header} from '../../common';
import styles from './Profile.styles';
import InputText, {CustomPicker} from '../../common/InputText';
import ResetComponent from './ResetComponent';
import {secretQuestions} from '../../utils/constants';
import {validateNonEmpty, validatePin} from '../../validator';
import {requestOTPCallAuth, resetSecret} from '../../app/actions/auth';
import toaster from '../../utils/toaster';

export const ChangeSecret = ({navigation}: any) => {
  const [userData, setData] = useState({
    otp: '',
    newAnswer: '',
    secretQuestion: secretQuestions[0],
    confirmationAnswer: '',
  });

  const [userError, setError] = useState({
    otp: false,
    newAnswer: false,
    confirmationAnswer: false,
    secretQuestion: false,
  });

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleResendOTP = async () => {
    const resp = await requestOTPCallAuth();
    if (resp?.status === 200) {
      toaster('Success', 'An OTP has being sent to You!', 'custom');
    }
  };

  const handleSubmit = async () => {
    const {otp, newAnswer, confirmationAnswer, secretQuestion} = userData;
    const otpError = !validatePin(otp);
    const answerError = !validateNonEmpty(newAnswer);
    const confirmError = newAnswer !== confirmationAnswer;
    const queError = !validateNonEmpty(secretQuestion);
    if (otpError || answerError || confirmError || queError) {
      setError({
        otp: otpError,
        newAnswer: answerError,
        confirmationAnswer: confirmError,
        secretQuestion: queError,
      });
      return;
    }
    const resp = await resetSecret(userData);
    // @ts-ignore
    if (resp?.status === 200) {
      toaster('Success', 'Secret answer changed successfully', 'custom');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Security')}
        showBackBtn
        title={'Reset Secret Question'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.securityFormWrapper}>
          <InputText
            name="otp"
            onChange={handleTextChange}
            label="Enter OTP"
            obsureText={true}
            overrideStyle={styles.textInput}
            value={userData.otp}
            errorText="Please enter OTP sent to you!"
            inValid={userError.otp}
          />
          <CustomPicker
            mode="dialog"
            data={secretQuestions}
            name="secretQuestion"
            onChange={handleTextChange}
            label="Secret Question"
            overrideStyle={styles.textInput}
            value={userData.secretQuestion}
            error="Please select a secret question!"
            inValid={userError.secretQuestion}
          />
          <InputText
            label="New Secret Answer"
            overrideStyle={styles.textInput}
            obsureText={true}
            name="newAnswer"
            onChange={handleTextChange}
            value={userData.newAnswer}
            errorText="Please enter your new Answer!"
            inValid={userError.newAnswer}
          />
          <InputText
            label="Confirm Secret Answer"
            overrideStyle={styles.textInput}
            obsureText={true}
            name="confirmationAnswer"
            onChange={handleTextChange}
            value={userData.confirmationAnswer}
            errorText="Please enter matching answer!"
            inValid={userError.confirmationAnswer}
          />
          <View style={styles.buttonWrapper}>
            <Button
              overrideStyle={styles.button}
              label={'Save'}
              onPress={handleSubmit}
            />
          </View>
        </View>
        <ResetComponent
          question="Didn't get an OTP?"
          answer="Resend OTP"
          onPress={handleResendOTP}
        />
      </View>
    </View>
  );
};

export default ChangeSecret;
