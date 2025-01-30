import React from "react";

export default function Pagination({
  usersPerPage,
  totalUsers,
  currentPage,
  setCurrentPage,
}) {
  if (totalUsers === 0) return null; // Prevents rendering if no users exist

  const totalPages = Math.max(1, Math.ceil(totalUsers / usersPerPage)); // Ensures at least 1 page exists

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        className={`mx-1 rounded-md border px-3 py-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"}`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`mx-1 rounded-md border px-3 py-2 ${currentPage === pageNumber ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={`mx-1 rounded-md border px-3 py-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"}`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
