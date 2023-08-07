import { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../../components/modal/modalWrapper";

import { AppThunkDispatch } from "../../../store/store";
import { CompanyAttrs  } from "../../../reducers/company/Interfaces";
import {FormCompany} from "../Form/FormCompany";


export const CompanyAddModal = () =>{

  const formRef = useRef<HTMLButtonElement>(null);
  
  const [modalShow, setModalShow] = useState(false);

  const callSubmit = () => {
      if (formRef.current != null)
        formRef.current.click();
  }

  const companyToggleHandler = () =>{
    setModalShow(!modalShow);
  }

  return (
      <>
        <ModalWrapper 
          title="Create a new Company"
          show={modalShow} 
          handleClose={companyToggleHandler} 
          handleShow={callSubmit} >
            
            <FormCompany 
              ref={formRef} 
              name="" 
              address=""
              nit=""
              phone=""
              status="success" ></FormCompany>
        
        </ModalWrapper>

        <button type="button" className="btn btn-success float-end" onClick={()=>{companyToggleHandler()}} >
                  Add <FaPlusCircle className="icon-event" />
        </button>
      </>
  )


}