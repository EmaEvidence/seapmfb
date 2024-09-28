// import useLanguage from '../../hooks/useLanguage';
import {getCalls, postCalls} from '../../services/https';
import {saveItem} from '../../utils/localStorage';
import {setAuthType} from '../slices/auth';
import {appDispatch} from '../store';

export const accountVerify = async (account: string) => {
  return getCalls(`Account/Verify/${account}`, '');
};
// resendOTPCall
export const requestOTPCallUnAuth = async (accountNumber: string) => {
  return postCalls('Account/deviceReg/requestOtp', {accountNumber}, '');
};

export const requestOTPAuth = async (accountNumber: string) => {
  return postCalls('Account/deviceReg/resendOtp', {accountNumber}, '');
};

export const resendOTPCallUnAuth = async (accountNumber: string) => {
  return postCalls('Account/resendOtp', {accountNumber}, '');
};

// requestOTPCall
export const requestOTPCallAuth = async () => {
  return getCalls('auth/requestOtp', '');
};

export const confirmEnrollment = async (data: Record<string, string>) => {
  return postCalls('Account/ConfirmEnrollment', data, '');
};

export const loginCall = async (data: Record<string, string>) => {
  return postCalls('app/login', data, '');
};

export const resetPassword = async (data: Record<string, string>) => {
  return postCalls('Account/resetPassword', data, '');
};

export const getBranches = async () => {
  return getCalls('Onboarding/ListBranches', '');
};

export const getSEAPAccountCall = async (data: Record<string, string | number>) => {
  return postCalls('Onboarding/Create', data, '');
};

export const setAuthTypeCall = async (data: Record<string, any>) => {
  const resp = await postCalls(
    'Auth/Transaction/setAuthMethod',
    // @ts-ignore
    {authType: parseInt(data.authType, 10)},
    '',
  );
  // @ts-ignore
  if (resp?.status === 200) {
    appDispatch(setAuthType(data.authType as unknown as number));
    saveItem('isMFASet', data.authType.toString());
    saveItem('authType', data.authType.toString());
    return resp;
  }
  // @ts-ignore
  return resp;
};

export const setTransactionPassword = async (data: Record<string, string>) => {
  return postCalls('auth/transaction/setPassword', data, '');
};

export const setTransactionBiometric = async (
  data: Record<string, string | boolean>,
) => {
  return postCalls('auth/transaction/setBiometric', data, '');
};

export const setTransactionPin = async (data: Record<string, string>) => {
  return postCalls('auth/transaction/setPin', data, '');
};

export const updateTransactionPassword = async (data: any) => {
  return postCalls('auth/transaction/updatePassword', data, '');
};

export const updateTransactionPin = async (data: Record<string, string>) => {
  return postCalls('auth/transaction/updatePin', data, '');
};

export const resetTransactionPin = async (data: Record<string, string>) => {
  return postCalls('auth/transaction/resetPin', data, '');
};

export const resetTransactionPassword = async (data: any) => {
  return postCalls('auth/transaction/resetPassword', data, '');
};

export const resetSecret = async (data: Record<string, string>) => {
  return postCalls('auth/transaction/resetSecret', data, '');
};

export const enrollDevice = async (data: Record<string, string>) => {
  return postCalls('Account/registerdevice', data, '');
};

export const confirmOverwrite = async (data: Record<string, string>) => {
  return postCalls('Account/confirmDevice', data, '');
};

export const loginWithrefreshToken = async () => {
  return postCalls('app/token/refresh', {}, '');
};

