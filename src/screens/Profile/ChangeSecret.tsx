import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Header, RowView} from '../../common';
import styles from './Profile.styles';
import InputText, {ç, GenericDropdown} from '../../common/InputText';
import ResetComponent from './ResetComponent';
import {secretQuestions} from '../../utils/constants';
import {validateNonEmpty, validatePin} from '../../validator';
import {requestOTPCallAuth, resetSecret} from '../../app/actions/auth';
import toaster from '../../utils/toaster';
import { Header3 } from '../../common/Text';
import { fontSizes } from '../../utils/theme';
import generalStyles from '../../index.styles';

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
    setError((prevState) => ({
      ...prevState,
      [label]: !value,
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
        title={'Reset secret question'}
        navigation={navigation}
      />
      <View style={styles.securityFormWrapper}>
          <GenericDropdown
            data={secretQuestions.map(que => ({
              label: que,
              value: que,
            }))}
            onChange={(name, val) => {
              handleTextChange(name, val);
              if (val) {
                handleTextChange('secretQuestion', val);
              }
            }}
            label={''}
            name={'secretQuestion'}
            value={userData.secretQuestion}
            inValid={userError.secretQuestion}
            error={'Please select a secret question!'}
            listMode="MODAL"
            searchable={true}
            placeholder="Secret question"
            overrideStyle={{}}
          />
          <RowView justify='isBtw'>
            <InputText
              label="Secret answer"
              overrideNPInputWrapper={styles.halfBtn}
              overrideStyle={styles.textInput}
              obsureText={true}
              name="newAnswer"
              onChange={handleTextChange}
              value={userData.newAnswer}
              errorText="Please enter your new Answer!"
              inValid={userError.newAnswer}
              autoFocus
              returnKeyType="next"
            />
            <InputText
              overrideNPInputWrapper={styles.halfBtn}
              label="Confirm answer"
              overrideStyle={styles.textInput}
              obsureText={true}
              name="confirmationAnswer"
              onChange={handleTextChange}
              value={userData.confirmationAnswer}
              errorText="Please enter matching answer!"
              inValid={userError.confirmationAnswer}
              returnKeyType="next"
            />
          </RowView>
          <InputText
            name="otp"
            onChange={handleTextChange}
            label="Enter OTP"
            obsureText={true}
            overrideStyle={styles.textInput}
            value={userData.otp}
            errorText="Please enter OTP sent to you!"
            inValid={userError.otp}
            keyboardType='numeric'
            returnKeyType="done"
          />
          <RowView justify='isBtw' overrideStyle={{
            marginTop: 20,
          }}>
            <Button
              overrideStyle={[styles.button, styles.halfBtn, generalStyles.transparentBtn]}
              label={'Get OTP'}
              overrideLabelStyle={[{
                fontSize: fontSizes.paragragh
              }, generalStyles.transparentBtnLabel]}
              onPress={handleResendOTP}
            />
            <Button
              overrideStyle={[styles.button, styles.halfBtn]}
              label={'Save'}
              overrideLabelStyle={{
                fontSize: fontSizes.paragragh
              }}
              onPress={handleSubmit}
            />
          </RowView>
        </View>
    </View>
  );
};

export default ChangeSecret;
