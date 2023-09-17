import {AxiosResponse} from 'axios';
import React, {useEffect, useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  getAccounts,
  getAcctName,
  getBanks,
  getBeneficiaries,
  getHistory,
  getSummary,
  makeBeneficiaryTransfer,
  makeNonBeneficiaryTransfer,
  makeOwnTransfer,
} from '../../app/actions/account';
import {requestOTPCallAuth} from '../../app/actions/auth';
import {useAppSelector} from '../../app/hooks';
import {
  Header,
  Button,
  ButtonSwitch,
  AccountSelector,
  RowView,
  ColumnView,
} from '../../common';
import InputText, {Checkbox, GenericDropdown} from '../../common/InputText';
import {Header1, Paragraph} from '../../common/Text';
import {useTransactionAuthType} from '../../hooks';
import toaster from '../../utils/toaster';
import {
  validateBeneficiaryData,
  validateNonBeneficiaryData,
} from '../../validator';
import styles from './Transfer.styles';
import FingerPrintImg from '../../assets/images/fingerprint.png';

const transferTypesArray = ['Local Transfer', 'Interbank Transfer'];
const targetTypes = ['Saved Beneficiary', 'New Beneficiary'];

export const Transfer = ({navigation}: any) => {
  const transactType = useTransactionAuthType().type;
  const {bankList, beneficiaries} = useAppSelector(state => state.account);
  const accountSummary = useAppSelector(state => state.account.accounts);
  const [step, setStep] = useState(0);
  const [accMap, setAccMap] = useState<Record<string, string>>({});
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [ownTransfer, setOwnTransfer] = useState(false);
  const [ownAccount, setOwnAccount] = useState<Record<string, string>>({});
  const [data, setData] = useState({
    beneficiaryType: transferTypesArray[0],
    useBeneficiary: targetTypes[0],
    transferType: transferTypesArray[0],
    account: accounts[0],
    receiver: '',
    bankCode: '',
    bank: '',
    accountName: '',
    nameEnquiryReference: '',
    amount: '',
    narration: '',
    otp: '',
    password: '',
    biometricData: '',
    transactionPin: '',
    saveBeneficiaryAs: '',
    saveBeneficiary: '',
    beneficiaryId: '',
    secret: '',
    authName: '',
    debitAccountId: accMap[accounts[0]],
  });
  const [userError, setError] = useState<Record<string, boolean>>({
    transferType: false,
    account: false,
    userId: false,
    receiver: false,
    bankCode: false,
    bank: false,
    accountName: false,
    nameEnquiryReference: false,
    amount: false,
    narration: false,
    otp: false,
    password: false,
    biometricData: false,
    transactionPin: false,
    saveBeneficiaryAs: false,
    saveBeneficiary: false,
    beneficiaryId: false,
  });

  useEffect(() => {
    if (!bankList) {
      getBanks();
    }
  }, [bankList]);

  useEffect(() => {
    if (data.useBeneficiary === targetTypes[0]) {
      const index = transferTypesArray.indexOf(data.transferType);
      getBeneficiaries(index + 1);
    }
  }, [data.transferType, data.useBeneficiary]);

  useEffect(() => {
    if (accountSummary) {
      const mappedAcc: Record<string, string> = {};
      const acct = accountSummary.map(item => {
        mappedAcc[item.displayText] = item.id;
        return item.displayText;
      });
      setAccounts(acct);
      setAccMap(mappedAcc);
      setData(d => ({
        ...d,
        account: acct[0],
        debitAccountId: mappedAcc[acct[0]].toString(),
      }));
    }
  }, [accountSummary]);

  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    handleErrorChange(label, !value);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const transferTypeNum = transferTypesArray.indexOf(data.transferType) + 1;
  const selectedBeneficiaries = beneficiaries
    ? // @ts-ignore
      beneficiaries[transferTypeNum]
    : [];

  const getAccountName = async (acct: string, bankCode?: string) => {
    const isOwnAccount = accountSummary?.find(
      acctt => acctt.accountNumber === acct,
    );
    setOwnTransfer(!!isOwnAccount);
    if (isOwnAccount) {
      setOwnAccount(isOwnAccount);
      setData({
        ...data,
        accountName: isOwnAccount.accountName,
        // nameEnquiryReference: resp.data.referenceId,
      });
      return;
    }
    const resp = (await getAcctName({
      accountNumber: acct,
      // @ts-ignore
      bankCode: bankCode || null,
      fundTransferType: transferTypeNum,
    })) as unknown as AxiosResponse<Record<string, any>>;
    if (resp.status === 200) {
      setData({
        ...data,
        accountName: resp.data.accountName,
        nameEnquiryReference: resp.data.referenceId,
      });
    }
  };

  const handleSetError = (errorObj: Record<string, boolean>) => {
    setError({
      ...userError,
      ...errorObj,
    });
  };

  const handleNextBeneficiary = () => {
    const isValid = validateBeneficiaryData(data, handleSetError);
    if (selectedBeneficiaries.length === 0) {
      toaster('Error', 'No Beneficiary Selected', 'custom');
      return;
    }
    if (isValid) {
      handleNext();
    }
  };

  const handleNextNonBeneficiary = () => {
    const isValid = validateNonBeneficiaryData(data, handleSetError);
    if (isValid) {
      handleNext();
    }
  };

  const handleGetCredential = () => {
    let result: Record<string, string> = {};
    let valid = true;
    if (data.authName === 'password & otp') {
      result = {
        password: data.password,
        otp: data.otp,
      };
    } else if (data.authName === 'transactionPin & Otp') {
      result = {
        transactionPin: data.transactionPin,
        otp: data.otp,
      };
    } else {
      result = {
        // @ts-ignore
        [data.authName]: data[data.authName],
      };
    }
    const objArr = Object.entries(result);
    for (let a = 0; a < objArr.length; a++) {
      if (!objArr[a][1]) {
        toaster('Error', `Enter your ${objArr[a][0]} to continue!`, 'custom');
        valid = false;
      }
    }
    return !valid ? undefined : result;
  };

  const transferBeneficiary = async () => {
    const credential = handleGetCredential();
    if (!credential) {
      return;
    }
    const resp = (await makeBeneficiaryTransfer({
      amount: data.amount,
      debitAccountId: data.debitAccountId,
      narration: data.narration,
      beneficiaryId: data.beneficiaryId,
      transaferType: transferTypeNum,
      credential,
    })) as AxiosResponse<Record<string, any>>;
    if (resp.status === 200) {
      getSummary();
      getAccounts();
      getHistory(1);
      navigation.navigate('Transaction', {transaction: resp.data});
    }
  };

  const transferNonBeneficiary = async () => {
    const credential = handleGetCredential();
    if (!credential) {
      return;
    }
    const saveBeneficiary = data.saveBeneficiary === 'yes';
    const resp = (await makeNonBeneficiaryTransfer({
      amount: data.amount,
      debitAccountId: data.debitAccountId,
      transaferType: transferTypeNum,
      narration: data.narration,
      nameEnquiryReference: data.nameEnquiryReference,
      saveBeneficiary,
      saveBeneficiaryAs: data.saveBeneficiaryAs,
      credential,
    })) as AxiosResponse<Record<string, any>>;
    if (resp.status === 200) {
      if (saveBeneficiary) {
        getBeneficiaries(transferTypesArray.indexOf(data.transferType) + 1);
      }
      getSummary();
      getAccounts();
      getHistory(1);
      navigation.navigate('Transaction', {transaction: resp.data});
    }
  };

  const handleOwnTransfer = async () => {
    const resp = await makeOwnTransfer({
      amount: data.amount,
      debitAccountId: data.debitAccountId,
      narration: data.narration,
      destinationAccountId: ownAccount.id,
    });
    // @ts-ignore
    if (resp.status === 200) {
      // @ts-ignore
      navigation.navigate('Transaction', {transaction: resp.data});
    }
  };

  useEffect(() => {
    switch (transactType) {
      case '1':
        return setData(d => ({
          ...d,
          authName: 'transactionPin',
        }));
      case '2':
        return setData(d => ({
          ...d,
          authName: 'otp',
        }));
      case '3':
        return setData(d => ({
          ...d,
          authName: 'biometricData',
        }));
      case '4':
        return setData(d => ({
          ...d,
          authName: 'transactionPin & otp',
        }));
      case '5':
        return setData(d => ({
          ...d,
          authName: 'password',
        }));
      default:
        return setData(d => ({
          ...d,
          authName: 'password & otp',
        }));
    }
  }, [transactType]);

  const handleSelectBank = (name: string, text: string) => {
    const selectedBank = bankList?.find(bank => bank.bankCode === text);
    handleTextChange('bankCode', text);
    if (data.receiver.length === 10 && selectedBank) {
      handleTextChange('bank', selectedBank?.name);
      getAccountName(data.receiver, text);
    } else if (selectedBank && data.receiver.length !== 10) {
      toaster(
        'Error',
        'Ensure your supplied account number is 10 digits',
        'custom',
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        overrideGoBack={() => navigation.goBack()}
        showBackBtn
        title={'Transfer'}
        navigation={navigation}
      />
      {step === 0 && (
        <ButtonSwitch
          options={targetTypes}
          setSelected={(arg: string): void => {
            handleTextChange('useBeneficiary', arg);
            handleTextChange('accountName', '');
          }}
        />
      )}
      <ScrollView>
        <View style={styles.paymentWrapper}>
          {step === 0 && (
            <>
              <AccountSelector
                value={data.account}
                handleTextChange={handleTextChange}
                inValid={userError.account}
                error="Please select an account"
              />
              <GenericDropdown
                data={
                  transferTypesArray?.map(item => ({
                    value: item,
                    label: item,
                  })) || []
                }
                onChange={handleTextChange}
                label={'Select Transfer Type.'}
                name={'transferType'}
                value={data.transferType}
                inValid={false}
                error={''}
                overrideStyle={styles.pickerWrapper}
                overridePickerStyle={styles.pickerStyle}
                pickerItemStyle={styles.pickerItem}
                placeholder="Click to select Transfer Type"
                // dropDownDirection="TOP"
                listMode="MODAL"
                searchable
              />
              {data.useBeneficiary === targetTypes[0] ? (
                <>
                  {selectedBeneficiaries?.length > 0 ? (
                    <>
                      {selectedBeneficiaries && (
                        <GenericDropdown
                          label={'Select Beneficiary.'}
                          data={
                            selectedBeneficiaries?.map(
                              (beneficiary: {
                                displayFormat: string;
                                id: string;
                              }) => ({
                                label: beneficiary.displayFormat,
                                value: beneficiary.id,
                              }),
                            ) || []
                          }
                          overrideStyle={{}}
                          onChange={(name: string, val: string) => {
                            const bene = selectedBeneficiaries.find(
                              itm => itm.id === val,
                            );
                            handleTextChange(name, bene?.id);
                            handleTextChange(
                              'accountName',
                              bene?.displayFormat,
                            );
                            setError(prev => ({
                              ...prev,
                              beneficiaryId: false,
                            }));
                          }}
                          name={'beneficiaryId'}
                          value={data.beneficiaryId}
                          inValid={userError.beneficiaryId}
                          error="Select beneficiary"
                          listMode="MODAL"
                          placeholder='Enter Name to Search Beneficiary'
                          searchable
                        />
                      )}
                    </>
                  ) : (
                    <Paragraph text="No Beneficiary Found" />
                  )}
                </>
              ) : (
                <>
                  <InputText
                    value={data.receiver}
                    onChange={(name: string, text: string) => {
                      handleTextChange(name, text);
                      if (
                        data.transferType === transferTypesArray[0] &&
                        text.length === 10
                      ) {
                        getAccountName(text);
                      }
                    }}
                    name={'receiver'}
                    label="Enter Account Number"
                    inputType="number"
                    keyboardType="number-pad"
                    placeholder="e.g 1010101010"
                  />
                  {data.transferType !== transferTypesArray[0] && (
                    <GenericDropdown
                      // @ts-ignore
                      data={
                        bankList?.map(bank => ({
                          label: bank.name,
                          value: bank.bankCode,
                        })) || []
                      }
                      onChange={handleSelectBank}
                      label={'Select Bank Name'}
                      placeholder='Enter first letters of bank to Search'
                      name={'bank'}
                      value={data.bankCode}
                      inValid={false}
                      error={''}
                      overrideStyle={styles.pickerWrapper}
                      overridePickerStyle={styles.pickerStyle}
                      pickerItemStyle={styles.pickerItem}
                      searchable
                      listMode="MODAL"
                    />
                  )}
                  <InputText
                    value={data.accountName}
                    onChange={(_name: string, _text: string) => {}}
                    name={''}
                    readonly
                    label="Account Name"
                    editable={false}
                  />
                </>
              )}
              <InputText
                value={data.amount}
                onChange={handleTextChange}
                name="amount"
                label="Enter Amount"
                keyboardType="numeric"
                inValid={userError.amount}
                errorText="Enter amount"
                inputType="number"
                placeholder="e.g 1000"
              />
              <InputText
                value={data.narration}
                onChange={handleTextChange}
                name="narration"
                label="Narration"
                errorText="Enter Narration to continue!"
                inValid={userError.narration}
                overrideStyle={styles.textInputStyle}
                placeholder="e.g A Gift from me"
              />
              <View style={[styles.buttonWrapper]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Next'}
                  onPress={
                    data.useBeneficiary === targetTypes[0]
                      ? handleNextBeneficiary
                      : handleNextNonBeneficiary
                  }
                />
              </View>
            </>
          )}
          {step === 1 && (
            <>
              <View style={styles.confirm}>
                <Header1
                  overrideStyle={styles.confirmText}
                  text={`You want to transfer NGN ${data.amount} to ${data.accountName} enter your authentication details to continue.`}
                />
              </View>
              {!ownTransfer && (
                <AuthTypeComponent handleAuthChange={handleTextChange} />
              )}
              {data.useBeneficiary === targetTypes[1] && !ownTransfer && (
                <>
                  <Checkbox
                    label="Save as Beneficiary"
                    value={data.saveBeneficiary}
                    onChange={handleTextChange}
                    name={'saveBeneficiary'}
                  />
                  {data.saveBeneficiary === 'yes' && (
                    <InputText
                      value={data.saveBeneficiaryAs}
                      onChange={handleTextChange}
                      name={'saveBeneficiaryAs'}
                      label="Beneficiary Alias"
                      placeholder="e.g Ade ade"
                    />
                  )}
                </>
              )}
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Prev'}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Transfer'}
                  onPress={
                    ownTransfer
                      ? handleOwnTransfer
                      : data.useBeneficiary === targetTypes[0]
                      ? transferBeneficiary
                      : transferNonBeneficiary
                  }
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Transfer;

export const AuthTypeComponent = ({
  handleAuthChange,
}: {
  handleAuthChange: (label: string, value: string) => void;
}) => {
  let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  let payload = epochTimeSeconds + 'mfbseapmfb';
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const [data, setData] = useState({
    authName: '',
    otp: '',
    transactionPin: '',
    password: '',
    secret: '',
    biometricData: '',
  });

  const [_, setError] = useState({
    authName: false,
    otp: false,
    transactionPin: false,
    password: false,
    secret: false,
  });
  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    handleAuthChange(label, value);
    handleErrorChange(label, !value);
  };

  const handleGetOTP = async () => {
    // const accountNumber = (await loadItem('acctNo')) as string;
    const resp = (await requestOTPCallAuth()) as AxiosResponse;
    if (resp.status === 200) {
      toaster('Success', 'OTP sent to your Phone', 'custom');
    }
  };

  const renderOTPComponent = () => {
    return (
      <RowView justify="isBtw" align="isEnd">
        <>
          <InputText
            value={data.otp}
            onChange={handleTextChange}
            name={'otp'}
            label="Enter OTP"
            placeholder="e.g 101010"
            overrideStyle={styles.otpInputStyle}
          />
          <Button
            label="Get OTP"
            onPress={handleGetOTP}
            overrideLabelStyle={styles.getOTPlabelStyle}
            overrideStyle={styles.getOTPBtn}
          />
        </>
      </RowView>
    );
  };

  const handleBiometric = async () => {
    rnBiometrics.biometricKeysExist().then(async resultObject => {
      const result = resultObject;

      if (result.keysExist) {
        handleGenerateSignature();
      } else {
        const resp = await handleCreateKeys();
        if (resp) {
          handleGenerateSignature();
        }
      }
    });
  };

  const handleCreateKeys = () => {
    return rnBiometrics.createKeys().then(resultObject => {
      const {publicKey} = resultObject;
      return publicKey;
    });
  };

  const handleGenerateSignature = () => {
    rnBiometrics
      .createSignature({
        promptMessage: 'Biometric Authentication',
        payload,
      })
      .then(async resultObject => {
        const {success, signature} = resultObject;
        if (success && signature) {
          // biometricData: signature,
          handleTextChange('biometricData', signature);
        } else {
          toaster('Error', 'Error getting Biometric Authentication', 'custom');
        }
      })
      .catch(error => {
        toaster('Error', 'Error getting Biometric Authentication', 'custom');
      });
  };

  const renderBiometricComponent = () => {
    return (
      <ColumnView align="isCenter" justify={'isCenter'}>
        <>
          <TouchableOpacity
            style={styles.fingerWrapper}
            onPress={handleBiometric}>
            <Image source={FingerPrintImg} style={styles.fingerImg} />
          </TouchableOpacity>
          <Paragraph
            overrideStyle={styles.fingerPrintText}
            text="Press the finger print icon to begin."
          />
        </>
      </ColumnView>
    );
  };

  const renderPINComponent = () => {
    return (
      <>
        <InputText
          obsureText
          value={data.transactionPin}
          onChange={handleTextChange}
          name={'transactionPin'}
          label="Enter Transaction Pin"
        />
      </>
    );
  };
  const transactType = useTransactionAuthType().type;

  useEffect(() => {
    if (data.authName) {
      handleAuthChange('authName', data.authName);
    }
  }, [data.authName]);

  useEffect(() => {
    switch (transactType) {
      case '1':
        return setData(d => ({
          ...d,
          authName: 'transactionPin',
        }));
      case '2':
        return setData(d => ({
          ...d,
          authName: 'otp',
        }));
      case '3':
        return setData(d => ({
          ...d,
          authName: 'biometricData',
        }));
      case '4':
        return setData(d => ({
          ...d,
          authName: 'transactionPin & otp',
        }));
      case '5':
        return setData(d => ({
          ...d,
          authName: 'password',
        }));
      default:
        return setData(d => ({
          ...d,
          authName: 'password & otp',
        }));
    }
  }, [transactType]);

  const getAuthorizationType = () => {
    //  ["PIN", "OTP", "Biometric", "Pin and OTP", "Transaction Password"]
    switch (transactType) {
      case '1':
        return renderPINComponent();
      case '2':
        return renderOTPComponent();
      case '3':
        return renderBiometricComponent();
      case '4':
        return (
          <>
            {renderOTPComponent()}
            {renderPINComponent()}
          </>
        );
      case '5':
        return (
          <InputText
            value={data.password}
            onChange={handleTextChange}
            name={'password'}
            obsureText
            label="Enter Transaction Password"
          />
        );
      default:
        return (
          <>
            {renderOTPComponent()}
            <InputText
              value={data.password}
              onChange={handleTextChange}
              name="password"
              label="Enter Account Password"
              obsureText
            />
          </>
        );
    }
  };
  return getAuthorizationType();
};
