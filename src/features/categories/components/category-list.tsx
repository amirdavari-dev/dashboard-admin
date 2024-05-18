import Sppiner from "@/components/sppiner";
import Pagination from "@/components/pagination";
import { CategoryProps } from "@/types/category-type";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigation } from "react-router-dom";
import { useCategoryContext } from "../ctegory-context";

const CategoryList = ({
  deleteCategory,
  categories: { data, totalRecords },
}: CategoryProps) => {
  const {setCategory} = useCategoryContext()
  const navigation = useNavigation();
  return (
    <div className="z-0">
      <div className="relative z-0">
        {navigation.state !== "idle" && <Sppiner />}
        <table className="block bg-slate-200 dark:bg-slate-700 p-2 rounded-md shadow-md mt-12 z-0">
          <thead className="block px-2">
            <tr className="grid grid-cols-2 text-slate-700 dark:text-slate-200 text-sm">
              <th className="col-span-1 text-start">نام</th>
              <th className="col-span-1 text-start">عملیات</th>
            </tr>
          </thead>
          <tbody className="block">
            {data.map((category) => {
              return (
                <tr
                  key={category.id}
                  className="flex justify-between items-center p-1 bg-white dark:bg-slate-800 rounded-md  my-2 text-slate-600 dark:text-slate-300"
                >
                  <td className="w-1/2">{category.name}</td>
                  <td className="w-1/2">
                    <button onClick={()=>setCategory(category)} className="mx-1 hover:text-green-500 transition-all">
                      <MdOutlineEdit size={18} />
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="mx-1 hover:text-rose-500 transition-all"
                    >
                      <MdDeleteOutline size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination totalRecords={totalRecords} />
      </div>
    </div>
  );
};
export default CategoryList;
