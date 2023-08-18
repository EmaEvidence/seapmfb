import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Header} from '../../common';
import styles from './Profile.styles';
import InputText from '../../common/InputText';

export const EditProfile = ({navigation}: any) => {
  const [userData, setData] = useState({
    email: '',
    password: '',
  });

  const [userError, setError] = useState({
    email: false,
    password: false,
  });

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleSubmit = () => {
    const {email, password} = userData;
    if (email.trim().length === 0 || password.trim().length === 0) {
      if (email.trim().length === 0) {
        setError(prevState => ({
          ...prevState,
          email: true,
        }));
      }
      if (password.trim().length === 0 || password.trim().length < 8) {
        setError(prevState => ({
          ...prevState,
          password: true,
        }));
      }
      return;
    } else {
      setError(prevState => ({
        ...prevState,
        email: false,
        password: false,
      }));
      navigation.navigate('MFAChoice');
    }
  };
  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.navigate('Profile')}
        showBackBtn
        title={'Edit Profile'}
        navigation={navigation}
      />
      <View style={styles.content}>
        <InputText
          name="Date of Birth"
          onChange={handleTextChange}
          label="Email"
          overrideStyle={styles.textInput}
          value={userData.email}
          errorText="Please enter your Email!"
          inValid={userError.email}
        />
        <InputText
          label="Gender"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="password"
          onChange={handleTextChange}
          value={userData.password}
          errorText="Please enter your password!"
          inValid={userError.password}
        />
        <InputText
          label="Address"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="password"
          onChange={handleTextChange}
          value={userData.password}
          errorText="Please enter your password!"
          inValid={userError.password}
        />
        <InputText
          label="Alternative Phone Number"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="password"
          onChange={handleTextChange}
          value={userData.password}
          errorText="Please enter your password!"
          inValid={userError.password}
        />
        <InputText
          label="Alternative Email"
          overrideStyle={styles.textInput}
          obsureText={true}
          name="password"
          onChange={handleTextChange}
          value={userData.password}
          errorText="Please enter your password!"
          inValid={userError.password}
        />
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

export default EditProfile;
