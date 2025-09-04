import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  pageSize: number;
  initialPage?: number;
}

const usePagination = ({ totalItems, pageSize, initialPage = 1 }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginationRange = useMemo(() => {
    // Calculate the range of page numbers to display
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }, [totalPages]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    totalPages,
    paginationRange,
    nextPage,
    prevPage,
    goToPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};

export default usePagination;
