import React from 'react';
import InputText from '../../common/InputText';

export const Sports = ({
  amount,
  customerReference,
  handleTextChange,
  onReferenceBlur,
  errorObj,
  provider,
  biller,
}: {
  amount: string;
  customerReference: string;
  onReferenceBlur: () => void;
  handleTextChange: (val: string, name: string) => void;
  errorObj: Record<string, boolean>;
  provider: string;
  biller: string;
}) => {
  return (
    <>
      <InputText
        value={customerReference}
        onChange={handleTextChange}
        name={'customerReference'}
        label={`${biller} Id`}
        onBlur={onReferenceBlur}
        inValid={errorObj.customerReference}
        errorText={'Enter a valid Id'}
        placeholder="e.g 70101"
        keyboardType='numeric'
        inputMode='numeric'
        autoFocus
      />
      <InputText
        value={amount}
        onChange={handleTextChange}
        name={'amount'}
        label="Enter Amount"
        inValid={errorObj.amount}
        errorText={'Enter an amount'}
        placeholder="e.g 1000"
        keyboardType='numeric'
        inputMode='numeric'
        returnKeyType='done'
      />
    </>
  );
};

export default Sports;
