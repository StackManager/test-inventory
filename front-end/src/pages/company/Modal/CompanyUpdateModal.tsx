import { useRef, useState } from "react";
import { FaPenSquare,  } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { companyUpdate, companyList } from "../../../reducers/company/Services";
import { AppThunkDispatch } from "../../../store/store";
import { CompanyAttrs } from "../../../reducers/company/Interfaces";
import {FormCompany} from "../Form/FormCompany";

export const CompanyUpdateModal = ({item}: {item: CompanyAttrs}) =>{

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

  const companyActionHandler = async (values: CompanyAttrs) =>{
    const {name, address, nit, phone } = values;
    const id = item.id || "";
    //await dispatch(companyUpdate({name, address, nit, phone, id}));
    await dispatch(companyList());
  }
  //onSubmitHandler={companyActionHandler}
  return (
      <>
        <ModalWrapper 
          title="Do you want to update the data?"
          show={modalShow} 
          handleClose={companyToggleHandler} 
          handleShow={callSubmit} >
            
            <FormCompany 
              ref={formRef} 
              onSubmitHandler={companyActionHandler}
              name={item.name} 
              address={item.address}
              nit={item.nit}
              phone={item.phone}
              status="success" ></FormCompany>
        
        </ModalWrapper>

        <FaPenSquare className="icon-event" onClick={()=>{companyToggleHandler()}}/>
      </>
  )


}