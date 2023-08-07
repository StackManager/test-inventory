
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestApi } from '../../utils/axios';
import { CompanyAttrs } from './Interfaces';

// Creamos un thunk para hacer la petición read
export const companyList = createAsyncThunk<CompanyAttrs[] >(
  'company/list', 
  async () => {
  const data = await requestApi<CompanyAttrs[]>('/api/company/list');
  return data;
});


export const companyCreate = createAsyncThunk<CompanyAttrs, CompanyAttrs, { rejectValue: any }>(
  'company/create', 
  async (form, { rejectWithValue } ) => {

    try {
      const data = await requestApi<CompanyAttrs >('api/company/create', { method: "POST", data: form });
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }

});


export const companyUpdate = createAsyncThunk<CompanyAttrs[]>(
  'company/update', 
  async () => {
  const data = await requestApi<CompanyAttrs[]>('/api/items');
  return data;
});


export const companyDelete = createAsyncThunk<CompanyAttrs[]>(
  'company/delete', 
  async () => {
  const data = await requestApi<CompanyAttrs[]>('/api/items');
  return data;
});

export const companyDownload = createAsyncThunk<CompanyAttrs[]>(
  'company/downloadPDF', 
  async () => {
  const data = await requestApi<CompanyAttrs[]>('/api/items');
  return data;
});


/*export const companyList = createAsyncThunk(
  'company/list',
  async () => {

    const response = await requestApi
    
    //.get<CompanyAttrs>
    //('/api/company/list', {headers: {'Content-Type': 'application/json'}, withCredentials : true});
    
    return response.data;
  }
);*/



// export const companyCreate = createAsyncThunk
// < CompanyAttrs,
//   CompanyAttrs,
//   { rejectValue: RegisterError }
// >
// (
//   'company/create',
//   async ({name, address, nit, phone} , { rejectWithValue }) => {
  
//     try {
//       console.log(1);
//       const response = await axiosInstance.post(
//         'api/company/create',
//         {name, address, nit, phone}
//       );
//       return response.data;

//   } catch (error) {

//       return rejectWithValue({
//         message: "Somenthing was wrong",
//       });
//   }
// });


// export const companyUpdate = createAsyncThunk
// < CompanyAttrs,
//   CompanyAttrs,
//   { rejectValue: RegisterError }
// >
// (
//   'company/update',
//   async ({name, address, nit, phone, id} , { rejectWithValue }) => {
  
//     try {

//       const response = await axiosInstance.put(
//         'api/company/'+id,
//         {name, address, nit, phone}
//       );
//       return response.data;

//   } catch (error) {

//       return rejectWithValue({
//         message: "Somenthing was wrong",
//       });
//   }
// });



// export interface idCompanyPayload{
//   companyId: string
// }

// export const companyDelete = createAsyncThunk
// < void,
//   idCompanyPayload,
//   { rejectValue: RegisterError }
// >
// (
//   'company/delete',
//   async ({companyId} , { rejectWithValue }) => {
  
//     try {

//       const response = await axiosInstance.delete(
//         'api/company/'+companyId,
//       );
//       return response.data;

//   } catch (error) {

//       return rejectWithValue({
//         message: "Somenthing was wrong",
//       });
//   }
// });

// export const companyDownload = createAsyncThunk
// < void,
//   idCompanyPayload,
//   { rejectValue: RegisterError }
// >
// (
//   'company/pdf',
//   async ({companyId} , { rejectWithValue }) => {
  
//     try {

//       const response = await axiosInstance.get(
//         '/api/item/list/company/'+companyId+'/pdf',{
//           responseType: "blob",
//         }
//       );

//       if (response.status == 200){
//             // create file link in browser's memory
//           const href = URL.createObjectURL(response.data);

//           // create "a" HTML element with href to file & click
//           const link = document.createElement('a');
//           link.href = href;
//           link.setAttribute('download', 'file.pdf'); //or any other extension
//           document.body.appendChild(link);
//           link.click();

//           // clean up "a" element & remove ObjectURL
//           document.body.removeChild(link);
//           URL.revokeObjectURL(href);
//       }

//       return response.data;

//   } catch (error) {

//       return rejectWithValue({
//         message: "Somenthing was wrong",
//       });
//   }
// });