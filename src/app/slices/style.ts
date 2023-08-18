import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface styleState {
  fontSize: 'default' | 'smaller' | 'bigger';
  darkTheme: 'light' | 'dark';
}

const initialState: styleState = {
  fontSize: 'default',
  darkTheme: 'light',
};

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    updateStyle: (
      state,
      action: PayloadAction<'default' | 'smaller' | 'bigger'>,
    ) => {
      state.fontSize = action.payload;
    },
    updateDarkTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.darkTheme = action.payload;
    },
  },
});

export const {updateDarkTheme, updateStyle} = styleSlice.actions;
export default styleSlice.reducer;
