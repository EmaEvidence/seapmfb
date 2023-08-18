import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, ScrollView, Image} from 'react-native';
import {
  AccountSelector,
  Button,
  GenericDropdown,
  Header,
  RowView,
} from '../../common';
import styles from './Payments.styles';
import {Header3, Header5, Paragraph} from '../../common/Text';
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
} from '../../validator';
import {getSummary, getAccounts} from '../../app/actions/account';

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
};

export const Payments = ({navigation}: {navigation: any}) => {
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
    STARTTIMES: StartimesIcon,
    MTN: MtnIcon,
    Mtn: MtnIcon,
    Airtel: AirtelIcon,
    AIRTEL: AirtelIcon,
    Glo: GloIcon,
    GLO: GloIcon,
    DSTV: DstvIcon,
    GOTV: GotvIcon,
    '9Mobile': Ninemobile,
  };

  const {categories, categoryBillers, billerDetails, serviceFeeObj} =
    useAppSelector(state => state.payment);
  const [step, setStep] = useState(0);
  const [paymentData, setPaymentData] = useState({
    ...initialUserData,
  });

  const [paymentError, setPaymentError] = useState<Record<string, boolean>>({
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

  const handleTextChange = (label: string, value: string) => {
    setPaymentData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    paymentError[label] && handleSetPaymentError(label, !!value);
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
        }));
      }
    }
  };

  const handleContinue = () => {
    const isBillerValid = getValidator();
    if (isBillerValid) {
      setStep(2);
    }
  };

  const switchComponent = () => {
    let Comp = null;
    switch (parseInt(paymentData.selectedCategoryId, 10)) {
      case 2:
        Comp = TV;
        break;
      case 3:
        Comp = Airtime;
        break;
      case 4:
        Comp = Data;
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

  const validateData = () => {
    const isPhoneValid = validatePhone(paymentData.customerReference);
    const isAmountValid = validateAmount(paymentData.amount);
    const isBundleValid = validateNonEmpty(paymentData.bundle);
    setPaymentError(prevState => ({
      ...prevState,
      amount: !isAmountValid,
      customerReference: !isPhoneValid,
      bundle: !isBundleValid,
    }));
    return isPhoneValid && isAmountValid && isBundleValid;
  };

  const validateTV = () => {
    const isSmartNoValid = validatePhone(paymentData.customerReference);
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
    // phone number, amount
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
        return validateData();
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
      setStep(0);
      getSummary(true);
      getAccounts();
      toaster(
        'Success',
        'Your Bill payment has being registered successfully',
        'custom',
      );
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
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.wrapper}>
        <Header title={'Bills Payments'} navigation={navigation} />
        <View style={styles.subheader} />
        {step === 0 && (
          <View style={styles.paymentWrapper}>
            {!categories ? (
              <Paragraph
                overrideStyle={styles.notFound}
                text="Loading Bills Categories..."
              />
            ) : categories.length === 0 ? (
              <Paragraph
                overrideStyle={styles.notFound}
                text="No Category found or Error Loading Bills Cateogories."
              />
            ) : (
              <View style={styles.pickerWrapper}>
                <AccountSelector
                  value={paymentData.account}
                  handleTextChange={handleTextChange}
                  overrideContainerStyle={styles.acctSelector}
                  inValid={paymentError.account}
                  error="Please select an account"
                />
                <View>
                  <Header5
                    text="Select Bills Category."
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
                {billers && billers.length > 0 ? (
                  <View>
                    <GenericDropdown
                      label={'Select Service Provider.'}
                      // @ts-ignore
                      data={billers.map(biller => {
                        return {
                          label: biller.name,
                          value: biller.name,
                          icon: () => (
                            <Image
                              source={catImageMap[biller.name]}
                              style={styles.dropdownImg}
                            />
                          ),
                        };
                      })}
                      overrideStyle={{}}
                      onChange={(name: string, val: string) => {
                        handleTextChange(name, val);
                      }}
                      name={'biller'}
                      value={paymentData.biller}
                      inValid={false}
                      error="Select beneficiary"
                      listMode="MODAL"
                      searchable
                    />
                  </View>
                ) : billers?.length === 0 ? (
                  <Paragraph text="No Service Provider found" />
                ) : null}
              </View>
            )}
            {paymentData.biller && (
              <View style={styles.continueWrapper}>
                <Button
                  overrideStyle={styles.btn}
                  label="Next"
                  onPress={() => handleNext()}
                />
              </View>
            )}
          </View>
        )}
        {step === 1 && (
          <>
            {billerDetail &&
              serviceFee &&
              paymentData.biller &&
              switchComponent()}
            {serviceFee && paymentData.biller && paymentData.customerReference && (
              <>
                {
                  //@ts-ignore
                  (paymentData.selectedCategoryId === 2 ||
                    // @ts-ignore
                    paymentData.selectedCategoryId === 1) && (
                    <View style={styles.chargeWrapper}>
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
                overrideStyle={styles.btn}
                label="Go Back"
                onPress={() => setStep(0)}
              />
              <Button
                overrideStyle={styles.btn}
                label="Continue"
                onPress={handleContinue}
              />
            </View>
          </>
        )}
        {step === 2 && (
          <View style={styles.step1Wrapper}>
            <Header3
              overrideStyle={styles.authTitle}
              text={`You are making a bill payment for ${
                paymentData.category
              } worth NGN ${
                parseInt(paymentData.commission, 10) +
                parseInt(paymentData.amount, 10)
              }. Enter your transaction authentication details to continue.`}
            />
            <AuthTypeComponent handleAuthChange={handleTextChange} />
            <View style={styles.btnWrapper}>
              <Button
                overrideStyle={styles.btn}
                label="Go Back"
                onPress={() => setStep(0)}
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
    </ScrollView>
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
