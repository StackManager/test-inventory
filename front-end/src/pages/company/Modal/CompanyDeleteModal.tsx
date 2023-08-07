import { useState } from "react";
import { FaRegEye, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { companyDelete, companyList } from "../../../reducers/company/Services";
import { AppThunkDispatch } from "../../../store/store";
import { capitalName } from "../../../utils/functions/strings";
import { CompanyAttrs } from "../../../reducers/company/Interfaces";

export const CompanyDeleteModal = ({item}: {item: CompanyAttrs}) =>{

  const dispatch = useDispatch<AppThunkDispatch>();

  const [modalShow, setModalShow] = useState(false);

  const companyToggleHandler = () =>{
    setModalShow(!modalShow);
  }

  const companyDeleteHandler = async () =>{
    let id = item.id || ""
    //await dispatch(companyDelete({companyId: id}));
    await dispatch(companyList());
  }

  return (
      <>
        <ModalWrapper 
          title="Do you want to delete this company?"
          show={modalShow} 
          handleClose={companyToggleHandler} 
          handleShow={companyDeleteHandler} >
          <ul>

            {Object.entries(item).map(([key, value]) => {

              if (key == "id" || key == "__v")
                return null

              return (
                <li key={key}><strong>{capitalName(key)}</strong>: {value}</li>
              )
            })}
          
          </ul>
        </ModalWrapper>

        <FaTrash className="icon-event" onClick={()=>{companyToggleHandler()}}/>
      </>
  )


}