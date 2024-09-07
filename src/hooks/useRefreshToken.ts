import {useEffect, useState} from 'react';
import { loadItem } from '../utils/localStorage';

const useRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState('');
  const [name, setName] = useState('');
  
  const getToken = async () => {
    const token = await loadItem('refreshToken');
    const user = await loadItem('user');
    const userObj = user && JSON.parse(user);
    setName(JSON.parse(userObj).Name);
    setRefreshToken(token || '');
  }

  useEffect(() => {
    getToken();
  }, []);

  return {
    refreshToken,
    name
  };
};

export default useRefreshToken;
