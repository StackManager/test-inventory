
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios/instance';
import { itemCompanyAttrs } from '../company/Interfaces';

//Information API/REST
//get /api/company/list
//get /api/company/6407d90c7598dfa4874de7bd
//post /api/company/create
//put api/company/6408d7b9c1e3d14f5809ebfd
//delete /api/company/6408d7b9c1e3d14f5809ebfd

// Creamos un thunk para hacer la petición list
export interface idPayload{
  companyId: string
}

interface RegisterError {
  message: string;
}

export const itemCompanyList = createAsyncThunk
< void,
  idPayload,
  { rejectValue: RegisterError }
>
(
  'itemCompany/list',
  async ({companyId} , { rejectWithValue }) => {
  
    try {

      const response = await axiosInstance.get(
        '/api/item/list/company/'+companyId,
      );
      return response.data;

  } catch (error) {

      return rejectWithValue({
        message: "Somenthing was wrong",
      });
  }
});

export const itemCompanyCreate = createAsyncThunk
< itemCompanyAttrs,
  itemCompanyAttrs,
  { rejectValue: RegisterError }
>
(
  'itemCompany/create',
  async ({name, description, price, companyId} , { rejectWithValue }) => {
  
    try {

      const response = await axiosInstance.post(
        '/api/item/create',
        {name, description, price, companyId}
      );
      return response.data;

  } catch (error) {

      return rejectWithValue({
        message: "Somenthing was wrong",
      });
  }
});


export interface idPayloadItem{
  itemId: string
}

export const itemCompanyDelete = createAsyncThunk
< void,
  idPayloadItem,
  { rejectValue: RegisterError }
>
(
  'itemCompany/delete',
  async ({itemId} , { rejectWithValue }) => {
  
    try {

      const response = await axiosInstance.delete(
        '/api/item/'+itemId,
      );
      return response.data;

  } catch (error) {

      return rejectWithValue({
        message: "Somenthing was wrong",
      });
  }
});