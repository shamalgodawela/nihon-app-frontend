import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
  isLoggedIn: false,
  name: name ? name : '',
  user: {
    name: '',
    email: '',
  },
  invoices: [], // Add invoices to the state
};

const authSliceExe = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
    },
    SET_INVOICES(state, action) {
      state.invoices = action.payload; // Set invoices in the state
    },
  },
});

// Export actions
export const { SET_LOGIN, SET_NAME, SET_USER, SET_INVOICES } = authSliceExe.actions;

// Selectors to get state values
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectInvoices = (state) => state.auth.invoices; // Selector for invoices

export default authSliceExe.reducer;
