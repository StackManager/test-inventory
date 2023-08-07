import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { capitalName } from "../../../utils/functions/strings";
import { CompanyAttrs } from "../../../reducers/company/Interfaces";


export const CompanyReadModal = ({item}: {item: CompanyAttrs}) =>{
  const [readEvent, setReadEvent] = useState(false);

  const companyToggleReadHandler = (item: CompanyAttrs) =>{
    setReadEvent(!readEvent);
  }

  return (
      <>
        <ModalWrapper 
          title="Company Information"
          show={readEvent} 
          handleClose={companyToggleReadHandler} 
          handleShow={undefined} >
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

        <FaRegEye className="icon-event" onClick={()=>{companyToggleReadHandler(item)}}/>
      </>
  )


}