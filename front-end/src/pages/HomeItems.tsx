
import  useDocumentTitle  from '../hooks/useDocumentTitle'
import TableItemCompanyController from './itemCompany/Table/TableItemCompanyController';

export function HomeItems() {

  useDocumentTitle("Items company");

  return (
    <>

      <TableItemCompanyController></TableItemCompanyController>
      
    </>
  );

}

