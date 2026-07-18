interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const start = Math.max(
    1,
    Math.min(
      currentPage - 2,
      totalPages - MAX_VISIBLE + 1
    )
  );

  const end = Math.min(
    totalPages,
    start + MAX_VISIBLE - 1
  );

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="rounded cursor-pointer border px-3 py-2 disabled:opacity-40"
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-10 cursor-pointer w-10 rounded-md transition ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="rounded cursor-pointer border px-3 py-2 disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
}