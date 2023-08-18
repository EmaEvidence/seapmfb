import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AccountSelector, Button, Header} from '../../common';
import InputText from '../../common/InputText';
// import useLanguage from '../../hooks/useLanguage';
import styles from './Feedback.styles';
import toaster from '../../utils/toaster';
import {validateNonEmpty} from '../../validator';
import {sendFeedback} from '../../app/actions/account';
import useDeviceInfo from '../../hooks/useDeviceInfo';
import {Header2} from '../../common/Text';
import {useRoute} from '@react-navigation/native';

export const Feedback = ({navigation}: any) => {
  // const {lang} = useLanguage();
  const {params} = useRoute();
  const {ip} = useDeviceInfo();
  const [userData, setData] = useState({
    userAccountNo: '',
    message: '',
    subject: params?.subject || '',
  });

  useEffect(() => {
    setData(prevState => ({
      ...prevState,
      subject: params?.subject || '',
    }));
  }, [params?.subject]);

  const [userError, setError] = useState({
    userAccountNo: false,
    message: false,
    subject: false,
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
    handleErrorChange(label, !value);
  };

  const handleSubmit = async () => {
    const {message, userAccountNo, subject} = userData;
    const acctError = !validateNonEmpty(userAccountNo);
    const subjError = !validateNonEmpty(subject);
    const messageError = !validateNonEmpty(message);
    if (acctError || subjError || messageError) {
      setError({
        ...userError,
        userAccountNo: acctError,
        message: messageError,
        subject: subjError,
      });
      return;
    } else {
      setError(prevState => ({
        ...prevState,
        userAccountNo: false,
        message: false,
        subject: false,
      }));
      const resp = await sendFeedback({
        ...userData,
        userIpAddress: ip,
      });
      // @ts-ignore
      if (resp?.status === 200) {
        setData({
          userAccountNo: '',
          message: '',
          subject: '',
        });
        toaster('Success', 'Feedback sent successfully', 'custom');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title={params?.title || 'Feedback or Complaints'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
      />
      <View style={styles.feedbackWrapper}>
        <Header2
          text={params?.subject || 'Your Feedback makes us better.'}
          overrideStyle={styles.title}
        />
        <AccountSelector
          value={userData.userAccountNo}
          handleTextChange={(label: string, val: string) => {
            handleTextChange('userAccountNo', val);
          }}
          inValid={userError.userAccountNo}
          error="Please select an account"
        />
        <InputText
          name="subject"
          onChange={handleTextChange}
          label={'Subject'}
          overrideStyle={styles.textInput}
          value={userData.subject}
          errorText="Please enter a subject for the feedback!"
          inValid={userError.subject}
          placeholder="e.g Card Complaints"
        />
        <InputText
          label={'Message'}
          overrideStyle={styles.messageInput}
          obsureText={true}
          name="message"
          onChange={handleTextChange}
          value={userData.message}
          errorText="Enter your message!"
          inValid={userError.message}
          multiline
          numberOfLines={4}
          overrideInputWrapperStyle={styles.inputStyle}
          placeholder="Your Message"
        />
        <View style={styles.buttonWrapper}>
          <Button
            overrideStyle={styles.button}
            label={'Submit'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default Feedback;
