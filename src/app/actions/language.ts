import {langType, updateLang} from '../slices/language';

export const updateLanguage = (lang: langType, dispatch: any) => {
  dispatch(updateLang(lang));
};
