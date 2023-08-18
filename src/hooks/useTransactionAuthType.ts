import {useEffect, useState} from 'react';
import {loadItem} from '../utils/localStorage';
import {transactionAuthTypes} from '../utils/constants';
import {useAppSelector} from '../app/hooks';

export const useTransactionAuthType = () => {
  const storeAuthType = useAppSelector(state => state.auth.authType);
  const [type, setType] = useState<null | string>(null);
  useEffect(() => {
    const getType = async () => {
      const authType = await loadItem('isMFASet');
      setType(authType);
    };
    getType();
  }, [storeAuthType]);

  return {
    type,
    authName: type ? transactionAuthTypes[parseInt(type, 10) - 1] : '',
  };
};

export default useTransactionAuthType;
