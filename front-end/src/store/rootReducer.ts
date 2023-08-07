import { combineReducers } from 'redux';
import authSlice from '../reducers/auth/authReducer'
import companySlice from '../reducers/company/Reducer'
import itemsCompanySlice from '../reducers/itemCompany/itemCompanyReducer'

const rootReducer = combineReducers({
  auth: authSlice,
  company: companySlice,
  itemCompany: itemsCompanySlice
});

export default rootReducer;