import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../../utils/axios/instance';

// interface errorFields{
//   message: string,
//   field: string
// }

// interface errorRequest {
//   message: string;
//   fields?: errorFields[]; 
// }

interface FetchDataOptions<T> extends AxiosRequestConfig {
  data?: T;
}

export async function requestApi<T>(url: string, options: FetchDataOptions<T> = {}): Promise<T> {

  const { method = 'GET', data, ...axiosConfig } = options;

  try {
    const response = await axiosInstance.request<T>({
      url,
      method,
      data,
      ...axiosConfig,
    });
    return response.data;

  } catch (err: any) {

    if (err.response) {
      const { data: errorData } = err.response;

      if (typeof errorData === 'object' && errorData !== null) {
        return Promise.reject({message: "Some errors occurred", fields: {...errorData}});
      }

      return Promise.reject('Failed to fetch data');
    } else if (err.request) {
      return Promise.reject('Failed to connect to server');
    } else {
      return Promise.reject('An error occurred');
    }
  }
}
