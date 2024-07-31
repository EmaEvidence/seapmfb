import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Button} from '../../common';
import {Paragraph} from '../../common/Text';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import {loadItem} from '../../utils/localStorage';
import toaster from '../../utils/toaster';
import styles from './VerifyEmail.styles';

interface VerifyEmailProps {
  navigation: {
    navigate: (route: string) => void;
  };
}

export const VerifyEmail = ({navigation}: VerifyEmailProps) => {
  const [value, setValue] = useState('');
  const [codeError, setError] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = async () => {
    if (!value) {
      setError(true);
      return;
    } else {
      setError(false);
      const user = await loadItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        const email = userObj.email.toLowerCase();
        return email;
      } else {
        toaster('Email Verification Failed!', 'User not found!', 'custom');
      }
    }
  };

  return (
    <UnAuthWrapper
      header="Verify Account"
      description="Onboarding details dsiuf duiusdd sdfusdfs sdufsdf sdfiudsfsdf sdifusdfsdfhosdfpos sdufsdf sdufsdfsdois sd"
      linkText="Sign Up"
      onLinkPress={() => navigation.navigate('SignUp')}>
      <View>
        <Paragraph text="Enter code sent to your mail." />
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={val => {
            if (val && codeError) {
              setError(false);
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
        {codeError ? (
          <Paragraph text="Please, Enter code sent to your mail!" />
        ) : null}
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Submit'}
            onPress={handleSubmit}
          />
          <Button
            overrideStyle={styles.fgtPswordbutton}
            overrideLabelStyle={styles.fgtPswordbuttonLabel}
            label="Did not get a code? Resend"
            onPress={() => null}
          />
        </View>
      </View>
    </UnAuthWrapper>
  );
};

export default VerifyEmail;
