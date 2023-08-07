import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Paginator: React.FC<Props> = ({ totalItems, itemsPerPage, currentPage, onPageChange}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageItem = (page: number, label: string, active?: boolean) => (
    <Pagination.Item key={page} active={active} onClick={() => handlePageChange(page)}>
      {label}
    </Pagination.Item>
  );

  const getPagination = () => {
    const items = [];
    const maxPagesToShow = 5;
    let startPage = 1;
    let endPage = totalPages;

    // adjust max pages to show based on totalPages
    if (totalPages > maxPagesToShow) {
      const middle = Math.floor(maxPagesToShow / 2);
      startPage = Math.max(currentPage - middle, 1);
      endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPagesToShow + 1;
      }
    }

    // generate pagination items
    for (let i = startPage; i <= endPage; i++) {
      const label = i.toString();
      items.push(getPageItem(i, label, i === currentPage));
    }

    return items;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        {getPageItem(currentPage - 1, '<', false)}
        {getPagination()}
        {getPageItem(currentPage + 1, '>', false)}
      </Pagination>
    </div>
  );
};

export default Paginator;