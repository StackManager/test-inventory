
import { FaElementor } from "react-icons/fa";
import { CompanyAttrs } from "../../../reducers/company/Interfaces";
import { CompanyDeleteModal } from "../Modal/CompanyDeleteModal";
import { CompanyReadModal } from "../Modal/CompanyReadModal";
import { CompanyUpdateModal } from "../Modal/CompanyUpdateModal";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../../store/store";
// import { setSelectedCompany } from "../../../reducers/company/Reducer";
import { CompanyPDFModal } from "../Modal/CompanyPDFModal";

function TableCompany({companies}: any) {
  const dispatch = useDispatch<AppThunkDispatch>();
  const navigate = useNavigate();
  // const companyNavigateItem = async (item: CompanyAttrs) =>{
  //   let id = item.id || undefined;

  //   if (id){
  //     await dispatch(setSelectedCompany(id))
  //     navigate('/items');
  //   }

  // }


  return (
    <> 

      <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">NIT</th>
          <th scope="col">Phone</th>
          <th scope="col">Services</th>
        </tr>
      </thead>
      <tbody>
      {companies.map((item: CompanyAttrs, index: number) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.nit}</td>
              <td>{item.phone}</td>
              <td>
                <div className="aling-flex-center">

                  {/* <FaElementor className="icon-event" onClick={()=>{companyNavigateItem(item)}}/>   */}
                  <CompanyReadModal item={item}></CompanyReadModal>
                  <CompanyDeleteModal item={item}></CompanyDeleteModal>
                  <CompanyUpdateModal item={item}></CompanyUpdateModal>
                  <CompanyPDFModal item={item}></CompanyPDFModal>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </>
  );
}

export default TableCompany;