import {useAppSelector} from '../app/hooks';

const useLanguage = () => {
  const {fontSize, darkTheme} = useAppSelector(state => state.style);
  return {fontSize, darkTheme};
};

export default useLanguage;
