import React from 'react';
import { Table } from 'react-bootstrap';


interface Props {
  header: string[];
  paginatedData: { [key: string]: any }[];
  selectable?: boolean;
}

export const TableData: React.FC<Props>  = ({ header, paginatedData, selectable = false }) =>{

  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);
  
  const handleSelectItem = (item: any) => {
    if (selectedItems.includes(item)) {
       setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
       setSelectedItems([...selectedItems, item]);
    }
  };

  return (
      <Table striped bordered hover>

      <thead>
        <tr>

          {header.map((item: string, index: number) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>

      <tbody>

        {paginatedData.map((item: any, index: number) => (
          <tr key={index} 
          className={`banner ${selectedItems.includes(item) ? "active" : ""}`}
          onClick={() => handleSelectItem(item)} >

            {header.map((hItem, hIndex) => (
              <td key={hIndex}>{item[hItem]}</td>
            ))}

          </tr>
        ))}

      </tbody>
    </Table>);
}