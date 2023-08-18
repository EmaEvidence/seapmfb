import React from 'react';
import InputText from '../../common/InputText';

export const Airtime = ({
  amount,
  customerReference,
  handleTextChange,
  onReferenceBlur,
  errorObj,
}: {
  amount: string;
  customerReference: string;
  onReferenceBlur: () => void;
  handleTextChange: (val: string, name: string) => void;
  errorObj: Record<string, boolean>;
}) => {
  return (
    <>
      <InputText
        value={customerReference}
        onChange={handleTextChange}
        name={'customerReference'}
        label="Enter Phone"
        onBlur={onReferenceBlur}
        inValid={errorObj.customerReference}
        errorText={'Enter a valid Phone Number'}
        placeholder="e.g 07010101010"
      />
      <InputText
        value={amount}
        onChange={handleTextChange}
        name={'amount'}
        label="Enter Amount"
        inValid={errorObj.amount}
        errorText={'Enter an amount'}
        placeholder="e.g 1000"
      />
    </>
  );
};

export default Airtime;
