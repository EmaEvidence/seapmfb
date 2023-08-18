import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import {logout} from './auth';

export interface User {
  email: string;
  name: string;
  usertype: string;
  address: string;
  country: string;
  email_verified_at: string;
  first_name: string;
  id: number;
  image: string;
  last_name: string;
  phone: string;
  state: string;
  bvn: string;
  nimc: string;
}

interface HistoryPayload {
  acc: number;
  data: Array<Record<string, string>>;
}

interface AccountState {
  history: Record<number, Array<Record<string, string>> | null>;
  debits: Array<Record<string, string>> | null;
  summary: Array<Record<string, string>> | null;
  accounts: Array<Record<string, string>> | null;
  bankList: Array<Record<string, string>> | null;
  beneficiaries: Record<number, Array<Record<string, string>> | null> | {};
}

const initialState: AccountState = {
  debits: null,
  history: {},
  summary: null,
  accounts: null,
  bankList: null,
  beneficiaries: {},
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setHistory: (state, action: PayloadAction<HistoryPayload>) => {
      state.history[action.payload.acc] = action.payload.data;
    },
    addBank: (state, action) => {
      state.bankList = action.payload;
    },
    addBeneficiaries: (state, action) => {
      // @ts-ignore
      state.beneficiaries[action.payload.type] = action.payload.data;
    },
    removeBeneficiary: (state, action) => {
      // @ts-ignore
      state.beneficiaries[action.payload.type] = state.beneficiaries[
        action.payload.type
      ].filter((item: {id: any}) => {
        if (item.id !== action.payload.data.beneficiaryId) {
          return item;
        }
      });
    },
    setDebits: (state, action) => {
      state.debits = action.payload.debits;
    },
    addDebit: (state, action) => {
      state.debits?.push(action.payload.debit);
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
  setSummary,
  setHistory,
  addBeneficiaries,
  removeBeneficiary,
  addBank,
  setAccounts,
  setDebits,
  addDebit,
} = accountSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default accountSlice.reducer;
