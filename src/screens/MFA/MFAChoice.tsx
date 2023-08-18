import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {setAuthTypeCall} from '../../app/actions/auth';
import {useAppDispatch} from '../../app/hooks';
import {login} from '../../app/slices/auth';
import {Button, GenericDropdown} from '../../common';
import UnAuthWrapper from '../../common/UnAuthWrapper';
import useHasBiometric from '../../hooks/useHasBiometric';
import {INavigation, IRoute} from '../../types';
import {
  transactionAuthTypes,
  transactionAuthTypesObj,
} from '../../utils/constants';
import {loadItem} from '../../utils/localStorage';
import styles from './mfa.styles';
import {useTransactionAuthType} from '../../hooks';
import {AxiosResponse} from 'axios';
import toaster from '../../utils/toaster';

interface Props {
  navigation: INavigation;
  route: IRoute;
}

export const mfaMap = {
  [transactionAuthTypes[0]]: 'Passcode',
  [transactionAuthTypes[1]]: '',
  [transactionAuthTypes[2]]: 'FingerPrint',
  [transactionAuthTypes[3]]: 'Passcode',
  [transactionAuthTypes[4]]: 'TransactionPassword',
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
}: {
  navigation: INavigation;
  fromRoute?: string;
}) => {
  const storeAuthType = useTransactionAuthType();
  const setType = storeAuthType.type;
  const [authType, setAuthType] = useState(transactionAuthTypes[0]);
  const dispatch = useAppDispatch();
  const {hasBiometric} = useHasBiometric();

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
    const resp = (await setAuthTypeCall({
      authType: index.toString(),
    })) as AxiosResponse;
    if (resp.status === 200) {
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
    setAuthTypeCall({
      authType: index,
    });
  };

  const handlePinAndOTP = async (index: number, route: string) => {
    const isMFASet = await loadItem('isMFASet');
    if (isMFASet && parseInt(isMFASet, 10) === 1) {
      handleSetAuthType(index);
    } else {
      // navigation.navigate(route, {
      //   authType: index,
      //   hideDefault: true,
      // });
      // setAuthTypeCall({
      //   authType: (index).toString(),
      // });
      handleSetAuthTypeCall(index, route, false);
    }
  };

  return (
    <View style={styles.mfabuttonWrapper}>
      <GenericDropdown
        label={''}
        subLabel={''}
        data={transactionAuthTypes
          .filter(authTyp => {
            if (authTyp === transactionAuthTypes[2] && !hasBiometric) {
              return false;
            }
            return true;
          })
          .map(item => ({
            label: item,
            value: item,
          }))}
        value={authType}
        onChange={(_name: string, text: string) => {
          setAuthType(text);
        }}
        name={''}
        inValid={false}
        error={''}
        // overrideStyle={styles.pickerWrapper}
        // overridePickerStyle={styles.pickerStyle}
        // pickerItemStyle={styles.pickerItem}
        listMode="MODAL"
        searchable
      />
      <Button
        overrideStyle={styles.mfabutton}
        label={'Save selection'}
        onPress={() => {
          const route: string = mfaMap[authType];
          const index = transactionAuthTypesObj[authType];
          if (authType === transactionAuthTypes[3]) {
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
        }}
      />
    </View>
  );
};

export default MFAChoice;
