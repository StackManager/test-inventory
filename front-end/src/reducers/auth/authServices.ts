
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAttrs } from '../../utils/interfaces/auth/authInterfaces';
import axiosInstance from '../../utils/axios/instance';

//Information
// post /api/auth/signup
// post /api/auth/signin
// get /api/auth/currentuser
// post /api/auth/signout

interface RegisterUserError {
  message: string;
}

export const signup = createAsyncThunk
<
  AuthAttrs,
  AuthAttrs,
  { rejectValue: RegisterUserError }
>(
  'auth/signup', 
  async ({ email, password, role }, { rejectWithValue }) => {
  
    try {

      const response = await axiosInstance.post<AuthAttrs>(
        '/api/auth/signup',
        { email, password, role }
      );
      return response.data;

  } catch (error) {

      return rejectWithValue({
        message: "Somenthing was wrong",
      });
  }
});


export const signin = createAsyncThunk
<
  AuthAttrs,
  AuthAttrs,
  { rejectValue: RegisterUserError }
>(
  'auth/signin', 
  async ({ email, password }, { rejectWithValue }) => {
  
    try {

      const response = await axiosInstance.post<AuthAttrs>(
        '/api/auth/signin',
        { email, password }
      );
      return response.data;

  } catch (error) {
      
      return rejectWithValue({
        message: "Somenthing was wrong",
      });
  }
});


// Create thunk currentuser
export const currentuser = createAsyncThunk(
  'auth/currentuser',
  async (form) => {
    const response = await axiosInstance.post<AuthAttrs>
    ('/api/auth/currentuser');
    
    return response.data;
  }
);

// Create thunk signout
export const signout = createAsyncThunk(
  'auth/signout',
  async (form) => {
    const response = await axiosInstance.post
    ('/api/auth/signout');
    
    return response.data;
  }
);