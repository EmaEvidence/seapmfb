import {createSlice} from '@reduxjs/toolkit';
import {logout} from './auth';

interface PaymentState {
  categories: Array<Record<string, string>> | null;
  categoryBillers: Record<string, Array<Record<string, string>>>;
  billerDetails: Record<string, Record<string, string>>;
  serviceFeeObj: Record<string, Record<string, string>>;
  dataBundles: Record<string, Array<Record<string, string>>>;
  packages: Record<string, Array<Record<string, string>>>;
  addOns: Record<string, Array<Record<string, string>>>;
}

const initialState: PaymentState = {
  categories: null,
  categoryBillers: {},
  billerDetails: {},
  serviceFeeObj: {},
  dataBundles: {},
  packages: {},
  addOns: {},
};

export const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoryBiller: (state, action) => {
      state.categoryBillers[action.payload.categoryId] = action.payload.billers;
    },
    setBillerDetails: (state, action) => {
      state.billerDetails[action.payload.serviceId] = action.payload.detail;
    },
    setServiceFee: (state, action) => {
      state.serviceFeeObj[action.payload.serviceId] = action.payload.detail;
    },
    setBundles: (state, action) => {
      state.dataBundles[action.payload.operatorId] = action.payload.bundles;
    },
    setPackages: (state, action) => {
      state.packages[action.payload.serviceId] = action.payload.packages;
    },
    setAddOns: (state, action) => {
      state.addOns[action.payload.packageId] = action.payload.addOns;
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, state => {
      state = {...initialState};
      return state;
    });
  },
});

export const {
  setCategories,
  setCategoryBiller,
  setBillerDetails,
  setServiceFee,
  setBundles,
  setAddOns,
  setPackages,
} = PaymentSlice.actions;

export default PaymentSlice.reducer;
