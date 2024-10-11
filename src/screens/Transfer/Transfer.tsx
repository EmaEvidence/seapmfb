import {AxiosResponse} from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View, FlatList, KeyboardAvoidingView, Platform, Text} from 'react-native';
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
  AccountSelector,
  RowView,
  ColumnView,
} from '../../common';
import InputText from '../../common/InputText';
import {Header1, Header2, Header3, Header4, Paragraph} from '../../common/Text';
import {useTransactionAuthType} from '../../hooks';
import toaster from '../../utils/toaster';
import {
  validateBeneficiaryData,
  validateNonBeneficiaryData,
} from '../../validator';
import styles from './Transfer.styles';
import NewRecipient from '../../assets/images/newReceipient.png';
import Success from '../../assets/images/success.png';
import { colors, fontSizes } from '../../utils/theme';
import { height, width } from '../../utils/constants';
import { formatAmount } from '../../utils/formatAmount';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../App';

const transferTypesArray = ['Local Transfer', 'Interbank Transfer'];
const targetTypes = ['Saved Beneficiary', 'New Beneficiary'];

export const Transfer = ({navigation, history}: any) => {
  const refRBSheet = useRef();
  const [transaction, setTransaction] = useState({});
  const [newRec, setNewRec] = useState(false);
  const transactType = useTransactionAuthType().type;
  const [bankFilterTerm, setBankFilterType] = useState('');
  const [amount, setAmount] = useState('');
  const {bankList, beneficiaries} = useAppSelector(state => state.account);
  const accountSummary = useAppSelector(state => state.account.accounts);
  const [step, setStep] = useState(0);
  const [accMap, setAccMap] = useState<Record<string, string>>({});
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [ownTransfer, setOwnTransfer] = useState(false);
  const [ownAccount, setOwnAccount] = useState<Record<string, string>>({});
  const initialState = {
    beneficiaryType: transferTypesArray[0],
    useBeneficiary: targetTypes[0],
    transferType: transferTypesArray[0],
    account: accounts[0],
    accountNumber: '',
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
    rAcctName: '',
    rAcctNumber: '',
    rBankName: '',
    rBankCode: '',
    debitAccountId: accMap[accounts[0]],
  }

  const [data, setData] = useState({
    ...initialState,
    accountBalance: '',
  });
  useFocusEffect(
    React.useCallback(() => {
      setData(prev => ({
        ...prev,
        ...initialState
      }));
      setStep(0);
      setAmount('')
    }, [])
  );
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
    getBeneficiaries(1);
    getBeneficiaries(2);
  }, []);

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
        account: accountSummary[0].accountNumber,
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
    if (label === 'rAcctNumber' && value.length === 10 ) {
      getBanks(value);
    }
    if (label === 'amount') {
      const formated = formatAmount(parseInt((value.replace(/,/g, '')) || '0'));
      setAmount(formated)
    } else {
      setData(prevState => ({
        ...prevState,
        [label]: value,
      }));
    }
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

  const transferSuccessCB = (data) => {
    setTransaction(data);
    refRBSheet.current.open();
    getSummary(false);
    getAccounts(false);
    getHistory(data.account, '', '', false);
    resetData();
  }

  const transferBeneficiary = async () => {
    const credential = handleGetCredential();
    if (!credential) {
      return;
    }
    const resp = (await makeBeneficiaryTransfer({
      amount,
      debitAccountId: data.debitAccountId,
      narration: data.narration,
      beneficiaryId: data.beneficiaryId,
      transaferType: data.rBankName.search(/seap/gi) > -1 ? 1 : 2,
      credential,
    })) as AxiosResponse<Record<string, any>>;
    if (resp.succeed) {
      transferSuccessCB(resp.data);
    }
  };

  const transferNonBeneficiary = async () => {
    const credential = handleGetCredential();
    if (!credential) {
      return;
    }
    const resp = (await makeNonBeneficiaryTransfer({
      amount,
      debitAccountId: data.debitAccountId,
      transaferType: data.rBankName.search(/seap/gi) > -1 ? 1 : 2,
      narration: data.narration,
      nameEnquiryReference: data.nameEnquiryReference,
      saveBeneficiary: !!data.saveBeneficiaryAs,
      saveBeneficiaryAs: data.saveBeneficiaryAs,
      credential,
    })) as AxiosResponse<Record<string, any>>;
    if (resp.succeed) {
      if (!!data.saveBeneficiaryAs) {
        getBeneficiaries(1);
        getBeneficiaries(2);
      }
      transferSuccessCB(resp.data);
    }
  };

  const resetData = () => {
    setData(initialState);
    setAmount('');
    setStep(0);
  }

  const handleOwnTransfer = async () => {
    const resp = await makeOwnTransfer({
      amount,
      debitAccountId: data.debitAccountId,
      narration: data.narration,
      destinationAccountId: ownAccount.id,
    });
    // @ts-ignore
    if (resp.succeed) {
      transferSuccessCB(resp.data);
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
          authName: 'transactionPin & otp',
        }));
      case '4':
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

  const handleSelectBank = async (itm) => {
    if (itm.bankCode !== 'seap') {
      const resp = await getAcctName({
        accountNumber: data.rAcctNumber,
        bankCode: itm.bankCode,
        fundTransferType: 2,
      })  as unknown as AxiosResponse<Record<string, any>>;
      if (resp.status === 200) {
        setData({
          ...data,
          rBankCode: itm.bankCode,
          rBankName: itm.name,
          rAcctName: resp.data.accountName,
          nameEnquiryReference: resp.data.referenceId,
          beneficiaryId: '',
        });
        setStep((prev) => prev + 1);
      } else {
        toaster('Error', "Error getting recipient's details", 'custom');
      }
    } else if (itm.bankCode === 'seap') {
      const isOwnAccount = accountSummary?.find(
        acctt => acctt.accountNumber === data.rAcctNumber,
      );
      setOwnTransfer(!!isOwnAccount);
      if (isOwnAccount) {
        setOwnAccount(isOwnAccount);
        setData({
          ...data,
          rBankName: 'SEAP MFB',
          rAcctName: isOwnAccount.accountName,
          beneficiaryId: '',
        });
      } else {
        setData({
          ...data,
          rBankName: 'SEAP MFB',
          rAcctName: '',
          beneficiaryId: '',
        });
      }
      setStep((prev) => prev + 1);
    }
  };

  const getAllBeneficiaries = () => {
    const oneBen = beneficiaries[1] || [];
    const twoBen = beneficiaries[2] || [];
    return [...oneBen, ...twoBen];
  }

  const onBenPress = (itm) => {
    setData((prev) => ({
      ...prev,
      beneficiaryId: itm.id,
      rAcctName: itm.name,
      rAcctNumber: itm.accountNumber,
      rBankName: itm.bankName,
      rBankCode: itm.bankCode
    }));
    setStep((prev) => prev + 1);
  }

  const handleAmtNext = () => {
    handleNext()
  }

  const filterHandler = (itm) => {
    const regex = new RegExp(data.receiver, 'gi')
    return itm.displayFormat.search(regex) >= 0 || itm.nickName.search(regex) >= 0
  }

  const handleGoBack = () => {
    if (step === 0) {
      navigation.navigate('Home');
      resetData();
    } else {
      handlePrev();
    }
  }

  const getFilterBanks = () => {
    if (bankFilterTerm.length === 0) return bankList;
    return bankList?.filter(item => {
      return item.name.toLowerCase().search(bankFilterTerm.toLowerCase()) >= 0
    });
  }

  function processBankLogo(name: string) {
    const words = name.split(' ');
    if (words.length >= 2) {
      return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else {
      return words[0].charAt(0).toUpperCase() + 'B';
    }
  }

  const transactOutOfRange = parseFloat(data.accountBalance) < parseFloat(amount.replace(/,/g, ''));
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
    >
      <View style={styles.wrapper}>
        <Header
          overrideGoBack={handleGoBack}
          showBackBtn
          title={''}
          navigation={navigation}
        />
        <Header1 text='Fund transfer' overrideStyle={{
          fontSize: fontSizes.bigHeader,
          fontWeight: '600',
          color: colors.sMainBlue,
          marginBottom: 10,
        }} />
        <View style={styles.paymentWrapper}>
          {step === 0 && (
            <ColumnView justify='isStart' overrideStyle={{
              width: '100%',
            }}>
              <AccountSelector
                handleTextChange={handleTextChange}
                inValid={userError.account}
                error="Please select an account"
                overrideContainerStyle={{
                  maxHeight: 55
                }}
                history={navigation.getState()}
              />
              <RowView justify='isBtw' align='isCenter' overrideStyle={{
                width: '100%'
              }}>
                <InputText
                  value={data.receiver}
                  onChange={(name: string, text: string) => {
                    handleTextChange(name, text);
                  }}
                  name={'receiver'}
                  label="Search beneficiaries"
                  placeholder="e.g 1010101010, Adedapo Hassan"
                  overrideNPInputWrapper={{
                    width: '50%'
                  }}
                  onFocus={() => setNewRec(false)}
                />
                <TouchableOpacity
                  onPress={() => setNewRec(true)}
                  style={[
                    styles.secCard,
                    {
                      width: '45%',
                      marginTop: 15,
                      height: 55,
                      borderWidth: 1,
                      borderColor: newRec ? colors.sYellow : 'transparent'
                    }
                  ]}>
                  <View style={[styles.icon, {
                    width: 30, height: 30
                  }]}>
                    <Image source={NewRecipient} style={[{ width: 15, height: 15}]} />
                  </View>
                  <View style={{
                    width: '90%'
                  }}>
                    <Paragraph overrideStyle={styles.acctName} text="New recipient" />
                  </View>
                </TouchableOpacity>
              </RowView>
              {
                !newRec ? (
                  <ColumnView justify='isStart'>
                    <Paragraph text="Beneficiaries" />
                    <View style={{height: height * 0.55}}>
                      {
                        getAllBeneficiaries().filter(filterHandler).length > 0 ? (
                          <FlatList
                            data={getAllBeneficiaries().filter(filterHandler) || []}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                key={item.bankCode}
                                onPress={() => onBenPress(item)}
                                style={[
                                  styles.secCard,
                                ]}>
                                <Header4 overrideStyle={styles.icon} text={(item.name || item.displayFormat).split(' ')[0][0]} />
                                <View style={{
                                  width: '90%'
                                }}>
                                  <Paragraph overrideStyle={styles.acctName} text={item.name || item.nickName} />
                                  <Paragraph overrideStyle={styles.acct} text={`${item.accountNumber} - ${item.bankName}`} />
                                </View>
                              </TouchableOpacity>
                            )}
                            showsHorizontalScrollIndicator={false}
                            style={styles.beneficiariesWrapper}
                          />
                          
                        ) : <Paragraph text="No beneficariy found." />
                      }
                    </View>
                  </ColumnView>
                ) : (
                  <View style={{height: height * 0.60}}>
                    <InputText
                      label='Enter account number'
                      value={data.rAcctNumber}
                      onChange={handleTextChange}
                      name={'rAcctNumber'}
                      keyboardType='numeric'
                      inputMode='numeric'
                      autoFocus
                    />
                    {
                      data.rAcctNumber.length === 10 && bankList ? (
                        <>
                          <Paragraph text="Select recipient's bank" />
                          <View style={{height: height * 0.05, marginVertical: 0}}>
                            <InputText
                              value={bankFilterTerm}
                              onChange={function (name: string, text: string): void {
                                setBankFilterType(text);
                              } }
                              name={''}
                              overrideNPInputWrapper={{
                                height: height * 0.04
                              }}
                              overrideNPInputStyle={{
                                height: height * 0.04
                              }}
                              placeholder='Seach banks'
                            />
                          </View>
                          <FlatList
                            data={[{"bankCode": "000", "name": "SEAP MFB"}, ...(getFilterBanks() || [])]}
                            renderItem={({item}) => (
                              <TouchableOpacity onPress={() => handleSelectBank(item)} key={item.name} style={styles.secCard}>
                                <Header4 text={processBankLogo(item.name)} overrideStyle={styles.icon} />
                                <Paragraph text={item.name} />
                              </TouchableOpacity>
                            )}
                            showsHorizontalScrollIndicator={false}
                          />
                        </>
                      ) : null
                    }
                  </View>
                )
              }
            </ColumnView>
          )}
          {step === 1 && (
            <ScrollView style={{ width: '100%'}}>
              <ColumnView justify='isBtw' overrideStyle={{
                width: '100%'
              }}>
                <View style={styles.fullWidth}>
                  <ColumnView justify='isCenter' overrideStyle={styles.receipientWrapper}>
                    <Paragraph text="Recipient" overrideStyle={styles.blueText} />
                    <View>
                      {data.rAcctName && <Header2 text={data.rAcctName} overrideStyle={styles.blueText} />}
                      <Paragraph text={`${data.rAcctNumber} - ${data.rBankName}`} overrideStyle={[styles.blueText, { marginTop: -5}]} />
                    </View>
                  </ColumnView>
                  <ColumnView justify='isCenter' align='isCenter' overrideStyle={styles.amountWrapper}>
                    <RowView overrideStyle={[styles.fullWidth, { paddingTop: 0}]} justify='isCenter' align='isCenter'>
                      <Paragraph text='₦' overrideStyle={[{ fontSize: fontSizes.bigHeader, width: 'auto', marginLeft: 0, marginTop: Platform.OS === 'ios' ? 0 : '1.5%'}, styles.blueText]} />
                      <InputText
                        value={amount}
                        onChange={handleTextChange}
                        name={'amount'}
                        placeholder='0'
                        overrideNPInputWrapper={styles.amtInputWrapper}
                        overrideNPInputStyle={styles.amtInput}
                        outlineColor='transparent'
                        activeOutlineColor='transparent'
                        inputMode='numeric'
                        keyboardType='numeric'
                        contentStyle={styles.amtText}
                        autoFocus
                      />
                    </RowView>
                    <Paragraph
                      text={`Bal: ₦ ${formatAmount(parseFloat(data.accountBalance))}`}
                      overrideStyle={[
                        styles.balanceText,
                        {
                          color: transactOutOfRange ? 'red' : colors.sMainBlue,
                          borderColor: transactOutOfRange ? 'red' : colors.sMainBlue,
                          backgroundColor: transactOutOfRange ? '#ffefef' : colors.sLightBlue,
                        }
                      ]}
                    />
                    <InputText
                      value={data.narration}
                      onChange={handleTextChange}
                      label='Remark'
                      name={'narration'}
                      placeholder='From Izuchi'
                      multiline
                      numberOfLines={4}
                      overrideNPInputWrapper={styles.remarkInput}
                      overrideNPInputStyle={styles.remarkInput}
                    />
                    {(!data.beneficiaryId && !ownTransfer) ? (
                      <InputText
                        value={data.saveBeneficiaryAs}
                        onChange={handleTextChange}
                        name={'saveBeneficiaryAs'}
                        label="Save recipient as"
                        placeholder="e.g Ade ade"
                      />
                    ) : <View />}
                  </ColumnView>
                </View>
                <View style={[styles.buttonWrapper, styles.row, {
                  // marginTop: 0,
                  // marginBottom: 10,
                  flexGrow: 1
                }]}>
                  <Button
                    overrideStyle={[styles.button, styles.halfBtn, styles.transparentBtn]}
                    label={'Prev'}
                    overrideLabelStyle={styles.transparentBtnLabel}
                    onPress={handlePrev}
                  />
                  <Button
                    overrideStyle={[styles.button, styles.halfBtn]}
                    label={'Continue'}
                    onPress={handleAmtNext}
                    disabled={transactOutOfRange || amount === '' || parseFloat(amount) <= 0}
                  />
                </View>
              </ColumnView>
            </ScrollView>
          )}
          {step === 2 && (
            <>
              <View style={styles.confirm}>
                <Header1
                  overrideStyle={styles.confirmText}
                  text={`You want to transfer ₦ ${amount} to ${data.rAcctName}, ${data.rAcctNumber}-${data.rBankName}. Enter your authentication details to continue.`}
                />
              </View>
              {!ownTransfer && (
                <View style={[{flex: 0.4}, styles.fullWidth]}>
                  <AuthTypeComponent handleAuthChange={handleTextChange} />
                </View>
              )}
            
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn, styles.transparentBtn]}
                  label={'Prev'}
                  overrideLabelStyle={styles.transparentBtnLabel}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Transfer'}
                  onPress={
                    ownTransfer
                      ? handleOwnTransfer
                      : data.beneficiaryId
                      ? transferBeneficiary
                      : transferNonBeneficiary
                  }
                />
              </View>
            </>
          )}
        </View>
        <RBSheet
          height={height * 0.4}
          // @ts-ignore
          ref={refRBSheet}
          customStyles={{
            wrapper: {
              backgroundColor: colors.sTransparentBlue,
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          closeOnPressBack
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}>
            <ColumnView justify='isBtw' align='isCenter' overrideStyle={{
              padding: 30,
            }}>
              <Image source={Success} style={{
                width: 60,
                height: 60,
                marginBottom: 20
              }} />
              <Header3 overrideStyle={styles.blueText} text={`Your fund transfer of ₦ ${amount} to ${data.rAcctName}, ${data.rAcctNumber}-${data.rBankName} is successful.`} />
              <RowView justify='isBtw' align='isCenter' overrideStyle={{
                marginTop: 20,
              }}>
                <Button
                  label={'Close'}
                  onPress={() => refRBSheet.current.close()}
                  overrideStyle={styles.transparentBtn}
                  overrideLabelStyle={styles.transparentBtnLabel}
                />
                <Button
                  label={'Receipt'}
                  onPress={function (): void {
                    refRBSheet.current.close();
                    navigation.navigate('Transaction', {transaction});
                  }}
                  overrideStyle={{
                    width: 'auto',
                    paddingHorizontal: 30,
                  }}
                />
              </RowView>
            </ColumnView>
            <Toast
              visibilityTime={10000}
              autoHide={false}
              onPress={() => Toast.hide()}
              // @ts-ignore
              config={toastConfig}
            />
        </RBSheet>
      </View>
    </KeyboardAvoidingView>
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
  const [data, setData] = useState({
    authName: '',
    otp: '',
    transactionPin: '',
    password: '',
    secret: '',
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
      <ColumnView justify="isCenter" align="isCenter" overrideStyle={{
        width: '100%',
      }}>
        <>
          <InputText
            value={data.otp}
            onChange={handleTextChange}
            name={'otp'}
            label="Enter OTP"
            placeholder="e.g 101010"
            overrideNPInputWrapper={styles.otpInputStyle}
            inputMode='numeric'
            keyboardType='numeric'
          />
          <Button
            label="Get OTP"
            onPress={handleGetOTP}
            overrideLabelStyle={styles.getOTPlabelStyle}
            overrideStyle={styles.getOTPBtn}
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
          authName: 'transactionPin & otp',
        }));
      case '4':
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
        return (
          <>
            {renderOTPComponent()}
            {renderPINComponent()}
          </>
        );
      case '4':
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
