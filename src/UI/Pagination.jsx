import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ 
  currentPage = 1, 
  totalPages = 1, 
  hasNextPage = false, 
  hasPrevPage = false,
  onPageChange 
}) {
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, safeCurrentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(safeTotalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < safeTotalPages) {
      if (endPage < safeTotalPages - 1) {
        pages.push("...");
      }
      pages.push(safeTotalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 my-8 px-4">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(safeCurrentPage - 1)}
        disabled={!hasPrevPage}
        className={`p-2 rounded-lg transition-all duration-300 ${
          hasPrevPage
            ? "bg-orange-500 text-white hover:bg-black shadow-md hover:shadow-lg"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1 flex-wrap justify-center">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          const isCurrentPage = page === safeCurrentPage;

          return (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                isCurrentPage
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-orange-400 hover:text-white hover:border-orange-500 hover:shadow-md"
              }`}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(safeCurrentPage + 1)}
        disabled={!hasNextPage}
        className={`p-2 rounded-lg transition-all duration-300 ${
          hasNextPage
            ? "bg-orange-500 text-white hover:bg-black shadow-md hover:shadow-lg"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600 font-medium whitespace-nowrap">
        Page <span className="text-orange-600 font-bold">{safeCurrentPage}</span> of{" "}
        <span className="text-orange-600 font-bold">{safeTotalPages}</span>
      </div>
    </nav>
  );
} 
