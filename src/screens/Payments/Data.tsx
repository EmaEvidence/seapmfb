import React, {useEffect} from 'react';
import InputText, {GenericDropdown} from '../../common/InputText';
import styles from './Payments.styles';
import {useAppSelector} from '../../app/hooks';
import {getBillerServiceBundles} from '../../app/actions/payments';
import {Paragraph} from '../../common/Text';

export const Data = ({
  customerReference,
  handleTextChange,
  onReferenceBlur,
  errorObj,
  bundle,
  billerId
}: {
  amount: string;
  customerReference: string;
  onReferenceBlur: () => void;
  handleTextChange: (val: string, name: string) => void;
  bundle?: string;
  provider?: string;
  networkOperator?: string;
  errorObj: Record<string, boolean>;
  billerId: string;
}) => {
  // const [selectedBundle, setSelectedBundle] = useState<Record<string, string>>(
  //   {},
  // );
  const {dataBundles} = useAppSelector(state => state.payment);
  const selectedBundles = billerId ? dataBundles[billerId] : null;

  useEffect(() => {
    if (billerId && !dataBundles[billerId]) {
      getBillerServiceBundles(billerId);
    }
  }, [dataBundles, billerId]);

  if (!selectedBundles) {
    return null;
  }

  if (selectedBundles.length === 0) {
    return <Paragraph text="No Bundle found for this networkOperator!" />;
  }

  const handleSelectBundle = (label: string, val: string) => {
    const selected = selectedBundles.find(
      bundleItem => bundleItem.dataplaN_DESC === val,
    );
    if (selected) {
      handleTextChange('amount', selected.amount);
      handleTextChange('bundle', val);
    } else {
      handleTextChange('amount', '');
      handleTextChange('bundle', '');
    }
  };

  return (
    <>
      <GenericDropdown
        overrideStyle={styles.pickerStyle}
        onChange={handleSelectBundle}
        label={'Select a Data bundle.'}
        data={[
          ...selectedBundles.map(bundleItem => ({
            label: bundleItem.dataplaN_DESC,
            value: bundleItem.dataplaN_DESC,
          })),
        ]}
        name={'amount'}
        value={bundle || ''}
        inValid={errorObj.amount}
        error={'Select a bundle'}
        searchable
        listMode="MODAL"
      />
      <InputText
        value={customerReference}
        onChange={handleTextChange}
        name={'customerReference'}
        label="Enter Phone Number"
        onBlur={onReferenceBlur}
        inValid={errorObj.customerReference}
        errorText={'Enter a valid Phone Number'}
        placeholder="e.g 07010101010"
        keyboardType='numeric'
        inputMode='tel'
        returnKeyType='done'
      />
    </>
  );
};

export default Data;
