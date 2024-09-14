import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {colors, fontSizes} from '../utils/theme';
import {Paragraph} from './Text';

export const CodeFieldComponent = ({
  label,
  name,
  onChange,
  hasError,
  errorText = 'Please, Enter code sent to your mail!',
}: {
  label: string;
  name: string;
  onChange: (name: string, value: string) => void;
  hasError: boolean;
  errorText: string;
}) => {
  const [value, setValue] = useState('');
  const [codeError, setError] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setError(hasError);
  }, [hasError]);

  return (
    <View style={{
      width: '100%'
    }}>
      <Paragraph text={label} overrideStyle={styles.label} />
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(val: string) => {
          if (val && codeError) {
            setError(false);
          }
          setValue(val);
          onChange(name, val);
        }}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="password"
        renderCell={({
          index,
          symbol,
          isFocused,
        }: {
          index: number;
          symbol: string;
          isFocused: boolean;
        }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {(symbol && '*') || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {codeError ? (
        <Paragraph text={errorText} overrideStyle={styles.errorText} />
      ) : null}
    </View>
  );
};

export default CodeFieldComponent;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 10,
    marginBottom: 20,
  },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 50,
    fontSize: fontSizes.header1,
    borderBottomWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    borderColor: colors.sLighterBlue,
    marginHorizontal: 2,
    backgroundColor: colors.sTextYellow,
  },
  focusCell: {
    // borderColor: colors.tblue,
    // borderWidth: 2.5,
    lineHeight: 37,
  },
  label: {
    textAlign: 'left',
    color: colors.sMainBlue,
    fontWeight: '400',
    lineHeight: 24,
    fontSize: fontSizes.paragragh2,
  },
  errorText: {
    color: 'red',
  },
});
