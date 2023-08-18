import {updateLoading} from '../slices/loader';
import {appDispatch} from '../store';

export const updateDarkTheme = (val: boolean) => {
  appDispatch(updateLoading(val));
};

export const updateFontSize = (val: boolean) => {
  appDispatch(updateLoading(val));
};
