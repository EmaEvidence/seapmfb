import React, {useState} from 'react';
import {View, ImageBackground, Platform} from 'react-native';
import Video from 'react-native-video';
import {Button, Logo, RowView} from '../../common';
import Hall from '../../assets/images/hall.jpeg';
import SeapVideo from '../../assets/seap.mp4';
import styles from './welcome.style';
import {Header2} from '../../common/Text';

interface WelcomeProps {
  navigation: {
    replace: (route: string) => void;
    navigate: (route: string) => void;
  };
}

export const Welcome = ({navigation}: WelcomeProps) => {
  const [hideVideo, setHideVideo] = useState(false);
  const moveToAuth = (route: string) => {
    return navigation.navigate(route);
  };

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
          <Button
            overrideStyle={styles.fullBtn}
            label="Login"
            onPress={() => moveToAuth('Login')}
          />
          <Button
            overrideStyle={styles.fullBtn}
            label="Register"
            onPress={() => moveToAuth('SignUp')}
          />
          <RowView justify="isBtw" align="isCenter">
            <Button
              label="Get a Loan"
              onPress={() => moveToAuth('LoanTypes')}
              overrideStyle={styles.halfBtn}
            />
            <Button
              label="Get an Account"
              onPress={() => moveToAuth('GetSeapAccount')}
              overrideStyle={styles.halfBtn}
            />
          </RowView>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
