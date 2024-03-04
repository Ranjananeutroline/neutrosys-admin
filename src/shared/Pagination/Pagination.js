import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Show maximum 5 page numbers

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to the maximum visible pages, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If total pages are more than the maximum visible pages, add ellipsis and show selected page with adjacent pages
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (startPage > 1) {
        pageNumbers.push(1, "..."); // Add ellipsis if not on the first pages
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        pageNumbers.push("...", totalPages); // Add ellipsis if not on the last pages
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex  justify-center mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="bg-gray-200 px-3 py-2 rounded-l-md hover:bg-gray-300 disabled:bg-gray-200"
      >
        {"<"}
      </button>
      {getPageNumbers().map((pageNumber, index) => (
        <button key={index} onClick={() => onPageChange(pageNumber)}>
          <div
            className={` px-2 pb-1 mx-1 rounded-[40%] ${
              pageNumber === currentPage
                ? "bg-slate-400  text-white"
                : "hover:bg-slate-300"
            }`}
          >
            {pageNumber}
          </div>
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300 disabled:bg-gray-200"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
