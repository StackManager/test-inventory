import React, { useState } from 'react';
import { PageSizeSelector } from './PagesSize';
import Paginator from './Paginator';

interface Props {
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number, itemsPerPage: number) => void;
}

const PaginationBar: React.FC<Props> = ({ totalItems, itemsPerPage = 10, currentPage = 1, onPageChange }) => {
  
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  //const totalPages = Math.ceil(totalItems / itemsPerPage);
  //const [totalPagesState, setTotalPagesState] = useState(totalPages);

  const handlePageChange = async (page: number) => {
    await setCurrentPageState(page);
    onPageChange && onPageChange(page, itemsPerPageState);
  };

  const handleItemsPerPageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value);
    const newTotalPages = Math.ceil(totalItems / newItemsPerPage);

    await setCurrentPageState(1);
    await setItemsPerPageState(newItemsPerPage);
    //await setTotalPagesState(newTotalPages);
    onPageChange && onPageChange(currentPageState, newItemsPerPage);
  };

  if (totalItems <= itemsPerPage) {
    return null;
  }

  return (
    <div className="d-flex justify-content-between align-items-center">

      <PageSizeSelector 
        pageSize={itemsPerPageState} 
        handlePageSizeChange={handleItemsPerPageChange} />

      <Paginator
        totalItems={totalItems}
        itemsPerPage={itemsPerPageState}
        currentPage={currentPageState}
        onPageChange={handlePageChange} />

    </div>
  );
};

export default PaginationBar;