import React, {useState} from 'react';
import {View, ImageBackground, Platform} from 'react-native';
import Video from 'react-native-video';
import {Button, Logo, RowView} from '../../common';
import Hall from '../../assets/images/hall.jpeg';
import SeapVideo from '../../assets/seap.mp4';
import styles from './welcome.style';
import {Header2} from '../../common/Text';
import useHasBiometric from '../../hooks/useHasBiometric';
import useRefreshToken from '../../hooks/useRefreshToken';
import { loadItem } from '../../utils/localStorage';

interface WelcomeProps {
  navigation: {
    replace: (route: string) => void;
    navigate: (route: string) => void;
  };
}

export const Welcome = ({navigation}: WelcomeProps) => {
  const [hideVideo, setHideVideo] = useState(false);
  const {hasBiometric} = useHasBiometric();
  const moveToAuth = (route: string) => {
    return navigation.navigate(route);
  };

  const {refreshToken} = useRefreshToken();

  const handleLoginCheck = async () => {
    if (refreshToken && hasBiometric) {
      moveToAuth('LoginWithBio');
    } else {
      moveToAuth('Login');
    }
  }

  return (
    <ImageBackground source={Hall}>
      {!hideVideo || Platform.OS === 'android' && (
        <Video
          source={SeapVideo}
          style={styles.video}
          muted={true}
          repeat={false}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
          paused={false}
          onEnd={() => setHideVideo(true)}
        />
      )}
      <View style={styles.wrapper}>
        <Logo overrideStyle={styles.logo} />
        <Header2 overrideStyle={styles.header} text="Spring of Happiness" />
        <View>
          <RowView justify="isBtw" align="isCenter">
            <Button
              overrideStyle={styles.halfBtn}
              label="Login"
              onPress={() => handleLoginCheck()}
            />
            <Button
              overrideStyle={styles.halfBtn}
              label="Signup"
              onPress={() => moveToAuth('SignUp')}
            />
          </RowView>
          <RowView justify="isBtw" align="isCenter">
            <Button
              label="Get a SEAP Account"
              onPress={() => moveToAuth('GetSeapAccount')}
              overrideStyle={styles.fullBtn}
            />
          </RowView>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
