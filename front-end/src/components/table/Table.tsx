import React, { useEffect, useState } from 'react';
import PaginationBar from './PaginationBar';

import './Table.scss';
import { TableData } from './TableData';

interface Props {
  header: string[];
  data: { [key: string]: any }[];
  itemsPerPage?: number;
  selectable?: boolean;
}

const CustomTable: React.FC<Props> = ({ header, data, itemsPerPage = 10, selectable = false }) => {
  
  
  const [paginatedData, setPaginatedData] = React.useState<any[]>([]);

  const paginate = (currentPage: number, itemsPerPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex);
  };





  const handlePageChange = (currentPage: number, itemsPerPage: number) => {
    let getData = paginate(currentPage, itemsPerPage);
    setPaginatedData(getData);
  };

  useEffect(()=>{
    handlePageChange(1, itemsPerPage);
  },[])


  return (
    <>

      <TableData 
        header={header}
        paginatedData={paginatedData}
        selectable={selectable} />

      <PaginationBar
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

    </>
  );
};

export default CustomTable;