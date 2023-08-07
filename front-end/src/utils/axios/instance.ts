import axios from 'axios';
import { getToken } from '../../reducers/auth/authReducer';
import { REACT_APP_API_DOMAIN } from '../../store/const';


let store: any;
export const injectStore = (_store: any) => {
 store = _store
}

const instance = axios.create({
  baseURL: REACT_APP_API_DOMAIN,
  timeout: 10000,
});


const getAuthToken = () => {
  try{
    const token = store.getState().auth
    return token.auth.token;
  }catch(e){
    return "";
  }
};

const addAuthInterceptor = () => {
  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};


addAuthInterceptor();




export default instance;