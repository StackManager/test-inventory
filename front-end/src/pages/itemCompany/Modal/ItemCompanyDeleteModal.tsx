import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { itemCompanyDelete, itemCompanyList } from "../../../reducers/itemCompany/itemCompanyServices";
import { AppThunkDispatch } from "../../../store/store";
import { capitalName } from "../../../utils/functions/strings";
import { itemCompanyAttrs } from "../../../reducers/company/Interfaces";

export const ItemCompanyDeleteModal = ({item}: {item: itemCompanyAttrs}) =>{

  const dispatch = useDispatch<AppThunkDispatch>();

  const [modalShow, setModalShow] = useState(false);

  const companyToggleHandler = () =>{
    setModalShow(!modalShow);
  }

  const companyDeleteHandler = async () =>{
    let id = item.id || ""
    await dispatch(itemCompanyDelete({itemId: id}));
    await dispatch(itemCompanyList({companyId: item.company}));
  }

  return (
      <>
        <ModalWrapper 
          title="Do you want to delete this item?"
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