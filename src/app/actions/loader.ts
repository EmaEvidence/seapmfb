import {updateLoading} from '../slices/loader';
import {appDispatch} from '../store';

export const updateLoader = (val: boolean) => {
  appDispatch(updateLoading(val));
};
