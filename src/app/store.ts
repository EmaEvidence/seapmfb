import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './slices/auth';
import languageReducer from './slices/language';
import loaderReducer from './slices/loader';
import accountReducer from './slices/acount';
import paymentReducer from './slices/payment';
import styleReducer from './slices/style';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    lang: languageReducer,
    loader: loaderReducer,
    account: accountReducer,
    payment: paymentReducer,
    style: styleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
