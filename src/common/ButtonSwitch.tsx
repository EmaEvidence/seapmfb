import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '../utils/theme';
import {Header5} from './Text';

interface ButtonSwitchProps {
  options: Array<string>;
  setSelected: (arg: string) => void;
  overrideContainerStyle?: ViewStyle;
  overrideButtnStyle?: ViewStyle;
  overrideLabelStyle?: TextStyle;
}

export const ButtonSwitch = ({
  options,
  setSelected,
  overrideButtnStyle,
  overrideContainerStyle,
  overrideLabelStyle,
}: ButtonSwitchProps) => {
  const optionsLength = options.length;
  const [selectedOption, setOption] = useState(options[0]);

  return (
    <View style={[styles.container, overrideContainerStyle]}>
      {options.map((option, index) => {
        const optionStyle: Array<Record<string, string | number>> =
          selectedOption === option
            ? [styles.option, styles.selectedOption]
            : [styles.option];
        if (index === 0) {
          optionStyle.push(styles.firstOption);
        }
        if (index === optionsLength - 1) {
          optionStyle.push(styles.lastOption);
        }
        return (
          <TouchableOpacity
            key={option}
            onPress={() => {
              setOption(option);
              setSelected(option);
            }}
            style={[...optionStyle, overrideButtnStyle]}>
            <Header5
              text={option}
              overrideStyle={[
                selectedOption === option
                  ? styles.selectedOptionText
                  : styles.optionText,
                overrideLabelStyle,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ButtonSwitch;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.sMainBlue,
  },
  option: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
  },
  selectedOption: {
    backgroundColor: colors.sMainBlue,
    borderWidth: 1,
  },
  optionText: {
    color: colors.sMainBlue,
  },
  selectedOptionText: {
    color: colors.twhite,
  },
  firstOption: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastOption: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
