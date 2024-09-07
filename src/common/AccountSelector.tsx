import React, {useEffect, useState} from 'react';
import {GenericDropdown} from './index';
import {useAppSelector} from '../app/hooks';
import {ViewStyle, View} from 'react-native';
import { Route } from '../navigations';

interface AccountSelectorProps {
  value?: string;
  handleTextChange: (label: string, val: string) => void;
  overrideContainerStyle?: ViewStyle;
  inValid?: boolean;
  error?: string;
  history?: any
}

export const AccountSelector = ({
  handleTextChange,
  value,
  inValid,
  error,
  overrideContainerStyle,
  history
}: AccountSelectorProps) => {
  const [stateVal, setStateVal] = useState('');
  const accountSummary = useAppSelector(state => state.account.accounts);
  const [accounts, setAccounts] = useState<Array<Record<string, string>>>([]);
  const [accMap, setAccMap] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    if (accountSummary) {
      const mappedAcc: Record<string, Record<string, string>> = {};
      const acct = accountSummary.map(item => {
        mappedAcc[item.accountNumber] = item;
        return item.displayText;
      });
      setAccounts(acct.map(account => ({
        label: account,
        value: account.split(' - ')[0],
      })));
      setAccMap(mappedAcc);
      const firstItemAcctNo = accountSummary[0];
      setStateVal((firstItemAcctNo?.accountNumber)?.toString())
      handleTextChange('account', firstItemAcctNo?.accountNumber);
      handleTextChange('debitAccountId', firstItemAcctNo?.id?.toString());
      handleTextChange('accountBalance', firstItemAcctNo?.accountBalance?.toString());
    }
  }, [accountSummary, history?.index]);

  if (!accounts) {
    return null;
  }

  return (
    <GenericDropdown
      data={accounts}
      onChange={(name, val) => {
        setStateVal(val)
        handleTextChange(name, val);
        if (accMap[val]) {
          handleTextChange('debitAccountId', accMap[val].id.toString());
          handleTextChange('accountBalance', accMap[val].accountBalance.toString());
        }
      }}
      label={'Select Account.'}
      name={'account'}
      value={stateVal}
      inValid={!!inValid}
      error={error || ''}
      listMode="MODAL"
      searchable={true}
      placeholder="Click to select an Account"
      overrideStyle={overrideContainerStyle}
    />
  );
};

export default AccountSelector;
