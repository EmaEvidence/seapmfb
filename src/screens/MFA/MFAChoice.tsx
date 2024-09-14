import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {setAuthTypeCall} from '../../app/actions/auth';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import {Header} from '../../common';
import { Paragraph } from '../../common/Text';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import {INavigation, IRoute} from '../../types';
import {
  height,
  transactionAuthTypes,
  transactionAuthTypesObj,
} from '../../utils/constants';
import {loadItem} from '../../utils/localStorage';
import styles from './mfa.styles';
import {useTransactionAuthType} from '../../hooks';
import {AxiosResponse} from 'axios';
import toaster from '../../utils/toaster';
import { colors } from '../../utils/theme';

interface Props {
  navigation: INavigation;
  route: IRoute;
}

export const mfaMap = {
  [transactionAuthTypes[0]]: 'Passcode',
  [transactionAuthTypes[1]]: '',
  [transactionAuthTypes[2]]: 'Passcode',
  [transactionAuthTypes[3]]: 'TransactionPassword',
};

export const MFAChoice = ({navigation, route}: Props) => {
  const dispatch = useAppDispatch();
  const currentRoute = route.params;

  const handleSkip = async () => {
    const user = await loadItem('user');
    user && dispatch(login(JSON.parse(user)));
  };

  return (
    <UnAuthWrapper
      header="How will you like to authorize transactions on this device?"
      description=""
      linkText="Skip"
      goBack={navigation.goBack}
      onLinkPress={() => handleSkip()}>
      <View>
        <MFAChoiceComponent
          navigation={navigation}
          fromRoute={currentRoute.isFrom}
        />
      </View>
    </UnAuthWrapper>
  );
};

export const MFAChoiceComponent = ({
  navigation,
  fromRoute,
  handleSuccess,
}: {
  navigation: INavigation;
  fromRoute?: string;
  handleSuccess?: Function
}) => {
  const storeAuthType = useTransactionAuthType();
  const setType = storeAuthType.type;
  const [authType, setAuthType] = useState(transactionAuthTypes[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (setType) {
      setAuthType(storeAuthType.authName);
    }
  }, [setType]);

  const handleSkip = async () => {
    const user = await loadItem('user');
    user && dispatch(login(JSON.parse(user)));
  };

  const handleSetAuthTypeCall = async (
    index: number,
    route: string,
    skip: boolean,
  ) => {
    const resp = await setAuthTypeCall({
      authType: index.toString(),
    });
    console.log(resp, '=-=-=resp=-=-=-')
    if (resp.status === 200) {
      handleSuccess && handleSuccess();
      if (skip) {
        handleSkip();
      }
      if (fromRoute && fromRoute === 'login') {
        handleSkip();
      }
      // if (route) {
      //   navigation.navigate(route, {
      //     authType: index,
      //     hideDefault: true,
      //   });
      // }
      const message =
        index === 2
          ? 'Authentication Type changed successfully.'
          : 'Authentication Type changed successfully, you can click the modify button to set a new anwser for it';
      toaster('Success', message, 'custom');
      // @ts-ignore
    } else if (resp?.response?.data.responseCode === 400 && route) {
      navigation.navigate(route, {
        authType: index,
        hideDefault: true,
      });
    } else if (resp.request.status === 400 && route) {
      navigation.navigate(route, {
        authType: index,
        hideDefault: false,
        setAsDefault: true,
      });
    } else {
      handleSkip();
    }
  };

  const handleSetAuthType = async (index: number) => {
    handleSkip();
    console.log('=-=-here13')
    setAuthTypeCall({
      authType: index,
    });
  };

  const handlePinAndOTP = async (index: number, route: string) => {
    const isMFASet = await loadItem('isMFASet');
    console.log('0--0-here--=-another')
    if (isMFASet && parseInt(isMFASet, 10) === 1) {
      handleSetAuthType(index);
    } else {
      handleSetAuthTypeCall(index, route, false);
    }
  };

  const handleAuthBtnPress = (itm: string) => {
    const route: string = mfaMap[itm];
    const index = transactionAuthTypesObj[itm];
    console.log(itm, '=-=-item=-')
    if (itm === transactionAuthTypes[2]) {
      handlePinAndOTP(index, route);
    } else if (route) {
      // navigation.navigate(route, {
      //   authType: index,
      //   hideDefault: true,
      // });
      // setAuthTypeCall({
      //   authType: (index).toString(),
      // });
      handleSetAuthTypeCall(index, route, false);
    } else {
      handleSetAuthTypeCall(index, route, true);
    }
  }

  return (
    <ScrollView style={styles.authTypeWrapper}>
      <Header
        title={'Select your authorization mode'}
        navigation={navigation}
      />
      {
        transactionAuthTypes.map((itm) => (
          <AuthTypeCard
            key={itm}
            title={itm}
            onPress={(itm) => handleAuthBtnPress(itm)}
            selected={storeAuthType.authName}
          />
        ))
      }
    </ScrollView>
  );
};

export default MFAChoice;

const AuthTypeCard = ({title, selected, onPress}: { title: string, selected?: string, onPress: (val: string) => void}) => {
  return (
    <TouchableOpacity
      key={title}
      onPress={() => onPress(title)}
      style={[
        styles.secCard,
        {
          borderColor: selected?.toLowerCase() === title.toLowerCase() ? colors.sYellow : colors.sLightBlue
        }
      ]}>
      <Paragraph text={title} />
    </TouchableOpacity>
  )
}

