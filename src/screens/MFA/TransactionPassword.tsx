import React, {useState} from 'react';
import {View} from 'react-native';
import {setAuthTypeCall, setTransactionPassword} from '../../app/actions/auth';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import {Button} from '../../common';
import InputText, {Checkbox} from '../../common/InputText';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import {INavigation, IRoute} from '../../types';
import {loadItem} from '../../utils/localStorage';
import {validatePassword} from '../../validator';
import styles from './mfa.styles';
import {useUser} from '../../hooks';
import {AxiosResponse} from 'axios';

interface Props {
  navigation: INavigation;
  route: IRoute;
}

export const TransactionPassword = ({route, navigation}: Props) => {
  const {isAuthenticated} = useUser();
  const dispatch = useAppDispatch();
  const {authType, hideDefault, setAsDefault} = route.params;
  const [userData, setData] = useState({
    confirmPassword: '',
    password: '',
    setAsDefault: setAsDefault ? 'Yes' : '',
  });

  const [userError, setError] = useState<Record<string, boolean>>({
    confirmPassword: false,
    password: false,
  });

  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    userError[label] && handleErrorChange(label, validatePassword(value));
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
    const resp = (await setTransactionPassword({
      ...userData,
      // @ts-ignore
      setAsDefault: !!userData.setAsDefault,
    })) as AxiosResponse<any>;
    if (resp?.status === 200) {
      setAuthTypeCall({
        authType,
      });
      const user = await loadItem('user');
      user && dispatch(login(JSON.parse(user)));
    }
  };

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
      goBack={navigation.goBack}
      header="Create Transaction Password"
      description="Add a Transaction Password to make your account more secure."
      linkText={isAuthenticated ? 'Back' : 'Skip'}
      onLinkPress={() => handleSkip()}>
      <View>
        <InputText
          label="Password"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="password"
          onChange={handleTextChange}
          value={userData.password}
          errorText="Please enter a valid password with alphanumberic, lowercase, uppercase, special characters!"
          inValid={userError.password}
        />
        <InputText
          label="Confirm Password"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="confirmPassword"
          onChange={handleTextChange}
          value={userData.confirmPassword}
          errorText="Passwords do not match!"
          inValid={userError.confirmPassword}
        />
        {hideDefault && (
          <Checkbox
            label="Set as Default"
            name="setAsDefault"
            onChange={handleTextChange}
            value={userData.setAsDefault}
          />
        )}
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Save'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </UnAuthWrapper>
  );
};

export default TransactionPassword;
