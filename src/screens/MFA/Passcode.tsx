import React, {useState} from 'react';
import {View} from 'react-native';
import {setAuthTypeCall, setTransactionPin} from '../../app/actions/auth';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import {Button, Checkbox, CodeFieldComponent} from '../../common';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import {INavigation, IRoute} from '../../types';
import {loadItem, saveItem} from '../../utils/localStorage';
import {validatePin} from '../../validator';
import styles from './mfa.styles';
import {AxiosResponse} from 'axios';
import {useUser} from '../../hooks';

interface Props {
  navigation: INavigation;
  route: IRoute;
}

export const Passcode = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {isAuthenticated} = useUser();
  const {authType, hideDefault, setAsDefault} = route.params;
  const [userData, setData] = useState({
    transactionPin: '',
    pinConfirmation: '',
    setAsDefault: setAsDefault ? 'Yes' : '',
  });

  const [userError, setError] = useState<Record<string, boolean>>({
    transactionPin: false,
    pinConfirmation: false,
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
    userError[label] && handleErrorChange(label, validatePin(value));
  };

  const handleSkip = async () => {
    if (isAuthenticated) {
      navigation.goBack();
      return;
    }
    const user = await loadItem('user');
    user && dispatch(login(JSON.parse(user)));
  };

  const handleSubmit = async () => {
    const {transactionPin, pinConfirmation} = userData;
    const pinError = !validatePin(transactionPin);
    const cPinError = !(pinConfirmation === transactionPin);
    if (pinError || cPinError) {
      setError({
        ...userError,
        transactionPin: pinError,
        pinConfirmation: cPinError,
      });
      return;
    }
    const resp = (await setTransactionPin({
      ...userData,
      // @ts-ignore
      setAsDefault: !!userData.setAsDefault,
    })) as AxiosResponse<any>;
    if (resp?.status === 200) {
      setAuthTypeCall({
        authType,
      });
      saveItem('isMFASet', authType.toString());
      handleSkip();
    }
  };

  return (
    <UnAuthWrapper
      header="Create Pass Code"
      goBack={navigation.goBack}
      description="Add a Passcode to make your account more secure."
      linkText={isAuthenticated ? 'Back' : 'Skip'}
      onLinkPress={() => handleSkip()}>
      <View>
        <CodeFieldComponent
          label="Enter your 6 digit Security Number."
          name="transactionPin"
          hasError={userError.transactionPin}
          errorText="Please enter your 6 digit transaction Pin"
          onChange={handleTextChange}
        />
        <CodeFieldComponent
          label="Confirm Passcode."
          name="pinConfirmation"
          hasError={userError.pinConfirmation}
          errorText="Please enter a matching Pin!"
          onChange={handleTextChange}
        />
        {!hideDefault && (
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

export default Passcode;
