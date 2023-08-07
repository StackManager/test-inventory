import {createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { itemCompanyStateAttrs } from '../company/Interfaces';
import { itemCompanyList } from './itemCompanyServices';


// Slice to companySlice
const itemCompanySlice = createSlice({
  name: 'itemCompany',
  initialState: {
    itemsCompany: [],
    status: 'idle',
    error: null,
  } as unknown as itemCompanyStateAttrs,
  reducers: {
    setResetItemsCompany: (state) => {
      state.itemsCompany = []
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {

    builder
    .addCase(itemCompanyList.pending, itemsCompanyPending)
    .addCase(itemCompanyList.fulfilled, itemsCompanyFulFilled)
    .addCase(itemCompanyList.rejected, itemsCompanyRejected)
  }
});

const itemsCompanyPending = (state: any) => {
  state.itemsCompany = [];
  state.status = 'loading';
  state.error = undefined;
}

const itemsCompanyFulFilled = (state: any, action: any) => {
  state.itemsCompany = action.payload;
  state.status = 'succeeded';
  state.error = undefined;
}

const itemsCompanyRejected = (state: any, action: any) => {
  state.itemsCompany = [];
  state.status = 'failed';
  state.error = action.payload?.message;
}

export const { setResetItemsCompany } = itemCompanySlice.actions;
export default itemCompanySlice.reducer;