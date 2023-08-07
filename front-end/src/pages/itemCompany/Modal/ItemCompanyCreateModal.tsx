import { useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { idPayload, itemCompanyCreate, itemCompanyList } from "../../../reducers/itemCompany/itemCompanyServices";
import { AppThunkDispatch } from "../../../store/store";
import { itemCompanyAttrs } from "../../../reducers/company/Interfaces";
import {FormItemsCompany} from "../Form/FormItemsCompany";

export const ItemCompanyCreateModal = ({companyId}:idPayload) =>{

  const dispatch = useDispatch<AppThunkDispatch>();
  const [modalShow, setModalShow] = useState(false);
  const formRef = useRef<HTMLButtonElement>(null);

  const callSubmit = () => {
      if (formRef.current != null)
        formRef.current.click();
        //current.handleSubmit(values, actions);
  }

  const companyToggleHandler = () =>{
    setModalShow(!modalShow);
  }

  const companyActionHandler = async (values: itemCompanyAttrs) =>{
    const {name, description, price } = values;
    await dispatch(itemCompanyCreate({name, description, price, companyId}));
    await dispatch(itemCompanyList({companyId}));
  }
  //onSubmitHandler={companyActionHandler}
  return (
      <>
        <ModalWrapper 
          title="Create a new item"
          show={modalShow} 
          handleClose={companyToggleHandler} 
          handleShow={callSubmit} >
            
            <FormItemsCompany 
              ref={formRef} 
              onSubmitHandler={companyActionHandler}
              name="" 
              description=""
              price=""
              status="success" ></FormItemsCompany>
        
        </ModalWrapper>

        <button type="button" className="btn btn-success float-end" onClick={()=>{companyToggleHandler()}} >
                  Add <FaPlusCircle className="icon-event" />
        </button>
      </>
  )


}