// import useLanguage from '../../hooks/useLanguage';
import {getCalls, postCalls} from '../../services/https';
import {
  addBank,
  setDebits,
  addBeneficiaries,
  setHistory,
  setSummary,
  setAccounts,
  removeBeneficiary,
} from '../slices/acount';
import {appDispatch} from '../store';

export const getSummary = async (showLoader = true) => {
  const resp = await getCalls('Banking/accountsummary', '', showLoader);
  if (resp) {
    appDispatch(setSummary(resp.data.accountSummary));
    return resp;
  }
};

export const getAccounts = async (showLoader = true) => {
  const resp = await getCalls('Banking/customerAccounts', '');
  if (resp) {
    appDispatch(setAccounts(resp.data.data));
    return resp;
  }
};

export const getBanks = async () => {
  const resp = await getCalls('FundTransfer/bankslist', '');
  if (resp) {
    appDispatch(addBank(resp.data.banksList));
    return resp;
  }
};

export const getBeneficiaries = async (type: number) => {
  const resp = await getCalls(`FundTransfer/beneficiaries/${type}`, '');
  if (resp) {
    appDispatch(addBeneficiaries({data: resp.data.beneficiaries, type}));
    return resp;
  }
};

export const getHistory = async (acc: number, from?: string, to?: string, showLoader = true) => {
  const url =
    to && from
      ? `Banking/account/history?accountNumber=${acc}&FromDate=${from}&ToDate=${to}&Page=1&PageSize=1000`
      : `Banking/account/history?accountNumber=${acc}&FromDate=&ToDate=&Page=&PageSize=`;
  const resp = await getCalls(url, '', showLoader);
  if (resp) {
    appDispatch(setHistory({data: resp.data?.transactions, acc}));
    return resp;
  }
};

export const getAcctName = (data: {
  accountNumber: string;
  bankCode: string;
  fundTransferType: number;
}) => {
  // @ts-ignore
  return postCalls('FundTransfer/nameenquiry', data, '');
};

export const makeNonBeneficiaryTransfer = (data: any) => {
  return postCalls('FundTransfer/initiate', data, '');
};

export const makeOwnTransfer = (data: any) => {
  return postCalls('FundTransfer/selfFundTransfer', data, '');
};

export const makeBeneficiaryTransfer = (
  data: Record<string, string | number | Record<string, string>>,
) => {
  // @ts-ignore
  return postCalls('FundTransfer/beneficiaryFundTransfer', data, '');
};

export const removeBankBeneficiary = async (data: {
  type: any;
  bene: Record<string, string>;
  typeNumber: any;
}) => {
  const resp = await postCalls(
    `${data.type}/beneficiaries/remove`,
    data.bene,
    '',
  );
  // @ts-ignore
  if (resp.status === 200) {
    appDispatch(removeBeneficiary({type: data.typeNumber, data: data.bene}));
  }
  return resp;
};

export const sendFeedback = (data: any) => {
  return postCalls('Requests/Feedback/Message', data, '');
};

export const getStatement = (data: any) => {
  return getCalls(
    `Banking/account/statement?AccountNumber=${data.account}&FromDate=${data.start}&ToDate=${data.end}&fileType=PDF`,
    '',
  );
};

export const getDebits = async (data: any) => {
  const resp = await postCalls('Transactions/debits', data, '');
  if (resp) {
    // @ts-ignore
    appDispatch(setDebits({debits: resp?.data?.transactions}));
    return resp;
  }
};

export const getDebit = async (transactionId: string) => {
  const resp = await getCalls(`Transactions/debits/${transactionId}`, '');
  if (resp) {
    return resp;
  }
};
