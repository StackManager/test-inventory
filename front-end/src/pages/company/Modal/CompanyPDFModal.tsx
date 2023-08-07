import { useState } from "react";
import { FaCloudDownloadAlt} from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalWrapper from "../../../components/modal/modalWrapper";
import { companyDownload } from "../../../reducers/company/Services";
import { AppThunkDispatch } from "../../../store/store";
import { capitalName } from "../../../utils/functions/strings";
import { CompanyAttrs } from "../../../reducers/company/Interfaces";

export const CompanyPDFModal = ({item}: {item: CompanyAttrs}) =>{

  const dispatch = useDispatch<AppThunkDispatch>();

  const [modalShow, setModalShow] = useState(false);

  const companyToggleHandler = () =>{
    setModalShow(!modalShow);
  }

  const companyDeleteHandler = async () =>{
    let id = item.id || ""
    //await dispatch(companyDownload({companyId: id}));
  }

  return (
      <>
        <ModalWrapper 
          title="Do you want to download the pdf with all the items of this company?"
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

        <FaCloudDownloadAlt className="icon-event" onClick={()=>{companyToggleHandler()}}/>
      </>
  )


}