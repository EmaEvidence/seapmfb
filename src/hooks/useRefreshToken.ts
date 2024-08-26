import {useEffect, useState} from 'react';
import { loadItem } from '../utils/localStorage';

const useRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState('');
  
  const getToken = async () => {
    const token = await loadItem('refreshToken');
    setRefreshToken(token || '');
  }

  useEffect(() => {
    getToken();
  }, []);

  return {
    refreshToken
  };
};

export default useRefreshToken;
