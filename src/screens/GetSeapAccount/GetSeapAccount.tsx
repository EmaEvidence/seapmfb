import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {getBranches, getSEAPAccountCall} from '../../app/actions/auth';
import {Button, RowView} from '../../common';
import InputText, {Checkbox, GenericDropdown} from '../../common/InputText';
import {Header2, Header4, Header5, Paragraph} from '../../common/Text';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import toaster from '../../utils/toaster';
import {validateEmail, validateNonEmpty, validatePhone} from '../../validator';
import styles from './GetSeapAccount.styles';

interface GetSeapAccountProps {
  navigation: {
    navigate: (route: string) => void;
  };
}

const genderData = ['Male', 'Female'];

const acctTypes = [
  {
    name: 'Savings',
    code: '200',
  },
  {
    name: 'Current',
    code: '100',
  },
  {
    name: 'Salary(SEAP MFI)',
    code: '109',
  },
];

const idMeans = [
  {
    name: 'NIMC',
    code: 3,
  },
  {
    name: 'National ID Card',
    code: 1,
  },
  {
    name: "Driver's License",
    code: 2,
  },
  {
    name: 'International Passport',
    code: 4,
  },
  {
    name: 'Permanent Voters Card',
    code: 5,
  },
  {
    name: 'Others',
    code: 6,
  },
];

