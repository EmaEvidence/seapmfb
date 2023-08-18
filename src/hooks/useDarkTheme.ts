import {useEffect, useState} from 'react';
import {useAppSelector} from '../app/hooks';
import getLanguage from '../lang';

const useLanguage = (key?: 'en' | 'yr' | 'hu' | 'ig') => {
  const [lang, setLang] = useState<Record<string, string>>({});
  const selectedLang = useAppSelector(state => state.lang.selectedLang);
  useEffect(() => {
    if (key) {
      setLang(getLanguage(key));
    } else {
      setLang(getLanguage(selectedLang));
    }
  }, [selectedLang, key]);

  return {lang};
};

export default useLanguage;
