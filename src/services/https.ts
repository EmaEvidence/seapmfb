import axios from 'axios';
import Toast from 'react-native-toast-message';
import {updateLoader} from '../app/actions/loader';
import {config} from '../config';
import toaster from '../utils/toaster';
import { err } from 'react-native-svg/lib/typescript/xml';

const genericError = 'An Error Occurred';
const {url} = config.dev;

const handleError = (error: any, errorMsg: string) => {
  console.log(error.response)
  if (
    error.request.status === 0 ||
    error.request._response ===
      'An SSL error has occurred and a secure connection to the server cannot be made.'
  ) {
    toaster(
      'Error',
      'Unable to establish connection to the Bank at the moment! Please try again later.',
      'custom',
    );
    return;
  }
  if (error?.response?.status === 401 || error.request?.status === 401) {
    // delete axios.defaults.headers.common.Authorization;
    // toaster('Error', 'Your session has expired error handler!', 'custom');
    return;
  }
  if (error.response) {
    const msg =
      error.response.data.errorMessage ||
      error.response.data.message ||
      errorMsg ||
      genericError;
    toaster('Failure', msg, 'custom');
  } else {
    toaster('Failure', error || errorMsg || genericError, 'custom');
  }
};

export const getCalls = async (path: string, errorMsg: string, showLoader = true) => {
  Toast.hide();
  try {
    showLoader && updateLoader(true);
    const resp = await axios.get(`${url}${path}`);
    if (resp) {
      updateLoader(false);
    }
    return resp;
  } catch (error) {
    updateLoader(false);
    handleError(error, errorMsg);
  }
};

export const postCalls = async (
  path: string,
  data: Record<string, any>,
  errorMsg: string,
) => {
  Toast.hide();
  try {
    updateLoader(true);
    const resp = await axios.post(`${url}${path}`, data);
    if (resp) {
      updateLoader(false);
    }
    return resp;
  } catch (error) {
    updateLoader(false);
    // @ts-ignore
    handleError(error, errorMsg);
    return error;
  }
};

export const putCalls = () => {};
