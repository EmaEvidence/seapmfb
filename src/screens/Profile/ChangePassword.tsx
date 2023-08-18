import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Header} from '../../common';
import styles from './Profile.styles';
import InputText, {Checkbox} from '../../common/InputText';
import ResetComponent from './ResetComponent';
import {validateNonEmpty, validatePassword} from '../../validator';
import {
  resetTransactionPassword,
  updateTransactionPassword,
} from '../../app/actions/auth';
import {saveItem} from '../../utils/localStorage';
import toaster from '../../utils/toaster';

export const ChangePassword = ({navigation}: any) => {
  const [isUpdate, setIsUpdate] = useState(true);
  const [userData, setData] = useState<Record<string, string>>({
    secretAnswer: '',
    password: '',
    oldPassword: '',
    confirmPassword: '',
    setAsDefault: '',
  });

  const [userError, setError] = useState<Record<string, boolean>>({
    secretAnswer: false,
    password: false,
    oldPassword: false,
    confirmPassword: false,
  });

  // const handleErrorChange = (label: string, value: boolean) => {
  //   setError(prevState => ({
  //     ...prevState,
  //     [label]: value,
  //   }));
  // };

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleSubmit = async () => {
    const {password, oldPassword, secretAnswer, confirmPassword} = userData;
    const passError = !validatePassword(password);
    const cPassError = !(password === confirmPassword);
    const secretError = !validateNonEmpty(secretAnswer);
    const oldError = !validateNonEmpty(oldPassword);
    if (isUpdate && (passError || cPassError || oldError)) {
      setError({
        ...userError,
        password: passError,
        oldPassword: oldError,
        confirmPassword: cPassError,
      });
      return;
    }
    if (!isUpdate && (passError || cPassError || secretError)) {
      setError({
        ...userError,
        password: passError,
        secretAnswer: secretError,
        confirmPassword: cPassError,
      });
      return;
    }
    if (!isUpdate) {
      const payload = {...userData};
      delete payload.oldPassword;
      const resp = await resetTransactionPassword({
        ...payload,
        // @ts-ignore
        setAsDefault: !!userData.setAsDefault,
      });
      if (resp?.status === 200) {
        toaster(
          'Success',
          'Transaction Password updated Successfully.',
          'custom',
        );
        userData.setAsDefault && saveItem('isMFASet', '5');
      }
    }
    if (isUpdate) {
      const payload = {...userData};
      delete payload.secretAnswer;
      const resp = await updateTransactionPassword({
        ...payload,
        // @ts-ignore
        setAsDefault: !!userData.setAsDefault,
      });
      if (resp?.status === 200) {
        toaster('Success', 'Transaction Password Reset Successful.', 'custom');
        userData.setAsDefault && saveItem('isMFASet', '5');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Security')}
        showBackBtn
        title={`${isUpdate ? 'Change' : 'Reset'} Transaction Password`}
        navigation={navigation}
      />
      <View style={styles.content}>
        <View style={styles.securityFormWrapper}>
          {isUpdate ? (
            <InputText
              name="oldPassword"
              onChange={handleTextChange}
              label="Old Password"
              obsureText={true}
              overrideStyle={styles.textInput}
              value={userData.oldPassword}
              errorText="Please enter your current Password!"
              inValid={userError.oldPassword}
            />
          ) : (
            <View style={styles.secretAnswerInputWrapper}>
              <InputText
                name="secretAnswer"
                onChange={handleTextChange}
                label="Secret Answer"
                overrideStyle={styles.textInput}
                value={userData.secretAnswer}
                errorText="Please enter your Secret Answer!"
                inValid={userError.secretAnswer}
              />
            </View>
          )}

          <InputText
            label="New Password"
            overrideStyle={styles.textInput}
            obsureText={true}
            name="password"
            onChange={handleTextChange}
            value={userData.password}
            errorText="Please enter your password!"
            inValid={userError.password}
          />
          <InputText
            label="Confirm Password"
            overrideStyle={styles.textInput}
            obsureText={true}
            name="confirmPassword"
            onChange={handleTextChange}
            value={userData.confirmPassword}
            errorText="Please enter your password!"
            inValid={userError.confirmPassword}
          />
          <View style={styles.buttonWrapper}>
            <Checkbox
              label="Set as Default"
              name="setAsDefault"
              onChange={handleTextChange}
              value={userData.setAsDefault}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              overrideStyle={styles.button}
              label={'Save'}
              onPress={handleSubmit}
            />
          </View>
        </View>
        <ResetComponent
          question={isUpdate ? "Can't Remember your Password?" : ''}
          answer={isUpdate ? 'Reset Password' : 'Change Password'}
          onPress={() => setIsUpdate(!isUpdate)}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
