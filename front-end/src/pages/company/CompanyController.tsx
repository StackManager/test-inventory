import TableCompany from "./Table/TableCompany";
import { useDispatch, useSelector } from 'react-redux';
import { CompanyGlobalStateAttrs } from "../../reducers/company/Interfaces";
import { AppThunkDispatch } from '../../store/store';
import { useEffect } from "react";
import { companyList } from "../../reducers/company/Services";
import { CompanyAddModal } from "./Modal/CompanyCreateModal";


function ControllerTableCompany() {

  const {status, error, data } = useSelector((state: { company: CompanyGlobalStateAttrs }) => state.company.list);
  const dispatch = useDispatch<AppThunkDispatch>();
  const dataLength = (Array.isArray(data))? data.length : 0;

  useEffect(() => {
    dispatch(companyList());
  }, [dispatch]);


  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <h1>Companies</h1>
        </div>

        <div className="col-lg-4 col-md-6"></div>

        <div className="col-lg-4 col-md-6">
          <CompanyAddModal></CompanyAddModal>
        </div>
      </div>

      {
        (status == 'failed' && typeof error === 'string')  && <div className="alert alert-warning" role="alert">
          {error}
        </div>
      }

      {
        (status == 'succeeded' && dataLength > 0) && 
        <TableCompany companies={data}></TableCompany>
      }

      {
        (status == 'succeeded' && dataLength == 0) && 
        <div className="alert alert-danger" role="alert">
          This company currently has no products, please proceed to a registrar.
        </div>
      }

      {
        (status == 'idle' || status == 'loading') && 
        <div className="placeholder-glow text-center">
          <span className="placeholder col-12 big"></span>
          <p className="mt-1">...Loading</p>
        </div>
      }
    </>
  );
}

export default ControllerTableCompany;