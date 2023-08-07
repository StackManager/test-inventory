import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { capitalName } from "../../../utils/functions/strings";
import { itemCompanyAttrs } from "../../../reducers/company/Interfaces";


export const ItemCompanyReadModal = ({item}: {item: itemCompanyAttrs}) =>{
  const [readEvent, setReadEvent] = useState(false);

  const companyToggleReadHandler = () =>{
    setReadEvent(!readEvent);
  }

  return (
      <>
        <ModalWrapper 
          title="Item Information"
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

        <FaRegEye className="icon-event" onClick={()=>{companyToggleReadHandler()}}/>
      </>
  )


}