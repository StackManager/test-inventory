import {createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateAttrs } from '../../utils/interfaces/auth/authInterfaces';
import { signup, signin, currentuser, signout } from './authServices';

// Slice to authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {},
    status: 'idle',
    error: null,
  } as unknown as AuthStateAttrs,
  reducers: {
    setResetAuth: (state) => {
      state.auth = {}
      state.status = 'idle'
      state.error = undefined
    }
  },
  extraReducers: (builder) => {

    builder
    .addCase(signup.pending, authPending)
    .addCase(signup.fulfilled, authFulFilled)
    .addCase(signup.rejected, authRejected)
    .addCase(signin.pending, authPending)
    .addCase(signin.fulfilled, authFulFilled)
    .addCase(signin.rejected, authRejected)
  }
});

const authPending = (state: any) => {
  state.status = 'loading';
  state.error = undefined;
}

const authFulFilled = (state: any, action: any) => {
  state.auth = action.payload;
  state.status = 'succeeded';
  state.error = undefined;
}

const authRejected = (state: any, action: any) => {
  state.status = 'failed';
  state.error = action.payload?.message;
}

export const getToken = (state: any) => state.auth.token;
export const { setResetAuth } = authSlice.actions;
export default authSlice.reducer;