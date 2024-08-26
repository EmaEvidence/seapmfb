import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Button} from '../../common';
import InputText from '../../common/InputText';
import {Paragraph} from '../../common/Text';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import {loadItem} from '../../utils/localStorage';
import toaster from '../../utils/toaster';
import {validatePassword} from '../../validator';
import styles from './SetPassword.styles';
import { INavigation } from '../../types';

interface SetPasswordProps {
  navigation: INavigation;
  route: {
    params: Record<string, string>;
  };
}

export const SetPassword = ({navigation, route}: SetPasswordProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const isFrom = route?.params?.isFrom;
  const [data, setData] = useState({
    cpassword: '',
    password: '',
  });
  const [passError, setPassError] = useState<Record<string, boolean>>({
    cpassword: false,
    password: false,
    code: false,
  });

  const handleTextChange = (label: string, val: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: val,
    }));
    if (passError[label]) {
      const resp =
        label === 'password' ? validatePassword(val) : val === data.password;
      setPassError(prevState => ({
        ...prevState,
        [label]: !resp,
      }));
    }
  };

  const handlePasswordReset = async () => {
    const user = await loadItem('user');
    if (!user) {
      toaster('Password reset Failed!', 'User not found!', 'custom');
      return;
    }
    const passValid = validatePassword(data.password);
    const cpassValid = data.password === data.cpassword;
    if (!passValid || !cpassValid) {
      setPassError(prevState => ({
        ...prevState,
        password: !passValid,
        cpassword: !cpassValid,
      }));
      return;
    }
    if (value && value.length === 6) {
    }
    setPassError(prevState => ({
      ...prevState,
      code: true,
    }));
  };

  const handleSubmit = async () => {
    const passValid = validatePassword(data.password);
    const cpassValid = data.password === data.cpassword;
    if (!passValid || !cpassValid) {
      setPassError(prevState => ({
        ...prevState,
        password: !passValid,
        cpassword: !cpassValid,
      }));
      return;
    } else {
      const user = await loadItem('user');
      if (user) {
        const userObj = JSON.parse(user);
      } else {
        toaster('User not found!', '', 'custom');
      }
      return;
    }
  };

  return (
    <UnAuthWrapper
      goBack={navigation.goBack}
      header="Set Password"
      description="Onboarding details dsiuf duiusdd sdfusdfs sdufsdf sdfiudsfsdf sdifusdfsdfhosdfpos sdufsdf sdufsdfsdois sd"
      linkText="Sign In"
      onLinkPress={() => navigation.navigate('SignUp')}>
      <View>
        {isFrom === 'forgotPassword' ? (
          <View>
            <Paragraph text="Enter code sent to your mail." />
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={val => {
                if (val && passError.code) {
                  setPassError(prevState => ({
                    ...prevState,
                    code: false,
                  }));
                }
                setValue(val);
              }}
              cellCount={6}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            {passError.code ? (
              <Paragraph text="Please, Enter code sent to your mail!" />
            ) : null}
          </View>
        ) : null}
        <InputText
          label="Password"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="password"
          onChange={handleTextChange}
          value={data.password}
          errorText="Password must contain a number, alphabeth, special character and must be more than 8 characters!"
          inValid={passError.password}
        />
        <InputText
          label="Confirm Password"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="cpassword"
          onChange={handleTextChange}
          value={data.cpassword}
          errorText="Confirm Password must match Password!"
          inValid={passError.cpassword}
        />
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Submit'}
            onPress={
              isFrom === 'forgotPassword' ? handlePasswordReset : handleSubmit
            }
          />
        </View>
      </View>
    </UnAuthWrapper>
  );
};

export default SetPassword;
