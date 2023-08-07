import { CompanyAttrsPayload, CompanyGlobalStateAttrs } from "./Interfaces";


//Extra reducer List
export const companyListPending = (state: CompanyGlobalStateAttrs) => {
  state.list.data = {};
  state.list.status = 'loading';
  state.list.error = undefined;
}

export const companyListFulFilled = (state: CompanyGlobalStateAttrs, action: CompanyAttrsPayload) => {
  state.list.data = action.payload;
  state.list.status = 'succeeded';
  state.list.error = undefined;
}

export const companyListRejected = (state: CompanyGlobalStateAttrs, action: any) => {
  state.list.data = [];
  state.list.status = 'failed';
  state.list.error  = action.error?.message;
}


//Extra reducer Create
export const companyCreatePending = (state: CompanyGlobalStateAttrs) => {
  state.create.data = {};
  state.create.status = 'loading';
  state.create.error = undefined;
}

export const companyCreateFulFilled = (state: CompanyGlobalStateAttrs, action: CompanyAttrsPayload) => {
  state.create.data = action.payload;
  state.create.status = 'succeeded';
  state.create.error = undefined;
}

export const companyCreateRejected = (state: CompanyGlobalStateAttrs, action: any) => {
  state.create.data = [];
  state.create.status = 'failed';
  state.create.error  = action.payload;
}