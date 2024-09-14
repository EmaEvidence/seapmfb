import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  resetTransactionPin,
  updateTransactionPin,
} from '../../app/actions/auth';
import {Button, CodeFieldComponent, Header, RowView} from '../../common';
import InputText, {Checkbox} from '../../common/InputText';
import {saveItem} from '../../utils/localStorage';
import toaster from '../../utils/toaster';
import {validateNonEmpty, validatePin} from '../../validator';
import styles from './Profile.styles';
import { Header1, Header3, Paragraph } from '../../common/Text';
import { colors } from '../../utils/theme';
import generalStyles from '../../index.styles';

export const ChangePin = ({navigation}: any) => {
  const [mode, setMode] = useState('update');
  const isUpdate = mode === 'update';
  const handleModeChange = () => {
    setMode(isUpdate ? 'reset' : 'update');
  };
  return (
    <View style={styles.wrapper}>
      <RowView justify='isBtw' overrideStyle={styles.tabHeader}>
        <TouchableOpacity onPress={handleModeChange}>
          <Header3 text='Change PIN' overrideStyle={{
            color: isUpdate ? colors.sMainBlue : colors.tblack
          }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleModeChange}>
          <Header3 text='Reset PIN' overrideStyle={{
            color: !isUpdate ? colors.sMainBlue : colors.tblack
          }} />
        </TouchableOpacity>
      </RowView>
      {mode === 'update' ? (
        <UpdatePin handleModeChange={handleModeChange} />
      ) : (
        <ResetPin handleModeChange={handleModeChange} />
      )}
    </View>
  );
};

export default ChangePin;

const ResetPin = ({handleModeChange}: {handleModeChange: () => void}) => {
  const [userData, setData] = useState<Record<string, string>>({
    secretAnswer: '',
    setAsDefault: true,
    pinConfirmation: '',
    transactionPin: '',
  });

  const [userError, setError] = useState<Record<string, boolean>>({
    secretAnswer: false,
    pinConfirmation: false,
    transactionPin: false,
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

  const handleSubmit = async () => {
    const {transactionPin, pinConfirmation, secretAnswer} = userData;
    const pinError = !validatePin(transactionPin);
    const cPinError = !(pinConfirmation === transactionPin);
    const secretError = !validateNonEmpty(secretAnswer);
    if (pinError || cPinError || secretError) {
      setError({
        ...userError,
        transactionPin: pinError,
        pinConfirmation: cPinError,
        secretAnswer: secretError,
      });
      return;
    }
    const resp = await resetTransactionPin({
      ...userData,
      // @ts-ignore
      setAsDefault: userData.setAsDefault,
    });
    if (resp?.status === 200) {
      toaster('Success', 'PIN Reset Successful.', 'custom');
      userData.setAsDefault && saveItem('isMFASet', '1');
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.securityFormWrapper}>
        <InputText
          name="secretAnswer"
          onChange={handleTextChange}
          label="Secret Answer"
          overrideStyle={styles.textInput}
          value={userData.secretAnswer}
          errorText="Please enter your Secret Answer!"
          inValid={userError.secretAnswer}
        />
        <RowView justify='isBtw' align='isCenter'>
          <InputText
            name="transactionPin"
            onChange={handleTextChange}
            label="Transaction pin"
            overrideNPInputWrapper={[styles.textInput, generalStyles.halfBtn]}
            value={userData.transactionPin}
            errorText="Please enter a pin!"
            inValid={userError.transactionPin}
            obsureText
            maxLength={6}
          />
          <InputText
            name="pinConfirmation"
            onChange={handleTextChange}
            label="Confirm pin"
            overrideNPInputWrapper={[styles.textInput, generalStyles.halfBtn]}
            value={userData.pinConfirmation}
            errorText="Pin mismatch"
            inValid={userError.pinConfirmation}
            obsureText
            maxLength={6}
          />
        </RowView>
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Save'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

const UpdatePin = ({handleModeChange}: {handleModeChange: () => void}) => {
  const [userData, setData] = useState<Record<string, string>>({
    oldPin: '',
    setAsDefault: true,
    pinConfirmation: '',
    transactionPin: '',
  });

  const [userError, setError] = useState<Record<string, boolean>>({
    oldPin: false,
    pinConfirmation: false,
    transactionPin: false,
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

  const handleSubmit = async () => {
    const {transactionPin, pinConfirmation, oldPin} = userData;
    const pinError = !validatePin(transactionPin);
    const cPinError = !(pinConfirmation === transactionPin);
    const oldPinError = !validatePin(oldPin);
    if (pinError || cPinError || oldPinError) {
      setError({
        ...userError,
        transactionPin: pinError,
        pinConfirmation: cPinError,
        oldPin: oldPinError,
      });
      return;
    }
    const resp = await updateTransactionPin({
      ...userData,
      // @ts-ignore
      setAsDefault: userData.setAsDefault,
    });
    if (resp?.status === 200) {
      toaster('Success', 'PIN Updated Successfully.', 'custom');
      userData.setAsDefault && saveItem('isMFASet', '1');
    }
  };

  return (
    <View style={styles.content}>
      <View style={styles.securityFormWrapper}>
        {/* <CodeFieldComponent
          label="Old 6 Digit Pin"
          name={'oldPin'}
          onChange={handleTextChange}
          hasError={userError.oldPin}
          errorText={'Please enter your current pin!'}
        /> */}
        <InputText
            name="oldPin"
            onChange={handleTextChange}
            label="Old 6 digit Pin"
            overrideNPInputWrapper={[styles.textInput]}
            value={userData.oldPin}
            errorText="Please enter a pin!"
            inValid={userError.oldPin}
            obsureText
            maxLength={6}
          />
        <RowView justify='isBtw' align='isCenter'>
          <InputText
            name="transactionPin"
            onChange={handleTextChange}
            label="Transaction pin"
            overrideNPInputWrapper={[styles.textInput, generalStyles.halfBtn]}
            value={userData.transactionPin}
            errorText="Please enter a pin!"
            inValid={userError.transactionPin}
            obsureText
            maxLength={6}
          />
          <InputText
            name="pinConfirmation"
            onChange={handleTextChange}
            label="Confirm pin"
            overrideNPInputWrapper={[styles.textInput, generalStyles.halfBtn]}
            value={userData.pinConfirmation}
            errorText="Pin mismatch"
            inValid={userError.pinConfirmation}
            obsureText
            maxLength={6}
          />
        </RowView>
        {/* <View style={styles.buttonWrapper}>
          <Checkbox
            label="Set as Default"
            name="setAsDefault"
            onChange={handleTextChange}
            value={userData.setAsDefault}
          />
        </View> */}

        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Save'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};
