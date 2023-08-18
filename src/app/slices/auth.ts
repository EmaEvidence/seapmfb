import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

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

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  showVerificationPending: boolean;
  authType: number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  showVerificationPending: false,
  authType: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setShowVerificationPending: (state, action: PayloadAction<boolean>) => {
      state.showVerificationPending = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    update: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAuthType: (state, action: PayloadAction<number>) => {
      state.authType = action.payload;
    },
    updateUserType: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.usertype = action.payload;
      }
    },
  },
});

export const {
  login,
  logout,
  update,
  updateUserType,
  setAuthType,
  setShowVerificationPending,
} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
