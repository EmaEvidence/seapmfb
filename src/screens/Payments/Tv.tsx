import React, {useEffect, useState} from 'react';
import {Button, RowView} from '../../common';
import InputText, {GenericDropdown} from '../../common/InputText';
import styles from './Payments.styles';
import {
  getBillerPackageAddOn,
  getBillerPackages,
} from '../../app/actions/payments';
import {useAppSelector} from '../../app/hooks';
import {Paragraph} from '../../common/Text';

export const TV = ({
  customerReference,
  handleTextChange,
  onReferenceBlur,
  name,
  provider,
  packageId,
  selectedAddOn,
  packageSelected,
  errorObj,
}: {
  customerReference: string;
  onReferenceBlur: () => void;
  handleTextChange: (val: string, name: string) => void;
  name: string;
  provider?: string;
  packageId?: string;
  packageSelected?: string;
  selectedAddOn?: string;
  errorObj: Record<string, boolean>;
}) => {
  const [selectedPackage, setPackge] = useState(packageSelected || '');
  const [selectedAdd, selectAddOn] = useState(selectedAddOn || '');
  const {packages, addOns} = useAppSelector(state => state.payment);
  const selectedPackages = provider ? packages[provider] : null;
  const selectedAddOns = packageId ? addOns[packageId] : null;

  useEffect(() => {
    if (provider && !selectedPackages) {
      getBillerPackages(provider);
    }
  }, [selectedPackages, provider]);

  useEffect(() => {
    if (packageId && !selectedAddOns && provider) {
      getBillerPackageAddOn(provider, packageId);
    }
  }, [packageId, selectedAddOns, provider]);

  if (selectedPackages?.length === 0 || selectedPackages === null) {
    return (
      <Paragraph overrideStyle={styles.noPackage} text="No Package Found!" />
    );
  }

  return (
    <>
      {selectedPackages && (
        <GenericDropdown
          overrideStyle={styles.pickerStyle}
          onChange={(label: string, val: string) => {
            const packge = selectedPackages.find(
              item => item.displayText === val,
            );
            if (packge) {
              handleTextChange('amount', packge?.price);
              handleTextChange('packageId', packge?.packageId);
              handleTextChange('packageSelected', val);
              // setPackgePrice(parseInt(packge?.price, 10));
              setPackge(val);
              selectAddOn('');
            }
          }}
          label={'Select a Package.'}
          data={[
            ...selectedPackages.map((item: any) => ({
              label: item.displayText,
              value: item.displayText,
            })),
          ]}
          name={'amount'}
          value={selectedPackage}
          inValid={errorObj.amount}
          error={'Select a package'}
          listMode="MODAL"
          searchable
        />
      )}
      {selectedAddOns && selectedAddOns.length > 0 && (
        <GenericDropdown
          overrideStyle={styles.pickerStyle}
          onChange={(label: string, val: string) => {
            const packge = selectedAddOns.find(
              item => item.displayText === val,
            );
            const packgeItem = selectedPackages.find(
              item => item.displayText === selectedPackage,
            );
            if (packge) {
              handleTextChange(
                'amount',
                packge?.price + (packgeItem?.price || 0),
              );
              handleTextChange('addOnId', packge?.packageId);
              handleTextChange('selectedAddOn', val);
              selectAddOn(val);
            }
          }}
          label={'Select an Addon'}
          data={[
            ...selectedAddOns.map((item: any) => ({
              label: item.displayText,
              value: item.displayText,
            })),
          ]}
          name={'amount'}
          value={selectedAdd || ''}
          inValid={false}
          error={''}
          listMode="MODAL"
          searchable
        />
      )}
      <InputText
        value={customerReference}
        onChange={(label: string, val: string) => {
          handleTextChange(label, val);
          if (val.length === 11 || val.length === 10) {
            onReferenceBlur();
          }
        }}
        name={'customerReference'}
        label="Smart Card Number"
        inValid={errorObj.customerReference}
        errorText={'Enter smart card number'}
        placeholder="e.g 10101010101"
        overrideStyle={styles.tvInput}
        keyboardType='numeric'
        inputMode='numeric'
        returnKeyType='done'
      />
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
    </>
  );
};

export default TV;
