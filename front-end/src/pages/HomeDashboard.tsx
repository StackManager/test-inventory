
import  useDocumentTitle  from '../hooks/useDocumentTitle'
import ControllerTableCompany from './company/CompanyController';

export function HomeDashboard() {

  useDocumentTitle("Dashboard");

  return (
    <>

      <ControllerTableCompany></ControllerTableCompany>
      
    </>
  );

}

