import ArrowBack from '../../svg/ArrowBack';
import ArrowFront from '../../svg/ArrowFront';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-4 cursor-pointer">
      <button
        className="cursor-pointer text-[#535862] text-[14px] font-[500] flex items-center gap-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowBack />
        Previous
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 rounded-[8px] ${
              currentPage === page ? "bg-[#F9F5FF] text-[#7F5BD9]" : ""
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="cursor-pointer text-[#535862] text-[14px] font-[500] flex items-center gap-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowFront />
      </button>
    </div>
  );
};

export default Pagination;