import {createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { CompanyGlobalStateAttrs } from './Interfaces';
import { companyDefault } from './Defaults';
import { companyList, companyCreate } from './Services';
import { 
  companyCreateFulFilled, 
  companyCreatePending, 
  companyCreateRejected, 
  companyListPending,
  companyListFulFilled,
  companyListRejected } from './ReducerExtra';


// Slice to companySlice
const companySlice = createSlice({
  name: 'company',
  initialState: { ...companyDefault } as unknown as CompanyGlobalStateAttrs,
  reducers: {
    setResetErrors:(state) => {
      state.create.status = 'idle';
      state.create.error = undefined;
      state.create.data = {}
    },
    setDeleteError:(state, action: PayloadAction<string>) => {
      
      if (state['create'].error?.fields?.errors?.length && state['create'].error?.fields?.errors?.length > 0){
        let filterError = state['create'].error?.fields?.errors.filter((e) => action.payload != e.field)
        state['create'].error.fields.errors = filterError;
      }
    },
    setSelectedCompany: (state, action: PayloadAction<any>) => {
      //state.companyId = action.payload;
    },
    setResetCompany: (state) => {
      //state.companies = []
      //state.companyId = undefined
      //state.status = 'idle'
      //state.error = null
    }
  },
  extraReducers: (builder) => {

    builder
    //List Action
     .addCase(companyList.pending, companyListPending)
     .addCase(companyList.fulfilled, companyListFulFilled)
     .addCase(companyList.rejected, companyListRejected)

    //Create Action
    .addCase(companyCreate.pending, companyCreatePending)
    .addCase(companyCreate.fulfilled, companyCreateFulFilled)
    .addCase(companyCreate.rejected, companyCreateRejected)
  
  }
});


export const { 
  setSelectedCompany, 
  setResetCompany,
  setResetErrors,
  setDeleteError } = companySlice.actions;
export default companySlice.reducer;