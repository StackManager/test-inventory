import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
// import { setResetAuth } from '../../reducers/auth/authReducer';
// import { setResetCompany } from '../../reducers/company/Reducer';
// import { setResetItemsCompany } from '../../reducers/itemCompany/itemCompanyReducer';
import { AppThunkDispatch } from '../../store/store';

export const AdminLayoutHeader = () =>{

  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  const navigateCompany = async () =>{ navigate('/dashboard');}
  const navigateLogout = async () =>{
    // dispatch(setResetAuth());
    // dispatch(setResetCompany());
    // dispatch(setResetItemsCompany());
    navigate('/');
  }

  return (
    <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Inventary</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">

            <li className="nav-item" onClick={navigateCompany}>
              <a className="nav-link"  href="#">Company</a>
            </li>
            <li className="nav-item" onClick={navigateLogout}>
              <a className="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  )
}