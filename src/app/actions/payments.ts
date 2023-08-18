// import useLanguage from '../../hooks/useLanguage';
import {getCalls, postCalls} from '../../services/https';
import {
  setAddOns,
  setBillerDetails,
  setBundles,
  setCategories,
  setCategoryBiller,
  setPackages,
  setServiceFee,
} from '../slices/payment';
import {appDispatch} from '../store';

export const getCategories = async () => {
  const response = await getCalls('BillsPayment/categories', '');
  if (response?.status === 200) {
    appDispatch(setCategories(response.data.billersCategories));
  } else {
    appDispatch(setCategories([]));
  }
  return response;
};

export const getBillers = async (categoryId: string) => {
  const resp = await getCalls(`BillsPayment/billers/${categoryId}`, '');
  if (resp?.status === 200) {
    appDispatch(
      setCategoryBiller({categoryId, billers: resp?.data.serviceProviders}),
    );
  }
  return resp;
};

export const getBillerDetails = async (serviceId: string) => {
  const resp = await getCalls(`BillsPayment/biller/${serviceId}`, '');
  if (resp?.status === 200) {
    appDispatch(setBillerDetails({serviceId, detail: resp?.data}));
  }
  return resp;
};

export const getBillerServiceCharge = async (serviceId: string) => {
  const resp = await getCalls(`BillsPayment/biller/Fees/${serviceId}`, '');
  if (resp?.status === 200) {
    appDispatch(setServiceFee({serviceId, detail: resp?.data}));
  }
  return resp;
};

export const validateService = (data: Record<string, string>) => {
  return postCalls('BillsPayment/validate', data, '');
};

export const getBillerPackages = async (serviceId: string) => {
  const resp = await getCalls(`BillsPayment/biller/${serviceId}/packages`, '');
  if (resp?.status === 200) {
    appDispatch(setPackages({serviceId, packages: resp?.data.packages}));
  }
  return resp;
};

export const getBillerPackageAddOn = async (
  serviceId: string,
  packageId: string,
) => {
  const resp = await getCalls(
    `BillsPayment/biller/${serviceId}/${packageId}/addons`,
    '',
  );
  // @ts-ignore
  if (resp?.status === 200) {
    // @ts-ignore
    appDispatch(setAddOns({packageId, addOns: resp?.data.packages}));
  }
  return resp;
};

export const getBillerServiceBundles = async (operatorId: string) => {
  const resp = await getCalls(`BillsPayment/${operatorId}/bundles`, '');
  if (resp?.status === 200) {
    appDispatch(setBundles({operatorId, bundles: resp?.data.bundles}));
  }
  return resp;
};

export const billPayment = async (
  data: Record<string, string | number | Record<string, number | string>>,
) => {
  return postCalls('BillsPayment/process', data, '');
};
