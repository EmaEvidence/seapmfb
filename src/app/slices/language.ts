import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

export type langType = 'en' | 'yr' | 'ig' | 'hu';

interface LanguageState {
  selectedLang: langType;
}

const initialState: LanguageState = {
  selectedLang: 'en',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateLang: (state, action: PayloadAction<langType>) => {
      state.selectedLang = action.payload;
    },
  },
});

export const {updateLang} = languageSlice.actions;

export const selectedLang = (state: RootState) => state.lang.selectedLang;

export default languageSlice.reducer;
