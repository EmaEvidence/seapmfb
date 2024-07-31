import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
  TextInputProps,
  useColorScheme,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {height} from '../utils/constants';
import {colors, fontSizes} from '../utils/theme';
import {Paragraph, Header5} from './Text';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';

interface InputTextProps extends TextInputProps {
  inputType?: 'number';
  placeholder?: string;
  value: string;
  overrideStyle?: ViewStyle | ViewStyle[];
  onChange: (name: string, text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  subLabel?: string;
  obsureText?: boolean;
  errorText?: string;
  inValid?: boolean;
  name: string;
  overrideInputStyle?: TextStyle;
  numberOfLines?: number;
  multiline?: boolean;
  overrideInputWrapperStyle?: ViewStyle;
  placeholderColor?: string;
  readonly?: boolean;
  onPress?: () => void;
}

const InputText = ({
  placeholder,
  value,
  overrideStyle,
  onChange,
  label,
  subLabel,
  obsureText = false,
  errorText,
  inValid = false,
  name,
  overrideInputStyle,
  onBlur,
  onFocus,
  numberOfLines,
  multiline,
  overrideInputWrapperStyle,
  placeholderColor,
  readonly,
  onPress,
  inputType,
}: InputTextProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={[styles.container, overrideStyle]}>
      <View style={styles.labelContainer}>
        {label && <Header5 text={label} overrideStyle={styles.label} />}
        {subLabel && (
          <Paragraph text={`(${subLabel})`} overrideStyle={styles.subLabel} />
        )}
      </View>
      <View style={[styles.textInputWrapper, overrideInputWrapperStyle]}>
        <TextInput
          numberOfLines={numberOfLines || 1}
          placeholder={placeholder}
          value={value}
          editable={readonly}
          onChangeText={text => {
            // @ts-ignore
            if (inputType && isNaN(text)) {
              return;
            }
            onChange(name, text);
          }}
          style={[
            styles.textInputStyle,
            overrideInputStyle,
            isFocus ? styles.textInputFocus : {},
          ]}
          secureTextEntry={obsureText}
          onBlur={() => {
            onBlur && onBlur();
            setIsFocus(false);
          }}
          onFocus={() => {
            onFocus && onFocus();
            setIsFocus(true);
          }}
          onPressIn={() => {
            onFocus && onFocus();
            onPress && onPress();
          }}
          multiline={multiline}
          placeholderTextColor={placeholderColor}
        />
      </View>

      {inValid && (
        <Paragraph
          overrideStyle={styles.errorText}
          text={errorText as string}
        />
      )}
    </View>
  );
};

export default InputText;

interface CustomPickerWithModalProps {
  overrideStyle: ViewStyle;
  onPress: () => void;
  label: string;
  subLabel: string;
  data: Array<string>;
  value: string;
}

export const CustomPickerWithModal = ({
  value,
  overrideStyle,
  onPress,
  label,
  subLabel,
}: CustomPickerWithModalProps) => {
  return (
    <View style={[styles.container, overrideStyle]}>
      <View style={styles.labelContainer}>
        {label && <Header5 text={label} overrideStyle={styles.label} />}
        {subLabel && (
          <Paragraph text={`(${subLabel})`} overrideStyle={styles.subLabel} />
        )}
      </View>
      <TouchableOpacity
        style={[styles.textInputStyle, styles.touchableInput]}
        onPress={() => onPress()}>
        <Paragraph text={value} />
      </TouchableOpacity>
      {/* <Paragraph overrideStyle={styles.errorText} text={'error jhjhj'} /> */}
    </View>
  );
};

interface CustomPickerProps {
  overrideStyle: ViewStyle | ViewStyle[];
  onChange: (name: string, text: string) => void;
  label: string;
  subLabel?: string;
  data: Array<string>;
  name: string;
  value: string;
  inValid: boolean;
  error: string;
  overridePickerStyle?: ViewStyle;
  pickerItemStyle?: ViewStyle;
  pickerStyle?: ViewStyle;
  mode?: 'dropdown' | 'dialog';
  zIndex?: number;
  zIndexInverse?: number;
}

