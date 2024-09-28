import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { TextInput as TextInputNP, type TextInputProps } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {height} from '../utils/constants';
import {colors, fontSizes} from '../utils/theme';
import {Paragraph, Header5} from './Text';
import DropDownPicker, { type ValueType} from 'react-native-dropdown-picker';

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
  overrideInputWrapperStyle?: ViewStyle | ViewStyle[];
  placeholderColor?: string;
  readonly?: boolean;
  onPress?: () => void;
  overrideNPInputWrapper?: ViewStyle | ViewStyle[];
  overrideNPInputStyle?: ViewStyle | ViewStyle[];
  outlineColor?: string;
  activeOutlineColor?: string;
  contentStyle?: ViewStyle;
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
  overrideNPInputWrapper,
  overrideNPInputStyle,
  placeholderColor,
  readonly,
  onPress,
  inputType,
  inputMode,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  returnKeyType,
  autoFocus,
  outlineColor = colors.sLighterBlue,
  activeOutlineColor = colors.sMainBlue,
  contentStyle,
  maxLength,
  right,
}: InputTextProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={[styles.npTextContainerStyle, overrideNPInputWrapper]}>
      <TextInputNP
        key={label}
        label={label}
        numberOfLines={numberOfLines || 1}
        placeholder={placeholder}
        value={value}
        mode="outlined"
        dense
        outlineColor={outlineColor}
        activeOutlineColor={activeOutlineColor}
        editable={readonly}
        onChangeText={text => {
          // @ts-ignore
          if (inputType && isNaN(text)) {
            return;
          }
          onChange(name, text);
        }}
        style={[
          styles.npTextStyle,
          overrideNPInputStyle,
        ]}
        contentStyle={[
          {
            fontSize: fontSizes.paragragh
          },
          contentStyle
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
        error={inValid}
        inputMode={inputMode}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        autoFocus={autoFocus}
        maxLength={maxLength}
        right={right}
      />
      {inValid && (
        <Paragraph
          overrideStyle={styles.errorTextNP}
          text={errorText as string}
        />
      )}
    </View>
    
  );
};

export default InputText;

interface GenericPickerProps {
  overrideStyle?: ViewStyle | ViewStyle[];
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
    <View style={[styles.container, styles.npTextContainerStyle, overrideStyle]}>
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
    if (props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <View
      style={[
        {
          width: '100%',
        },
        overrideStyle
    ]}
    >
      {label && <Paragraph onPress={() => setOpen(true)} text={label} overrideStyle={[styles.label, { 
        fontSize: value ? 10: 12,
        color: value ? colors.sMainBlue : colors.tblack,
        lineHeight: value ? 12 : 14,
        position: 'absolute',
        zIndex: 9999,
        left: 10,
        top: value ? -5 : 20,
        paddingHorizontal: 5,
        backgroundColor: 'white',
      }]} />}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        mode="BADGE"
        placeholderStyle={styles.placeholderStyle}
        listMode={props.listMode}
        dropDownDirection={props.dropDownDirection}
        searchable={props.searchable}
        containerStyle={[styles.autoComplete, { height: 55 } ]}
        style={[styles.style]}
        searchContainerStyle={styles.searchContainerStyle}
        searchTextInputStyle={styles.searchTextInputStyle}
        listItemLabelStyle={styles.listItemLabelStyle}
        listItemContainerStyle={styles.listItemContainerStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        zIndex={props.zIndex}
        zIndexInverse={props.zIndexInverse}
        searchPlaceholder={`Search ${name}`}
      />
      {inValid && (
        <Paragraph overrideStyle={[styles.errorTextNP, { bottom: -10}]} text={error as string} />
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
  errorTextNP: {
    alignSelf: 'flex-end',
    color: 'red',
    fontWeight: 'bold',
    fontSize: fontSizes.bodyText,
    width: '90%',
    textAlign: 'right',
    position: 'absolute',
    bottom: -11,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  checkboxLabel: {
    marginLeft: 20,
  },
  npTextContainerStyle: {
    width: '100%',
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: '3%',
  },
  npTextStyle: {
    height: 48,
    marginTop: -4,
    width: '100%',
    color: colors.sMainBlue,
    fontFamily: 'Poppins-Medium',
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
    borderRadius: 5,
  },
  dropDownWrapper: {
    paddingHorizontal: 0,
    borderWidth: 0,
    marginTop: 15,
  },
  style: {
    borderColor: colors.sMainBlue,
    borderRadius: 5,
    // minHeight: 55,
    // marginBottom: 10,
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
    fontSize: fontSizes.bodyText
  }
});