export const GetSeapAccount = ({navigation}: GetSeapAccountProps) => {
  const [step, setStep] = useState(0);
  const [regSuccess, setRegSuccess] = useState({
    remarks: '',
    refId: '',
  });
  // const [base64, setBase64] = useState<Array<string>>([]);
  const [openDate, setOpenDate] = useState(false);
  const [branches, setBranches] = useState<Array<string>>([]);
  const [branchesObj, setBranchesObj] = useState<Array<Record<string, string>>>(
    [],
  );
  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setStep(step + 1);
  };
  const [userData, setData] = useState({
    lastName: '',
    firstName: '',
    otherNames: '',
    city: '',
    address: '',
    gender: genderData[0],
    dateOfBirth: '',
    phoneNo: '',
    placeOfBirth: '',
    nationalIdentityNo: '',
    nextOfKinName: '',
    nextOfKinPhoneNumber: '',
    referralName: '',
    referralPhoneNo: '',
    branchCode: branches[0],
    bankVerificationNumber: '',
    email: '',
    imageBase64: '',
    referred: '',
    image: '',
    signatureBase64: '',
    signature: '',
    identificationImage: '',
    identificationImageBase64: '',
    identificationImageType: '',
    identificationNumber: '',
    accountType: '',
    accountOfficerCode: '',
  });
  const [userError, setError] = useState({
    lastName: false,
    firstName: false,
    otherNames: false,
    city: false,
    address: false,
    gender: false,
    dateOfBirth: false,
    phoneNo: false,
    placeOfBirth: false,
    nationalIdentityNo: false,
    nextOfKinName: false,
    nextOfKinPhoneNumber: false,
    referralName: false,
    referralPhoneNo: false,
    branchCode: false,
    bankVerificationNumber: false,
    email: false,
    imageBase64: false,
    referred: false,
    image: false,
    signatureBase64: false,
    signature: false,
    identificationImage: false,
    identificationImageBase64: false,
    identificationImageType: false,
    identificationNumber: false,
    accountType: false,
    accountOfficerCode: false,
  });

  const getSEAPBranches = async () => {
    const resp = await getBranches();
    if (resp?.status === 200) {
      setBranchesObj(resp.data.branchData);
      const newBranches = resp.data.branchData.map(
        (item: Record<string, string>) => item.name,
      );
      setBranches(newBranches);
      setData({
        ...userData,
        branchCode: newBranches[0],
      });
    }
  };

  useEffect(() => {
    getSEAPBranches();
  }, []);

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
    handleErrorChange(label, !value);
  };

  const handleErrorChange = (label: string, value: boolean) => {
    setError(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleSubmit = async () => {
    const {referred, referralName, referralPhoneNo} = userData;
    const refNameError = !validateNonEmpty(referralName);
    const refPhoneError = !validatePhone(referralPhoneNo);
    if (referred === 'yes' && (refNameError || refPhoneError)) {
      setError({
        ...userError,
        referralName: refNameError,
        referralPhoneNo: refPhoneError,
      });
      return;
    }
    const resp = await getSEAPAccountCall({
      lastName: userData.lastName,
      firstName: userData.firstName,
      otherNames: userData.otherNames,
      city: userData.city,
      address: userData.address,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      phoneNo: userData.phoneNo,
      placeOfBirth: userData.placeOfBirth,
      nationalIdentityNo: userData.nationalIdentityNo,
      nextOfKinName: userData.nextOfKinName,
      nextOfKinPhoneNumber: userData.nextOfKinPhoneNumber,
      referralName: userData.referralName,
      referralPhoneNo: userData.referralPhoneNo,
      branchCode:
        branchesObj.find(item => item.name === userData.branchCode)
          ?.branchCode || '004',
      bankVerificationNumber: userData.bankVerificationNumber,
      email: userData.email,
      // @ts-ignore
      imageBase64: userData.imageBase64.join(),
      // @ts-ignore
      signatureBase64: userData.signatureBase64.join(),
      // @ts-ignore
      identificationImageBase64: userData.identificationImageBase64.join(),
      identificationImageType: userData.identificationImageType,
      identificationNumber: userData.identificationNumber,
      accountType: userData.accountType,
      accountOfficerCode: '008',
    });
    if (resp?.status === 200) {
      toaster('Success', resp.data.remarks, 'custom');
      setRegSuccess({
        refId: resp.data.referenceId,
        remarks: resp.data.remarks,
      });
      setStep(6);
      setData({
        lastName: '',
        firstName: '',
        otherNames: '',
        city: '',
        address: '',
        gender: genderData[0],
        dateOfBirth: '',
        phoneNo: '',
        placeOfBirth: '',
        nationalIdentityNo: '',
        nextOfKinName: '',
        nextOfKinPhoneNumber: '',
        referralName: '',
        referralPhoneNo: '',
        branchCode: branches[0],
        bankVerificationNumber: '',
        email: '',
        imageBase64: '',
        referred: '',
        image: '',
        signatureBase64: '',
        signature: '',
        identificationImage: '',
        identificationImageBase64: '',
        identificationImageType: '',
        identificationNumber: '',
        accountType: '',
        accountOfficerCode: '',
      });
    }
  };

  const handleNext1 = () => {
    const {firstName, lastName, otherNames, branchCode} = userData;
    const fError = !validateNonEmpty(firstName);
    const lError = !validateNonEmpty(lastName);
    const oError = !validateNonEmpty(otherNames);
    const branchError = false; //!validateNonEmpty(branchCode);
    if (fError || lError || oError || branchError) {
      setError({
        ...userError,
        firstName: fError,
        lastName: lError,
        otherNames: oError,
        branchCode: branchError,
      });
      return;
    }
    handleNext();
  };

  const handleNext2 = () => {
    const {email, phoneNo, gender, dateOfBirth, accountType} = userData;
    const emailError = !validateEmail(email);
    const phoneError = !validatePhone(phoneNo);
    const genderError = !validateNonEmpty(gender);
    const dobError = !validateNonEmpty(dateOfBirth);
    const acctTypeError = !validateNonEmpty(accountType);
    if (emailError || phoneError || genderError || dobError) {
      setError({
        ...userError,
        email: emailError,
        phoneNo: phoneError,
        gender: genderError,
        dateOfBirth: dobError,
        accountType: acctTypeError,
      });
      return;
    }
    handleNext();
  };

  const handleNext3 = () => {
    const {city, address, placeOfBirth} = userData;
    const cityError = !validateNonEmpty(city);
    const addressError = !validateNonEmpty(address);
    const placeError = !validateNonEmpty(placeOfBirth);
    if (cityError || addressError || placeError) {
      setError({
        ...userError,
        city: cityError,
        address: addressError,
        placeOfBirth: placeError,
      });
      return;
    }
    handleNext();
  };

  const handleNext4 = () => {
    const {bankVerificationNumber, nationalIdentityNo, image} = userData;
    const bankError = !(
      validateNonEmpty(bankVerificationNumber) &&
      bankVerificationNumber.length === 11
    );
    const nimcError = !(
      validateNonEmpty(nationalIdentityNo) && nationalIdentityNo.length === 11
    );
    const imageError = !validateNonEmpty(image);
    if (bankError || nimcError || imageError) {
      setError({
        ...userError,
        bankVerificationNumber: bankError,
        nationalIdentityNo: nimcError,
        imageBase64: imageError,
      });
      return;
    }
    handleNext();
  };

  const handleNext5 = () => {
    const {
      identificationImage,
      signature,
      identificationNumber,
      identificationImageType,
    } = userData;
    const signError = !validateNonEmpty(signature);
    const idTypeError = !validateNonEmpty(identificationImageType);
    const idImageError = !validateNonEmpty(identificationImage);
    const idNumError = !validateNonEmpty(identificationNumber);
    if (idNumError || signError || idTypeError || idImageError) {
      setError({
        ...userError,
        identificationImage: idImageError,
        identificationNumber: idNumError,
        signature: signError,
        identificationImageType: idTypeError,
      });
      return;
    }
    handleNext();
  };

  const handleNext6 = () => {
    const {nextOfKinName, nextOfKinPhoneNumber} = userData;
    const kinNameError = !validateNonEmpty(nextOfKinName);
    const kinPhoneError = !validatePhone(nextOfKinPhoneNumber);
    if (kinNameError || kinPhoneError) {
      setError({
        ...userError,
        nextOfKinName: kinNameError,
        nextOfKinPhoneNumber: kinPhoneError,
      });
      return;
    }
    handleNext();
  };

  const handleGetImage = async (key: string) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!result.errorCode && result.assets && result.assets[0]) {
      if (result?.assets[0] && result.assets[0].fileSize > 400000) {
        toaster('Error', 'Image size must not be more than 400kb!', 'custom');
        return;
      }
      const base64Array = result.assets[0].base64?.match(/.{1,50000}/g);
      if (!base64Array) {
        toaster('Error', 'Image Upload failed, Try again!', 'custom');
        return;
      }
      setData(prevState => ({
        ...prevState,
        [key]: (result.assets && result.assets[0].fileName) || '',
        [`${key}Base64`]: base64Array as unknown as Array<string>,
      }));
      setError(prevState => ({
        ...prevState,
        [key]: !(result.assets && result.assets[0].fileName),
      }));
    }
  };

  return (
    <UnAuthWrapper
      header="Get a SEAP Account"
      description={
        !regSuccess.refId
          ? 'Enter your details to begin the journey to unequal virtual banking experience.'
          : ''
      }
      linkText="Sign In"
      onLinkPress={() => navigation.navigate('Login')}
      linkText1="Sign Up"
      onLinkPress1={() => navigation.navigate('SignUp')}>
      <View style={styles.formWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {step === 0 && (
            <>
              <GenericDropdown
                data={branches.map((item: string) => ({
                  label: item,
                  value: item,
                }))}
                label="Select a Branch"
                overrideStyle={styles.textInput}
                name="branchCode"
                onChange={handleTextChange}
                value={userData.branchCode}
                error="Please select a branch!"
                // inValid={userError.branchCode}
                inValid={false}
                listMode="MODAL"
                searchable
                placeholder="Select a Branch"
              />
              <InputText
                label="Firstname"
                overrideStyle={styles.textInput}
                name="firstName"
                onChange={handleTextChange}
                value={userData.firstName}
                errorText="Please enter your Firstname!"
                inValid={userError.firstName}
                placeholder="e.g Ayoade"
              />
              <InputText
                name="lastName"
                onChange={handleTextChange}
                label="Lastname"
                overrideStyle={styles.textInput}
                value={userData.lastName}
                errorText="Please enter your Lastname!"
                inValid={userError.lastName}
                placeholder="e.g Sanusi"
              />
              <InputText
                name="otherNames"
                onChange={handleTextChange}
                label="Othername"
                overrideStyle={styles.textInput}
                value={userData.otherNames}
                errorText="Please enter a valid Name!"
                inValid={userError.otherNames}
                placeholder="e.g Emeka"
              />
              <View style={styles.buttonWrapper}>
                <Button
                  overrideStyle={styles.button}
                  label={'Next'}
                  onPress={handleNext1}
                />
              </View>
            </>
          )}
          {step === 1 && (
            <>
              <InputText
                name="email"
                onChange={handleTextChange}
                label="Email"
                overrideStyle={styles.textInput}
                value={userData.email}
                errorText="Please enter a valid Email!"
                inValid={userError.email}
                placeholder="e.g email@mail.com"
              />
              <RowView justify={'isBtw'}>
                <GenericDropdown
                  data={acctTypes.map((item: Record<string, string>) => ({
                    label: item.name,
                    value: item.code,
                  }))}
                  label="Account Type"
                  overrideStyle={[styles.textInput, styles.halfInput]}
                  name="accountType"
                  onChange={handleTextChange}
                  value={userData.accountType || ''}
                  error="Select account Type!"
                  inValid={userError.accountType}
                  dropDownDirection="TOP"
                  placeholder="e.g. Savings"
                />
                <GenericDropdown
                  data={genderData.map((item: string) => ({
                    label: item,
                    value: item,
                  }))}
                  label="Gender"
                  overrideStyle={[styles.textInput, styles.halfInput]}
                  name="gender"
                  onChange={handleTextChange}
                  value={userData.gender || ''}
                  error="Select a gender!"
                  inValid={userError.gender}
                  dropDownDirection="TOP"
                  placeholder="e.g. Male"
                  zIndex={9000}
                />
              </RowView>
              <RowView justify={'isBtw'}>
                <InputText
                  name="phoneNo"
                  onChange={handleTextChange}
                  label="Phone Number"
                  overrideStyle={[styles.textInput, styles.halfInput]}
                  value={userData.phoneNo}
                  errorText="Please enter a valid Phone!"
                  inValid={userError.phoneNo}
                  placeholder="e.g 07012120011"
                />
                <InputText
                  name="dateOfBirth"
                  onChange={handleTextChange}
                  label="Date of Birth"
                  overrideStyle={[styles.textInput, styles.halfInput]}
                  value={userData.dateOfBirth.split('T')[0]}
                  errorText="Please enter a valid Date!"
                  inValid={userError.dateOfBirth}
                  onPress={() => setOpenDate(true)}
                  readonly
                />
              </RowView>
              <DatePicker
                date={new Date()}
                onDateChange={date => {
                  handleTextChange('dateOfBirth', date.toISOString());
                }}
                modal={true}
                open={openDate}
                onConfirm={date =>
                  handleTextChange('dateOfBirth', date.toISOString())
                }
                onCancel={() => setOpenDate(false)}
                title={'Date of Birth'}
                confirmText="Done"
                cancelText="Cancel"
                mode="date"
                maximumDate={new Date()}
                minimumDate={new Date('1920-01-01')}
                androidVariant="iosClone"
              />
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Prev'}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Next'}
                  onPress={handleNext2}
                />
              </View>
            </>
          )}
          {step === 2 && (
            <>
              <InputText
                name="city"
                onChange={handleTextChange}
                label="City"
                overrideStyle={styles.textInput}
                value={userData.city}
                errorText="Please enter a valid City!"
                inValid={userError.city}
                placeholder="e.g Ibadan"
              />
              <InputText
                name="address"
                onChange={handleTextChange}
                label="Address"
                overrideStyle={styles.textInput}
                value={userData.address}
                errorText="Please enter a valid Address!"
                inValid={userError.address}
                placeholder="e.g 2 Alaka Street, Oke Iho"
              />
              <InputText
                name="placeOfBirth"
                onChange={handleTextChange}
                label="Place of Birth"
                overrideStyle={styles.textInput}
                value={userData.placeOfBirth}
                errorText="Please enter a valid place of birth!"
                inValid={userError.placeOfBirth}
                placeholder="e.g Ibadan"
              />
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Prev'}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Next'}
                  onPress={handleNext3}
                />
              </View>
            </>
          )}
          {step === 3 && (
            <>
              <InputText
                label="National Identification Number(NIN)"
                overrideStyle={styles.textInput}
                name="nationalIdentityNo"
                onChange={handleTextChange}
                value={userData.nationalIdentityNo}
                errorText="Please enter your National Identity Number!"
                inValid={userError.nationalIdentityNo}
                placeholder="e.g 10101010101"
              />
              <InputText
                name="bankVerificationNumber"
                onChange={handleTextChange}
                label="Bank Verification Number (BVN)"
                overrideStyle={styles.textInput}
                value={userData.bankVerificationNumber}
                errorText="Please enter a valid Bank Verification Number!"
                inValid={userError.bankVerificationNumber}
                placeholder="e.g 10101010101"
              />
              <InputText
                name="image"
                onChange={handleTextChange}
                label="Image"
                overrideStyle={styles.textInput}
                value={userData.image}
                errorText="Please enter a valid Image!"
                inValid={userError.image}
                readonly
                onPress={() => handleGetImage('image')}
              />
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Prev'}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Next'}
                  onPress={handleNext4}
                />
              </View>
            </>
          )}
          {step === 4 && (
            <>
              <GenericDropdown
                data={idMeans.map((item: Record<string, string | number>) => ({
                  label: item.name,
                  value: item.code,
                }))}
                label="Means of Identification"
                overrideStyle={[styles.textInput]}
                name="identificationImageType"
                onChange={handleTextChange}
                value={userData.identificationImageType || ''}
                error="Select a Means of Identification!"
                inValid={userError.identificationImageType}
                listMode="MODAL"
                searchable={true}
                placeholder="e.g. NIMC"
                zIndex={9000}
              />
              <InputText
                name="identificationNumber"
                onChange={handleTextChange}
                label="Identification Number"
                overrideStyle={styles.textInput}
                value={userData.identificationNumber}
                errorText="Please enter a valid Number!"
                inValid={userError.identificationNumber}
                placeholder="e.g A1203456B"
              />
              <InputText
                name="identificationImage"
                onChange={handleTextChange}
                label="Identification Image"
                overrideStyle={styles.textInput}
                value={userData.identificationImage}
                errorText="Please enter a valid Image!"
                inValid={userError.identificationImage}
                readonly
                onPress={() => handleGetImage('identificationImage')}
                placeholder="e.g Image of NIMC Card"
              />
              <InputText
                name="signature"
                onChange={handleTextChange}
                label="Signature Image"
                overrideStyle={styles.textInput}
                value={userData.signature}
                errorText="Please enter a valid Image!"
                inValid={userError.signature}
                readonly
                onPress={() => handleGetImage('signature')}
              />
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Prev'}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Next'}
                  onPress={handleNext5}
                />
              </View>
            </>
          )}
          {step === 5 && (
            <>
              <InputText
                name="nextOfKinName"
                onChange={handleTextChange}
                label="Next of Kin(Fullname)"
                overrideStyle={styles.textInput}
                value={userData.nextOfKinName}
                errorText="Please enter a valid Name!"
                inValid={userError.nextOfKinName}
                placeholder="e.g Anthony Muktar"
              />
              <InputText
                name="nextOfKinPhoneNumber"
                onChange={handleTextChange}
                label="Phone Number(Next of Kin)"
                overrideStyle={styles.textInput}
                value={userData.nextOfKinPhoneNumber}
                errorText="Please enter a valid Phone Number!"
                inValid={userError.nextOfKinPhoneNumber}
                placeholder="e.g +2347012121100"
              />
              <View style={[styles.buttonWrapper, styles.row]}>
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Prev'}
                  onPress={handlePrev}
                />
                <Button
                  overrideStyle={[styles.button, styles.halfBtn]}
                  label={'Next'}
                  onPress={handleNext6}
                />
              </View>
            </>
          )}
          {step === 6 && (
            <>
              <Checkbox
                name="referred"
                onChange={handleTextChange}
                label="Were you referred?"
                overrideStyle={styles.textInput}
                value={userData.referred}
                errorText="Please enter a valid Name!"
                inValid={userError.referred}
              />
              {userData.referred === 'yes' && (
                <>
                  <InputText
                    name="referralName"
                    onChange={handleTextChange}
                    label="Referrer's Name"
                    overrideStyle={styles.textInput}
                    value={userData.referralName}
                    errorText="Please enter a valid name!"
                    inValid={userError.referralName}
                    placeholder="e.g John Adeagbo"
                  />
                  <InputText
                    name="referralPhoneNo"
                    onChange={handleTextChange}
                    label="Referrer's Phone Number"
                    overrideStyle={styles.textInput}
                    value={userData.referralPhoneNo}
                    errorText="Please enter a valid Phone Number!"
                    inValid={userError.referralPhoneNo}
                    placeholder="e.g 07010101010"
                  />
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
                  label={'Submit'}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
          {step === 7 && (
            <View style={styles.successWrapper}>
              <Header2 text="Success" overrideStyle={styles.successText} />
              <View>
                <Header5
                  text="Reference Id"
                  overrideStyle={styles.successText}
                />
                <Header4
                  text={regSuccess.refId}
                  overrideStyle={styles.successText}
                />
              </View>
              <Paragraph
                text={regSuccess.remarks}
                overrideStyle={styles.successText}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </UnAuthWrapper>
  );
};

export default GetSeapAccount;