interface GenericPickerProps {
  overrideStyle: ViewStyle | ViewStyle[];
  onChange: (name: string, text: string) => void;
  label: string;
  subLabel?: string;
  data: Array<Record<string, string>>;
  name: string;
  value: string;
  inValid: boolean;
  error: string;
  overridePickerStyle?: ViewStyle;
  pickerItemStyle?: ViewStyle;
  pickerStyle?: ViewStyle;
  mode?: 'dropdown' | 'dialog';
  zIndex?: number;
  zIndexInverse?: number;
  dropDownDirection?: 'DEFAULT' | 'TOP' | 'BOTTOM' | 'AUTO';
  listMode?: 'MODAL' | 'SCROLLVIEW' | 'FLATLIST' | 'DEFAULT';
  searchable?: boolean;
  placeholder?: string;
}

export const CustomPicker = ({
  overrideStyle,
  onChange,
  label,
  subLabel,
  data,
  name,
  value,
  inValid,
  error,
  overridePickerStyle,
  pickerStyle,
  pickerItemStyle,
  mode = Platform.OS === 'ios' ? 'dropdown' : 'dialog',
}: CustomPickerProps) => {
  const colorScheme = useColorScheme();
  // const [open, setOpen] = useState(false);
  return (
    <View style={[styles.container, overrideStyle]}>
      <View style={styles.labelContainer}>
        {label && <Header5 text={label} overrideStyle={styles.label} />}
        {subLabel && (
          <Paragraph text={`(${subLabel})`} overrideStyle={styles.subLabel} />
        )}
      </View>
      <View
        style={[
          styles.textInputStyle,
          styles.dropDownWrapper,
          overridePickerStyle,
        ]}>
        <Picker
          mode={mode}
          selectedValue={value}
          style={[styles.picker, pickerStyle]}
          onValueChange={val => onChange(name, val)}
          itemStyle={[styles.pickerItem, pickerItemStyle]}>
          {data.map(item => (
            <Picker.Item
              style={styles.itemText}
              label={item}
              value={item}
              key={item}
              color={colorScheme === 'light' ? colors.sMainBlue : colors.tblue}
            />
          ))}
        </Picker>
      </View>
      {inValid && <Paragraph overrideStyle={styles.errorText} text={error} />}
    </View>
  );
};

export const Checkbox = ({
  value,
  overrideStyle,
  onChange,
  label,
  errorText,
  inValid = false,
  name,
  overrideInputWrapperStyle,
}: InputTextProps) => {
  return (
    <View style={[styles.container, overrideStyle]}>
      <View
        style={[
          styles.textInputWrapper,
          styles.checkboxWrapper,
          overrideInputWrapperStyle,
        ]}>
        <BouncyCheckbox
          size={25}
          fillColor={colors.sMainBlue}
          unfillColor={colors.twhite}
          text={label}
          disableText
          isChecked={value === 'yes'}
          iconStyle={{borderColor: colors.sMainBlue}}
          innerIconStyle={{borderWidth: 2}}
          onPress={(isChecked: boolean) => {
            onChange(name, isChecked ? 'yes' : 'no');
          }}
        />
        {label && (
          <Header5
            text={label}
            overrideStyle={[styles.label, styles.checkboxLabel]}
          />
        )}
      </View>
      {inValid && (
        <Paragraph
          overrideStyle={styles.errorText}
          text={errorText as string}
        />
      )}
    </View>
  );
};

