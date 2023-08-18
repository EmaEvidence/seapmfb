import React from 'react';
import {View} from 'react-native';
import {Paragraph} from '../../common/Text';
import {Button} from '../../common';
import styles from './Profile.styles';

const ResetComponent = ({
  question,
  answer,
  onPress,
}: {
  question: string;
  answer: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.resetWrapper}>
      <Paragraph text={question} overrideStyle={styles.resetQuestion} />
      <Button
        label={answer}
        onPress={onPress}
        overrideLabelStyle={styles.resetBtnText}
        overrideStyle={styles.resetBtn}
      />
    </View>
  );
};

export default ResetComponent;
