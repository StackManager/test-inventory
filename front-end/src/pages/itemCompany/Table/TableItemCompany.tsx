

import { itemCompanyAttrs } from "../../../reducers/company/Interfaces";
import { ItemCompanyDeleteModal } from "../Modal/ItemCompanyDeleteModal";
import { ItemCompanyReadModal } from "../Modal/ItemCompanyReadModal";


function TableItemCompany({itemsCompany}: any) {


  return (
    <> 

      <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Services</th>
        </tr>
      </thead>
      <tbody>
      {itemsCompany.map((item: itemCompanyAttrs, index: number) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <div className="aling-flex-center">
                  <ItemCompanyReadModal item={item}></ItemCompanyReadModal>
                  <ItemCompanyDeleteModal item={item}></ItemCompanyDeleteModal>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </>
  );
}

export default TableItemCompany;