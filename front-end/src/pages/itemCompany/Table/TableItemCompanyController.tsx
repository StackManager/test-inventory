import { useDispatch, useSelector } from 'react-redux';
import { CompanyStateAttrs, itemCompanyStateAttrs } from "../../../reducers/company/Interfaces";
import { AppThunkDispatch } from '../../../store/store';
import { useEffect } from "react";
import TableItemCompany from "./TableItemCompany";
import { itemCompanyList } from '../../../reducers/itemCompany/itemCompanyServices';
import { ItemCompanyCreateModal } from '../Modal/ItemCompanyCreateModal';


function TableItemCompanyController() {

  // const {companyId} = useSelector((state: { company: CompanyStateAttrs }) => state.company);
  // const {status, error, itemsCompany } = useSelector((state: { itemCompany: itemCompanyStateAttrs }) => state.itemCompany);
  // const dispatch = useDispatch<AppThunkDispatch>();
  
  // useEffect(() => {
  //   if (companyId != null && companyId != undefined && companyId != "") 
  //     dispatch(itemCompanyList({companyId}));
  // }, [dispatch, companyId]);


  return (
    <>
      {/* <div className="row">
        <div className="col-lg-4 col-md-12">
          <h1>Items Companies</h1>
        </div>

        <div className="col-lg-4 col-md-6">

        </div>

        <div className="col-lg-4 col-md-6">
          {(companyId != null && companyId != undefined && companyId != "") && <ItemCompanyCreateModal companyId={companyId} />}
        </div>
      </div>

      {(status == 'failed') && <div className="alert alert-warning" role="alert">
        {error}
      </div>}

      {(status == 'succeeded' && itemsCompany.length > 0) && <TableItemCompany itemsCompany={itemsCompany}></TableItemCompany>}


      {(status == 'succeeded' && itemsCompany.length == 0) && <div className="alert alert-danger" role="alert">
        We do not have registered companies, proceed to register.
      </div>}

      {(status == 'idle' || status == 'loading') && <div className="placeholder-glow text-center">
        <span className="placeholder col-12 big"></span>
        <p className="mt-1">...Loading</p>
      </div>} */}
    </>
  );
}

export default TableItemCompanyController;