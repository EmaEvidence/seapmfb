import {useEffect, useState} from 'react';
import {useAppSelector} from '../app/hooks';
import {loadItem} from '../utils/localStorage';

export const useUser = () => {
  const [user, setUser] = useState<null | Record<string, string>>(null);
  const [userLoading, setLoading] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    let savedUser: string | null = await loadItem('user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser) as Record<string, string>;
      setUser(userObj);
      setIsEditor(userObj.role === 'editor');
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  return {user, userLoading, isEditor, isAuthenticated};
};

export default useUser;
