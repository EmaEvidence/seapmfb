import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  getBeneficiaries,
  removeBankBeneficiary,
} from '../../app/actions/account';
import {useAppSelector} from '../../app/hooks';
import {Button, ButtonSwitch, Confirmation, Header} from '../../common';
// import {AuthTypeComponent} from '../Transfer';
import {Header1, Header3, Paragraph} from '../../common/Text';
import useLanguage from '../../hooks/useLanguage';
import styles from './Beneficiaries.styles';
import {AuthTypeComponent} from '../Transfer';
import toaster from '../../utils/toaster';
import {AxiosResponse} from 'axios';

const types = ['Intra Bank', 'Inter Bank'];
export const Beneficiaries = ({navigation}: any) => {
  const {lang} = useLanguage();
  const {beneficiaries} = useAppSelector(state => state.account);
  const [toDelete, setToDelete] = useState<null | Record<string, string>>(null);
  const [data, setData] = useState({
    type: types[0],
    beneficiaries: [],
    authName: '',
    otp: '',
    transactionPin: '',
    password: '',
    secret: '',
  });
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const newIndex = types.indexOf(data.type) + 1;
    setIndex(newIndex);
    if (
      !beneficiaries ||
      // @ts-ignore
      !beneficiaries[newIndex]
    ) {
      getBeneficiaries(newIndex);
    }
  }, [data.type, beneficiaries]);

  const handleTextChange = (label: string, value: string) => {
    setData(prevState => ({
      ...prevState,
      [label]: value,
    }));
  };

  // @ts-ignore
  const selectedBeneficiary = beneficiaries[index];

  const renderContent = () => {
    return (
      <View>
        <Header3 overrideStyle={styles.textColor} text="Confirm Removal" />
        <Paragraph
          overrideStyle={styles.textColor}
          text={`Enter your transaction details to remove ${toDelete?.name} from your Beneficiary List`}
        />
        <View>
          <AuthTypeComponent handleAuthChange={handleTextChange} />
          <View style={[styles.buttonWrapper, styles.row]}>
            <Button
              overrideStyle={[styles.button, styles.halfBtn]}
              label={'Cancel'}
              onPress={() => {
                setToDelete(null);
                setData(d => ({
                  ...d,
                  [data.authName]: '',
                }));
              }}
            />
            <Button
              overrideStyle={[styles.button, styles.halfBtn]}
              label={'Remove'}
              onPress={handleRemove}
            />
          </View>
        </View>
      </View>
    );
  };

  const handleRemove = async () => {
    // @ts-ignore
    if (!data[data.authName]) {
      toaster('Error', 'Enter Authentication details to continue', 'custom');
      return;
    }
    const resp = (await removeBankBeneficiary({
      type: data.type.toLowerCase().replace(' ', ''),
      typeNumber: index,
      bene: {
        beneficiaryId: toDelete?.id as string,
        // @ts-ignore
        credential: {
          // @ts-ignore
          [data.authName]: data[data.authName],
        },
      },
    })) as AxiosResponse<any>;
    if (resp.status === 200) {
      setToDelete(null);
      setData(d => ({
        ...d,
        [data.authName]: '',
      }));
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title={'Beneficiaries'}
        navigation={navigation}
        showBackBtn
        overrideGoBack={() => navigation.goBack()}
      />
      <View style={styles.subheader}>
        <ButtonSwitch
          options={types}
          setSelected={(arg: string): void => {
            handleTextChange('type', arg);
          }}
        />
      </View>
      <View style={styles.paymentWrapper}>
        <FlatList
          data={selectedBeneficiary}
          renderItem={({item}) => (
            <View key={item.name} style={styles.beneWrapper}>
              <View style={styles.beneMain}>
                <View style={styles.beneLogo}>
                  <Header1
                    text={item.name[0]}
                    overrideStyle={styles.beneLogoText}
                  />
                </View>
                <View style={styles.beneDetailsWrapper}>
                  <Header3 text={item.name} overrideStyle={styles.beneName} />
                  <Paragraph
                    text={item.accountNumber}
                    // overrideStyle={styles.beneAcct}
                  />
                  {/* <Paragraph
                    text={dayjs(item.dateAdded).fromNow()}
                    overrideStyle={styles.beneDate}
                  /> */}
                </View>
              </View>
              <View>
                <Button
                  label="x"
                  onPress={() => {
                    setToDelete(item);
                  }}
                  overrideStyle={styles.beneBtn}
                  overrideLabelStyle={styles.beneBtnLabel}
                />
              </View>
            </View>
          )}
        />
        {selectedBeneficiary?.length === 0 && (
          <Paragraph
            overrideStyle={styles.notFound}
            text={lang.noBeneficiaries}
          />
        )}
      </View>
      {toDelete && (
        <Confirmation
          actionText={''}
          onPressNo={() => setToDelete(null)}
          onPressYes={handleRemove}
          renderContent={renderContent}
        />
      )}
    </View>
  );
};

export default Beneficiaries;
