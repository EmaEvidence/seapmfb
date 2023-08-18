import React, {useEffect, useState} from 'react';
import {GenericDropdown} from './index';
import {useAppSelector} from '../app/hooks';
import {ViewStyle} from 'react-native';

interface AccountSelectorProps {
  value: string;
  handleTextChange: (label: string, val: string) => void;
  overrideContainerStyle?: ViewStyle;
  inValid?: boolean;
  error?: string;
}

export const AccountSelector = ({
  handleTextChange,
  value,
  inValid,
  error,
}: AccountSelectorProps) => {
  const accountSummary = useAppSelector(state => state.account.accounts);
  const [accounts, setAccounts] = useState<Array<string>>([]);
  const [accMap, setAccMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (accountSummary) {
      const mappedAcc: Record<string, string> = {};
      const acct = accountSummary.map(item => {
        mappedAcc[item.displayText] = item.id;
        return item.displayText;
      });
      setAccounts(acct);
      setAccMap(mappedAcc);
      // handleTextChange('account', acct[0]);
      // handleTextChange('debitAccountId', mappedAcc[acct[0]].toString());
    }
  }, [accountSummary]);

  if (!accounts) {
    return null;
  }

  return (
    <>
      <GenericDropdown
        data={accounts.map(account => ({
          label: account,
          value: account,
        }))}
        onChange={(name, val) => {
          handleTextChange(name, val);
          if (accMap[val]) {
            handleTextChange('debitAccountId', accMap[val].toString());
          }
        }}
        label={'Select Account.'}
        name={'account'}
        value={value}
        inValid={!!inValid}
        error={error || ''}
        listMode="MODAL"
        searchable={true}
        placeholder="Click to select an Account"
        overrideStyle={{}}
      />
    </>
  );
};

export default AccountSelector;
