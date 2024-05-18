import _ from "lodash";
import { useSearchParams } from "react-router-dom";
const Pagination = ({
  totalRecords,
  pageSize = import.meta.env.VITE_PAGE_SIZE,
}: {
  totalRecords: number;
  pageSize?: number;
}) => {
  const pages = Math.ceil(totalRecords / pageSize);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const prevPage = () => {
    currentPage > 1 && setSearchParams({ page: (currentPage - 1).toString() });
  };
  const nextPage = () => {
    currentPage < pages &&
      setSearchParams({ page: (currentPage + 1).toString() });
  };
  return (
    <nav className="my-2">
      <ul className="flex justify-start items-center text-[12px] font-bold text-slate-600">
        <li>
          <button
            className={`p-2 bg-white dark:bg-slate-800 dark:text-white dark:hover:text-slate-400 rounded-s-xl hover:text-black transition-all ${
              currentPage === 1 ? "disabled:opacity-50" : ""
            }`}
            onClick={prevPage}
          >
            قبلی
          </button>
        </li>

        {_.times(pages, (index: number) => {
          return (
            <li key={`page${index + 1}`}>
              <button
                className={`p-2 bg-white dark:bg-slate-800 dark:text-white dark:hover:text-slate-400 hover:text-black transition-all border-x dark:border-slate-600 ${
                  index + 1 === currentPage
                    ? "text-black dark:text-slate-400"
                    : ""
                }`}
                onClick={() =>
                  setSearchParams({ page: (index + 1).toString() })
                }
              >
                {index + 1}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className={`p-2 bg-white dark:bg-slate-800 dark:text-white dark:hover:text-slate-400 rounded-e-xl hover:text-black transition-all ${
              currentPage === pages ? "disabled:opacity-50" : ""
            } `}
            onClick={nextPage}
          >
            بعدی
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
