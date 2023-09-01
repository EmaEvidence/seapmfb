import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import jwt_decode from 'jwt-decode';
import {Button} from '../../common';
import InputText from '../../common/InputText';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import styles from './EnrollDevice.styles';
import {INavigation} from '../../types';
import {validateNonEmpty} from '../../validator';
import {
  confirmOverwrite,
  enrollDevice,
  loginCall,
  requestOTPCallUnAuth,
} from '../../app/actions/auth';
import toaster from '../../utils/toaster';
import useDeviceInfo from '../../hooks/useDeviceInfo';
import {useRoute} from '@react-navigation/native';
import {Header3, Paragraph} from '../../common/Text';
import {AxiosResponse} from 'axios';
import { saveItem } from '../../utils/localStorage';

interface EnrollDeviceProps {
  navigation: INavigation;
}

export const EnrollDevice = ({navigation}: EnrollDeviceProps) => {
  const route = useRoute();
  const [step, setStep] = useState(0);
  const [selectedDevice, setDevice] = useState('');
  const [deviceList, setDeviceList] = useState<Array<Record<string, string>>>(
    [],
  );
  const {deviceId, os, osVersion, deviceName} = useDeviceInfo();
  const [userData, setData] = useState({
    accountNumber: '',
    otp: '',
    enrollmentReference: '',
  });

  const [userError, setError] = useState({
    accountNumber: false,
    otp: false,
  });

  const handleTextChange = useCallback((label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    handleErrorChange(label, !value);
  }, []);

  useEffect(() => {
    handleTextChange('accountNumber', route?.params?.acctNumber);
  }, [route?.params?.acctNumber, handleTextChange]);

  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleSubmit = async () => {
    const {accountNumber, otp} = userData;
    const acctError = !validateNonEmpty(accountNumber);
    const otpError = !validateNonEmpty(otp);
    if (otpError || acctError) {
      setError({
        accountNumber: acctError,
        otp: otpError,
      });
      return;
    }
    const resp = (await enrollDevice({
      ...userData,
      deviceId,
      deviceName,
      os,
      osVersion,
      sessionId: '090qwqere',
    })) as AxiosResponse;
    if (resp?.status === 200) {
      toaster(
        'Success',
        'Device successfully enrolled. Login to Continue.',
        'custom',
      );
      navigation.navigate('Login');
      return;
    }
    // @ts-ignore
    if (resp?.response?.status === 409) {
      // @ts-ignore
      setDeviceList(resp?.response?.data.deviceLists);
      handleTextChange(
        'enrollmentReference',
        // @ts-ignore
        resp?.response?.data.enrollmentReference,
      );
      setStep(2);
    }
  };

  const handleGetOTP = async () => {
    const resp = (await requestOTPCallUnAuth(
      userData.accountNumber,
    )) as AxiosResponse;
    if (resp.status === 200) {
      setStep(1);
      toaster('Success', 'OTP sent to your Phone', 'custom');
    }
  };

  const handleOverwriteDevice = async () => {
    const resp = (await confirmOverwrite({
      enrollmentReference: userData.enrollmentReference,
      overwriteDeviceId: selectedDevice,
      // deviceId,
      // sessionId: '090qwqere',
    })) as AxiosResponse;
    if (resp.status === 200) {
      toaster('Success', 'Device enrolled successfully.', 'custom');
      // navigation.navigate('Login');
      const resp = await loginCall({
        ...route?.params?.userDate,
        deviceId,
        sessionId: '090qwqere',
      });
      // @ts-ignore
      if (resp?.status === 200) {
        // @ts-ignore
        saveItem('authToken', resp.data.authenticationToken);
        saveItem('acctNo', userData.accountNumber);
        toaster('Success', 'Login Successful', 'custom');
        const decoded: Record<string, string> = jwt_decode(
          // @ts-ignore
          resp.data.authenticationToken,
        );
        // @ts-ignore
        axios.defaults.headers.common.Authorization = `Bearer ${resp.data.authenticationToken}`;
        // @ts-ignore
        handleMFA(resp.data.authType, decoded);
      }
    }
  };

  const handleDevicePress = (id: string) => {
    if (selectedDevice === id) {
      setDevice('');
    } else {
      setDevice(id);
    }
  };

  return (
    <UnAuthWrapper
      header="Device Enrollment."
      description={
        step === 2
          ? 'Select Device to overwrite'
          : 'This device is not Enrolled to Access your account. Get OTP to Enroll this device.'
      }
      linkText="Go Back"
      onLinkPress={() => navigation.navigate('Login')}>
      <View>
        {step === 0 && (
          <>
            <InputText
              name="accountNumber"
              onChange={handleTextChange}
              label="Account Number"
              overrideStyle={styles.textInput}
              value={userData.accountNumber}
              errorText="Please enter your Account Number!"
              inValid={userError.accountNumber}
              placeholder="e.g 1010101010"
            />
            <View style={styles.buttonWrapper}>
              <Button
                overrideStyle={styles.button}
                label={'Get OTP'}
                onPress={handleGetOTP}
              />
            </View>
          </>
        )}
        {step === 1 && (
          <>
            <InputText
              name="accountNumber"
              onChange={handleTextChange}
              label="Account Number"
              overrideStyle={styles.textInput}
              value={userData.accountNumber}
              errorText="Please enter your Account Number!"
              inValid={userError.accountNumber}
              placeholder="e.g 1010101010"
            />
            <InputText
              label="Enter OTP Sent to your Phone"
              overrideStyle={styles.textInput}
              name="otp"
              onChange={handleTextChange}
              value={userData.otp}
              errorText="Please enter your OTP!"
              inValid={userError.otp}
              placeholder="e.g 101010"
            />
            <View style={[styles.buttonWrapper, styles.row]}>
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Resend OTP'}
                onPress={handleGetOTP}
              />
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Enroll this Device'}
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
        {step === 2 && (
          <View>
            <Paragraph text="List of Enrolled Devices?" />
            <View>
              {deviceList.map(device => (
                <TouchableOpacity
                  key={device.deviceId}
                  style={styles.device}
                  onPress={() => handleDevicePress(device.deviceId)}>
                  <View
                    style={[
                      styles.checkBox,
                      selectedDevice === device.deviceId && styles.checked,
                    ]}
                  />
                  <View style={styles.details}>
                    <Header3 text={device.deviceName} />
                    {/* <Paragraph text={device.deviceId} /> */}
                    <Paragraph text={device.dateAdded.split('T')[0]} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.buttonWrapper, styles.row]}>
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'No, Take me out'}
                onPress={() => navigation.navigate('Login')}
              />
              <Button
                overrideStyle={[styles.button, styles.halfBtn]}
                label={'Yes, Confirm'}
                onPress={handleOverwriteDevice}
              />
            </View>
          </View>
        )}
      </View>
    </UnAuthWrapper>
  );
};

export default EnrollDevice;