export const GenericDropdown = ({
  overrideStyle,
  onChange,
  label,
  subLabel,
  data,
  name,
  inValid,
  error,
  overridePickerStyle,
  ...props
}: GenericPickerProps) => {
  const [items, setItems] = useState<Array<any>>(data);
  const [value, setValue] = useState<ValueType | null>(props.value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange(name, value);
  }, [value]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <View style={[styles.container, overrideStyle]}>
      <View style={styles.labelContainer}>
        {label && <Header5 text={label} overrideStyle={styles.label} />}
        {subLabel && (
          <Paragraph text={`(${subLabel})`} overrideStyle={styles.subLabel} />
        )}
      </View>
      <View
        style={[
          styles.textInputStyle,
          styles.dropDownWrapper,
          overridePickerStyle,
        ]}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="LIGHT"
          mode="BADGE"
          placeholder={props.placeholder || `Select ${name}`}
          placeholderStyle={styles.placeholderStyle}
          listMode={props.listMode}
          dropDownDirection={props.dropDownDirection}
          searchable={props.searchable}
          containerStyle={styles.autoComplete}
          style={styles.style}
          searchContainerStyle={styles.searchContainerStyle}
          searchTextInputStyle={styles.searchTextInputStyle}
          listItemLabelStyle={styles.listItemLabelStyle}
          listItemContainerStyle={styles.listItemContainerStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          zIndex={props.zIndex}
          zIndexInverse={props.zIndexInverse}
          searchPlaceholder={`Search ${name}`}
        />
      </View>
      {inValid && (
        <Paragraph overrideStyle={styles.errorText} text={error as string} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.06,
    maxHeight: 50,
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: '5%',
    zIndex: 0,
  },
  text: {
    color: colors.twhite,
  },
  errorText: {
    alignSelf: 'flex-end',
    color: 'red',
    fontWeight: 'bold',
    fontSize: fontSizes.bodyText,
    width: '80%',
    textAlign: 'right',
    position: 'absolute',
    top: 60,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  checkboxLabel: {
    marginLeft: 20,
  },
  textInputStyle: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.sLighterBlue,
    height: '100%',
    width: '100%',
    minHeight: 40,
    paddingHorizontal: '5%',
    backgroundColor: 'transparent',
    position: 'relative',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.sMainBlue,
  },
  textInputFocus: {
    borderColor: colors.sMainBlue,
    borderWidth: 1.5,
  },
  textInputWrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    position: 'relative',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'left',
    color: colors.sMainBlue,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: fontSizes.paragragh2,
  },
  labelContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
  subLabel: {
    fontSize: fontSizes.bodyText,
    marginTop: 5,
  },
  touchableInput: {
    display: 'flex',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    margin: 0,
  },
  pickerItem: {
    height: 50,
    width: '100%',
    flex: 1,
    textAlign: 'left',
    justifyContent: 'flex-start',
    backgroundColor: colors.sLightBlue,
    padding: 0,
    margin: 0,
    color: colors.sMainBlue,
    fontSize: fontSizes.paragragh2,
  },
  itemText: {
    width: '100%',
    fontSize: fontSizes.paragragh2,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'yellow',
  },
  autoComplete: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: colors.sMainBlue,
    borderRadius: 5,
  },
  dropDownWrapper: {
    paddingHorizontal: 0,
    borderWidth: 0,
    marginTop: 4,
  },
  style: {
    borderColor: colors.sMainBlue,
    borderRadius: 5,
  },
  searchContainerStyle: {
    borderColor: 'transparent',
    paddingVertical: 0,
    height: 50,
    borderBottomColor: 'transparent',
    justifyContent: 'flex-end',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  searchTextInputStyle: {
    color: colors.sMainBlue,
    fontSize: 16,
    height: '100%',
    borderWidth: 1,
    borderColor: colors.sMainBlue,
  },
  listItemLabelStyle: {
    color: colors.sMainBlue,
  },
  listItemContainerStyle: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.twhite,
    marginVertical: 1,
    borderRadius: 5,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.twhite,
    borderColor: colors.sMainBlue,
    borderWidth: 1,
  },
  placeholderStyle: {
    color: colors.sLighterBlue,
  }
});
