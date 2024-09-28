import React, {Key, useEffect, useState} from 'react';
import {TouchableOpacity, View, Image, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {
  AccountSelector,
  Button,
  ColumnView,
  RowView,
} from '../../common';
import styles from './Payments.styles';
import {Header1, Header3, Header5, Paragraph} from '../../common/Text';
import {useAppSelector} from '../../app/hooks';
import {
  getCategories,
  getBillers,
  getBillerDetails,
  getBillerServiceCharge,
  validateService,
  billPayment,
} from '../../app/actions/payments';
import TV from './Tv';
import Airtime from './Airtime';
import Data from './Data';
import Electricity from './Electricity';
import PowerIcon from '../../assets/images/power.png';
import DataIcon from '../../assets/images/data.png';
import AirtimeIcon from '../../assets/images/airtime.png';
import Ninemobile from '../../assets/images/9mobile.png';
import MtnIcon from '../../assets/images/mtn.png';
import GloIcon from '../../assets/images/glo.png';
import AirtelIcon from '../../assets/images/airtel.png';
import DstvIcon from '../../assets/images/dstvv.png';
import GotvIcon from '../../assets/images/gotv.png';
import StartimesIcon from '../../assets/images/startimes.png';
import EkoIcon from '../../assets/images/eko.png';
import IbadanIcon from '../../assets/images/ibadan.png';
import IkejaIcon from '../../assets/images/ike.png';
import TVIcon from '../../assets/images/tv.png';
import {AxiosResponse} from 'axios';
import {AuthTypeComponent} from '../Transfer';
import toaster from '../../utils/toaster';
import {
  validateEmail,
  validateNonEmpty,
  validateAmount,
  validatePhone,
  validatePostPaid,
  validatePrePaid,
  validateSmartCard,
} from '../../validator';
import {getSummary, getAccounts, getHistory} from '../../app/actions/account';
import { fontSizes, colors } from '../../utils/theme';
import generalStyles from '../../index.styles';
import { height } from '../../utils/constants';
import Sports from './Sports';
import { useFocusEffect } from '@react-navigation/native';

const initialUserData = {
  category: '',
  selectedCategoryId: '',
  biller: '',
  serviceId: '',
  billerDetail: {},
  account: '',
  amount: '',
  customerReference: '',
  name: '',
  commission: '',
  vatRate: '',
  contactEmail: '',
  addOns: '',
  selectedPackage: '',
  credential: {},
  contactType: '',
  customerPhoneNumber: '',
  networkOperator: '',
  bundle: '',
  authName: '',
  transactionPin: '',
  biometricData: '',
  otp: '',
  secret: '',
  password: '',
  packageId: '',
  selectedAddOn: '',
  packageSelected: '',
  addOnId: '',
  billerId: '',
};

const initialError = {
  account: false,
  amount: false,
  customerReference: false,
  name: false,
  contactEmail: false,
  addOns: false,
  selectedPackage: false,
  contactType: false,
  customerPhoneNumber: false,
  networkOperator: false,
  bundle: false,
};

export const Payments = ({navigation}: {navigation: any}) => {
  const {categories, categoryBillers, billerDetails, serviceFeeObj} =
    useAppSelector(state => state.payment);
  const [step, setStep] = useState(0);
  const [paymentData, setPaymentData] = useState({
    ...initialUserData,
  });

  const [paymentError, setPaymentError] = useState<Record<string, boolean>>({
    ...initialError
  });

  useFocusEffect(
    React.useCallback(() => {
      setPaymentData({
        ...initialUserData
      });
      setPaymentError({
        ...initialError
      });
      setStep(0);
    }, [])
  );

  const handleSetPaymentError = (label: string, val: boolean) => {
    setPaymentError(prevState => ({
      ...prevState,
      [label]: val,
    }));
  };

  const billers = categoryBillers[paymentData.selectedCategoryId];
  const billerDetail = billerDetails[paymentData.serviceId];
  const serviceFee = serviceFeeObj[paymentData.serviceId];

  const handleGetCredential = () => {
    let result: Record<string, string> = {};
    let valid = true;
    const payAuthType = paymentData.authName;
    if (payAuthType === 'password & otp') {
      result = {
        password: paymentData.password,
        otp: paymentData.otp,
      };
    } else if (payAuthType === 'transactionPin & Otp') {
      result = {
        transactionPin: paymentData.transactionPin,
        otp: paymentData.otp,
      };
    } else {
      result = {
        // @ts-ignore
        [payAuthType]: paymentData[payAuthType],
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

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, [categories]);

  useEffect(() => {
    if (paymentData.category) {
      const selectCategory = categories?.find(
        category => category.name === paymentData.category,
      );
      if (selectCategory?.id) {
        if (!billers) {
          getBillers(selectCategory.id);
        }
        setPaymentData(prevState => ({
          ...prevState,
          biller: '',
          selectedCategoryId: selectCategory.id,
        }));
      } else {
        setPaymentData(prevState => ({
          ...prevState,
          biller: '',
          selectedCategoryId: '',
        }));
      }
    } else {
      setPaymentData(prevState => ({
        ...prevState,
        biller: '',
        selectedCategoryId: '',
      }));
    }
  }, [paymentData.category, categories, billers]);

  useEffect(() => {
    if (paymentData.biller) {
      const selectedService = billers?.find(
        category => category.name === paymentData.biller,
      );
      if (selectedService) {
        if (!billerDetail) {
          getBillerDetails(selectedService.serviceId);
        }
        if (!serviceFee) {
          getBillerServiceCharge(selectedService.serviceId);
        }
      }
      setPaymentData(prevState => ({
        ...prevState,
        // @ts-ignore
        serviceId: selectedService.serviceId,
        networkOperator: selectedService?.name || '',
        customerReference: '',
        amount: '',
      }));
      setPaymentError({
        account: false,
        amount: false,
        customerReference: false,
        name: false,
        contactEmail: false,
        addOns: false,
        selectedPackage: false,
        contactType: false,
        customerPhoneNumber: false,
        networkOperator: false,
        bundle: false,
      });
    }
    if (serviceFee) {
      setPaymentData(prevState => ({
        ...prevState,
        commission: serviceFee.commission,
        vatRate: serviceFee.vatRate,
      }));
    }
  }, [paymentData.biller, billerDetail, billers, serviceFee]);

  useEffect(() => {
    return () => {
      setPaymentData({
        ...initialUserData,
      });
    };
  }, []);

  const validateMeter = (value: string) => {
    return paymentData.biller.split(' ')[2] === 'Prepaid'
     ? validatePrePaid(value)
     : validatePostPaid(value);
  }

  const customerReferenceValidator: Record<number, any> = {
    1: validateMeter,
    2: validateSmartCard,
    3: validatePhone,
    4: validateNonEmpty,
  }

  const labelWithValidatorMap: Record<string, any> = {
    amount: validateAmount,
    packageId: validateNonEmpty,
    packageSelected: validateNonEmpty,
    addOnId: validateNonEmpty,
    selectedAddOn: validateNonEmpty,
    customerReference: customerReferenceValidator[parseInt(paymentData.selectedCategoryId, 10)],
    contactEmail: validateEmail,
    customerPhoneNumber: validatePhone,
    contactType: validateNonEmpty
  }

  const handleTextChange = (label: string, value: string) => {
    setPaymentData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    paymentError[label] && handleSetPaymentError(label, !!value);
    if (label === 'category' && value) {
      setStep(1);
      const newIntValue: Partial<typeof initialUserData> = {...initialUserData};
      delete newIntValue.category;
      delete newIntValue.selectedCategoryId;
      setPaymentData(prev => ({
        ...prev,
        ...newIntValue,
      }))
    }
    if (labelWithValidatorMap[label]) {
      setPaymentError(prev => (
        {
          ...prev,
          [label]: !labelWithValidatorMap[label](value)
        }
      ))
    }
  };

  const handleValidate = async () => {
    if (
      // @ts-ignore
      paymentData.selectedCategoryId == 2 ||
      // @ts-ignore
      paymentData.selectedCategoryId == 1
    ) {
      const resp = (await validateService({
        serviceProviderId: paymentData.serviceId,
        customerReference: paymentData.customerReference,
      })) as AxiosResponse;
      if (resp.status !== 200) {
        setPaymentError(prevState => ({
          ...prevState,
          name: true,
        }));
      } else {
        setPaymentData(prev => ({
          ...prev,
          name: resp.data.message,
        }));
        setPaymentError(prevState => ({
          ...prevState,
          name: false,
          customerReference: false
        }));
      }
    }
  };

  const handleContinue = () => {
    const isBillerValid = getValidator();
    if (isBillerValid) {
      setStep(3);
    }
  };

  const switchComponent = () => {
    let Comp = null;
    switch (parseInt(paymentData.selectedCategoryId, 10)) {
      case 2:
        Comp = TV;
        break;
      case 3:
        paymentData.biller.search(/data/gi)
        Comp = paymentData.biller.search(/data/gi) >= 0 ? Data : Airtime;
        break;
      case 4:
        Comp = Sports;
        break;
      case 1:
        Comp = Electricity;
        break;
    }
    if (Comp) {
      return (
        <Comp
          amount={paymentData.amount}
          customerReference={paymentData.customerReference}
          onReferenceBlur={handleValidate}
          handleTextChange={handleTextChange}
          name={paymentData.name}
          provider={paymentData.serviceId}
          contactEmail={paymentData.contactEmail}
          contactType={paymentData.contactType}
          customerPhoneNumber={paymentData.customerPhoneNumber}
          networkOperator={paymentData.networkOperator}
          billerId={paymentData.billerId}
          biller={paymentData.biller}
          errorObj={paymentError}
          bundle={paymentData.bundle}
          packageId={paymentData.packageId}
          selectedAddOn={paymentData.selectedAddOn}
          packageSelected={paymentData.packageSelected}
        />
      );
    }
    return Comp;
  };

  const validateElecticity = () => {
    const isMeterValid =
      paymentData.biller.split(' ')[2] === 'Prepaid'
        ? validatePrePaid(paymentData.customerReference)
        : validatePostPaid(paymentData.customerReference);
    const isAmountValid = validateAmount(paymentData.amount);
    const isEmailValid = validateEmail(paymentData.contactEmail);
    const isPhoneValid = validatePhone(paymentData.customerPhoneNumber);
    const isContactTypeValid = validateNonEmpty(paymentData.contactType);
    const isNameValid = validateNonEmpty(paymentData.name);
    setPaymentError(prevState => ({
      ...prevState,
      amount: !isAmountValid,
      customerReference: !isMeterValid,
      name: !isNameValid,
      contactEmail: !isEmailValid,
      contactType: !isContactTypeValid,
      customerPhoneNumber: !isPhoneValid,
    }));
    return (
      isMeterValid &&
      isAmountValid &&
      isEmailValid &&
      isPhoneValid &&
      isContactTypeValid &&
      isNameValid
    );
  };

  const validateSport = () => {
    const isIdValid = validateNonEmpty(paymentData.customerReference);
    const isAmountValid = validateAmount(paymentData.amount);
    setPaymentError(prevState => ({
      ...prevState,
      amount: !isAmountValid,
      customerReference: !isIdValid,
    }));
    return isAmountValid && isIdValid;
  };

  const validateTV = () => {
    const isSmartNoValid = validateSmartCard(paymentData.customerReference);
    const isAmountValid = validateAmount(paymentData.amount);
    const isPackageValid = validateNonEmpty(paymentData.packageId);
    const isNameValid = validateNonEmpty(paymentData.name);
    setPaymentError(prevState => ({
      ...prevState,
      amount: !isAmountValid,
      customerReference: !isSmartNoValid,
      name: !isNameValid,
    }));
    return isSmartNoValid && isAmountValid && isNameValid && isPackageValid;
  };

  const validateAirtime = () => {
    const isPhoneValid = validatePhone(paymentData.customerReference);
    const isAmountValid = validateAmount(paymentData.amount);
    setPaymentError(prevState => ({
      ...prevState,
      amount: !isAmountValid,
      customerReference: !isPhoneValid,
    }));
    return isPhoneValid && isAmountValid;
  };

  const getValidator = () => {
    switch (parseInt(paymentData.selectedCategoryId, 10)) {
      case 2:
        return validateTV();
      case 3:
        return validateAirtime();
      case 4:
        return validateSport();
      case 1:
        return validateElecticity();
    }
  };

  const handleConfirm = async () => {
    const credential = handleGetCredential();
    if (!credential) {
      return;
    }
    let basePayload: Record<string, any> = {
      customerReference: paymentData.customerReference,
      amount: paymentData.amount,
      sourceAccount: paymentData.account.split(' - ')[0],
      invoicePeriod: 1,
      credential,
      serviceId: paymentData.serviceId,
    };
    switch (parseInt(paymentData.selectedCategoryId, 10)) {
      case 2:
        basePayload = {
          ...basePayload,
          contactEmail: paymentData.contactEmail,
          package: paymentData.packageId,
          addOns: paymentData.addOnId,
          customerPhoneNumber: paymentData.customerPhoneNumber,
        };
        break;
      case 3 || 4:
        basePayload = {
          ...basePayload,
          networkOperator: paymentData.networkOperator,
          customerPhoneNumber: paymentData.customerReference,
        };
        break;
      case 1:
        basePayload = {
          ...basePayload,
          contactType: paymentData.contactType,
          customerPhoneNumber: paymentData.customerPhoneNumber,
          contactEmail: paymentData.contactEmail,
        };
        break;
    }
    const resp = (await billPayment(basePayload)) as AxiosResponse;
    if (resp.status === 200) {
      setPaymentData({
        ...initialUserData,
      });
      getSummary(false);
      getAccounts(false);
      getHistory(paymentData.account, '', '', false);
      toaster(
        'Success',
        'Your Bill payment has being registered successfully',
        'custom',
      );
      setStep(0);
    }
  };

  const handleNext = () => {
    const acctValid = validateNonEmpty(paymentData.account);
    const catValid = validateNonEmpty(paymentData.category);
    const billerValid = validateNonEmpty(paymentData.biller);
    if (acctValid && catValid && billerValid) {
      setStep(1);
      return;
    }
    setPaymentError(prevState => ({
      ...prevState,
      account: !acctValid,
      category: !catValid,
      biller: !billerValid,
    }));
    return;
  };


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"} >
      <View style={styles.containerScroll}>
        <View style={styles.wrapper}>
          {/* <Header title={'Bills Payments'} navigation={navigation} /> */}
          <Header1 text='Bills Payments' overrideStyle={{
            fontSize: fontSizes.bigHeader,
            fontWeight: '600',
            color: colors.sMainBlue,
            marginTop: 30
          }} />
          <View style={styles.subheader} />
          {step === 0 && (
            <View style={styles.paymentWrapper}>
              {!categories ? (
                <Paragraph
                  overrideStyle={styles.notFound}
                  text="Loading bills categories..."
                />
              ) : categories.length === 0 ? (
                <Paragraph
                  overrideStyle={styles.notFound}
                  text="No category found or Error loading bills cateogories."
                />
              ) : (
                <View style={styles.pickerWrapper}>
                  <View>
                    <Header5
                      text="Select bills category."
                      overrideStyle={styles.chipLabel}
                    />
                    <RowView
                      justify="isStart"
                      align="isCenter"
                      overrideStyle={styles.chipWrapper}>
                      <>
                        {categories.map(item => (
                          <CategoryChip
                            key={item.name}
                            item={item}
                            handleTextChange={handleTextChange}
                            selectedCategory={paymentData.category}
                          />
                        ))}
                      </>
                    </RowView>
                  </View>
                </View>
              )}
            </View>
          )}
          {step === 1 && (
            <View style={styles.paymentWrapper}>
              {billers && billers.length > 0 ? (
                <View>
                  <AccountSelector
                    value={paymentData.account}
                    handleTextChange={handleTextChange}
                    overrideContainerStyle={styles.acctSelector}
                    inValid={paymentError.account}
                    error="Please select an account"
                  />
                  <View style={{
                    height: height * 0.63
                  }}>
                    <FlatList
                      data={billers}
                      renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                          handleTextChange('biller', item.name);
                          handleTextChange('billerId', item.serviceId)
                          setStep((prev) => prev + 1);
                        }} key={item.name} style={{
                          marginVertical: 5,
                          backgroundColor: colors.sTextYellow,
                          borderRadius: 5,
                          padding: 10
                        }}>
                          <RowView justify='isStart' align='isCenter'>
                            <Image
                              source={{uri: item.imageUrl}}
                              style={styles.dropdownImg}
                              resizeMethod='resize'
                              resizeMode='contain'
                            />
                            <Header5 text={item.name} />
                          </RowView>
                        </TouchableOpacity>
                      )}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
              ) : billers?.length === 0 ? (
                <Paragraph text="No Service Provider found" />
              ) : null}
              <RowView justify='isBtw' overrideStyle={styles.continueWrapper}>
                <Button
                  overrideStyle={[styles.btn, generalStyles.transparentBtn]}
                  label="Prev"
                  onPress={() => setStep((prev) => prev - 1)}
                  overrideLabelStyle={generalStyles.transparentBtnLabel}
                />
                <Button
                  overrideStyle={styles.btn}
                  label="Next"
                  onPress={() => handleNext()}
                  disabled={!paymentData.biller}
                />
              </RowView>
            </View>
          )}
          {step === 2 && (
            <>
              <ColumnView justify='isBtw' align='isStart' overrideStyle={styles.paymentDetailsView}>
                <Paragraph text='Bill details' />
                <Header5 text={paymentData.category} />
                <Header5 text={paymentData.biller} />
              </ColumnView>
              {billerDetail &&
                serviceFee &&
                paymentData.biller &&
                switchComponent()}
              {serviceFee && paymentData.biller && paymentData.customerReference && (
                <>
                  {
                    //@ts-ignore
                    (paymentData.selectedCategoryId === 2 || paymentData.selectedCategoryId === 4 ||
                      // @ts-ignore
                      paymentData.selectedCategoryId === 1) && (
                      <View style={[styles.chargeWrapper]}>
                        <View style={styles.serviceWrapper}>
                          <Header3
                            overrideStyle={styles.serviceTitle}
                            text="Service Charge"
                          />
                          <Paragraph
                            overrideStyle={styles.serviceAmt}
                            text={paymentData.commission}
                          />
                        </View>
                        <View style={styles.serviceWrapper}>
                          <Header3
                            overrideStyle={styles.serviceTitle}
                            text="VAT"
                          />
                          <Paragraph
                            overrideStyle={styles.serviceAmt}
                            text={paymentData.vatRate}
                          />
                        </View>
                      </View>
                    )
                  }
                </>
              )}
              <View style={styles.btnWrapper}>
                <Button
                  overrideStyle={[styles.btn, generalStyles.transparentBtn]}
                  label="Prev"
                  onPress={() => setStep(prev => prev - 1)}
                  overrideLabelStyle={generalStyles.transparentBtnLabel}
                />
                <Button
                  overrideStyle={styles.btn}
                  label="Continue"
                  onPress={handleContinue}
                />
              </View>
            </>
          )}
          {step === 3 && (
            <View style={styles.step1Wrapper}>
              <Header3
                overrideStyle={styles.authTitle}
                text={`You are making a bill payment for ${
                  paymentData.category
                } worth ₦ ${
                  parseInt(paymentData.commission, 10) +
                  parseInt(paymentData.amount, 10)
                }. Enter your transaction authentication details to continue.`}
              />
              <AuthTypeComponent handleAuthChange={handleTextChange} />
              <View style={styles.btnWrapper}>
                <Button
                  overrideStyle={[styles.btn, generalStyles.transparentBtn]}
                  label="Go back"
                  onPress={() => setStep(prev => prev - 1)}
                  overrideLabelStyle={generalStyles.transparentBtnLabel}
                />
                <Button
                  overrideStyle={styles.btn}
                  label="Confirm"
                  onPress={handleConfirm}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Payments;

const CategoryChip = ({item, handleTextChange, selectedCategory}: any) => {
  const catImageMap: Record<string, any> = {
    Electricity: PowerIcon,
    'Cable Tv': TVIcon,
    Airtime: AirtimeIcon,
    'Mobile Data': DataIcon,
    'Eko Electric Prepaid': EkoIcon,
    'Eko Electric Postpaid': EkoIcon,
    'Ibdan Disco Postpaid': IbadanIcon,
    'Ibadan Disco Prepaid': IbadanIcon,
    'Ikeja Electric Prepaid': IkejaIcon,
    'Ikeja Electric Postpaid': IkejaIcon,
    StartTimes: StartimesIcon,
    MTN: MtnIcon,
    Airtel: AirtelIcon,
    Glo: GloIcon,
    GLO: GloIcon,
    DSTV: DstvIcon,
    GOTV: GotvIcon,
    '9Mobile': Ninemobile,
  };

  return (
    <TouchableOpacity
      key={item.name}
      onPress={() => {
        // @ts-ignore
        // catScrollRef.current.scrollToIndex({index});
        handleTextChange('category', item.name);
      }}
      style={[
        styles.categoryChip,
        selectedCategory === item.name ? styles.selectedChip : {},
      ]}>
      {catImageMap[item.name] ? (
        <Image source={catImageMap[item.name]} style={styles.catImage} />
      ) : (
        <View style={styles.textLogoWrapper}>
          <Paragraph overrideStyle={styles.textLogoText} text={item.name[0]} />
        </View>
      )}
      <Header5
        text={item.name}
        overrideStyle={[styles.chipLabel, styles.categoryLabel]}
      />
    </TouchableOpacity>
  );
};
