import React from 'react';
import InputText, {GenericDropdown} from '../../common/InputText';
import {View} from 'react-native';
import styles from './Payments.styles';
import {Paragraph} from '../../common/Text';
import {Button, RowView} from '../../common';

export const Electricity = ({
  amount,
  customerReference,
  handleTextChange,
  onReferenceBlur,
  name,
  contactEmail,
  contactType,
  customerPhoneNumber,
  errorObj,
}: {
  amount: string;
  customerReference: string;
  onReferenceBlur: () => void;
  handleTextChange: (val: string, name: string) => void;
  name: string;
  contactEmail?: string;
  contactType?: string;
  customerPhoneNumber?: string;
  errorObj: Record<string, boolean>;
}) => {
  return (
    <>
      <View style={styles.electricityWrapper}>
        <InputText
          value={customerReference}
          onChange={handleTextChange}
          name={'customerReference'}
          label="Meter Number"
          onBlur={onReferenceBlur}
          overrideNPInputWrapper={[styles.electricityInput, styles.inputStyle]}
          inValid={errorObj.customerReference}
          errorText="Enter Meter Number"
          placeholder="e.g 10101010101"
          autoFocus
          keyboardType='numeric'
          inputMode='numeric'
        />
        <InputText
          value={amount}
          onChange={handleTextChange}
          name={'amount'}
          label="Amount(₦)"
          overrideNPInputWrapper={[styles.electricityInput, styles.inputStyle]}
          inValid={errorObj.amount}
          errorText="Enter Amount"
          placeholder="e.g 1000"
          keyboardType='numeric'
          inputMode='numeric'
          returnKeyType='done'
        />
      </View>
      {name && <Paragraph text={name} />}
      {errorObj.name && (
        <RowView justify="isBtw" overrideStyle={styles.validate}>
          <>
            <Paragraph text="Error validating account." />
            <Button
              overrideStyle={styles.reValidateBtn}
              overrideLabelStyle={styles.reValidateLabel}
              label={'Re-validate'}
              onPress={onReferenceBlur}
            />
          </>
        </RowView>
      )}
      <InputText
        value={contactEmail || ''}
        onChange={handleTextChange}
        name={'contactEmail'}
        label="Email Address"
        inValid={errorObj.contactEmail}
        errorText="Enter Email"
        overrideNPInputWrapper={styles.inputStyle}
        placeholder="e.g email@mail.com"
        keyboardType='email-address'
        inputMode='email'
      />
      <View style={styles.electricityWrapper}>
        <InputText
          value={customerPhoneNumber || ''}
          onChange={handleTextChange}
          name={'customerPhoneNumber'}
          label="Phone"
          overrideNPInputWrapper={[styles.electricityInput, styles.inputStyle]}
          inValid={errorObj.customerPhoneNumber}
          errorText="Enter Phone"
          placeholder="e.g 07010101010"
          keyboardType='phone-pad'
          inputMode='tel'
        />
        <GenericDropdown
          overrideStyle={[styles.electricityInput, styles.inputStyle, { marginTop: 14}]}
          value={contactType || ''}
          onChange={handleTextChange}
          name={'contactType'}
          label="Contact Type"
          data={[
            {
              label: 'Landlord',
              value: 'Landlord',
            },
            {
              label: 'Tenant',
              value: 'Tenant',
            },
          ]}
          inValid={errorObj.contactType}
          error="Select type"
          dropDownDirection="TOP"
        />
      </View>
    </>
  );
};

export default Electricity;
