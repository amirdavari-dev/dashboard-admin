import Modal from "@/components/modal";
import { httpInterceptedService } from "./../core/http-service";
import CategoryList from "@/features/categories/components/category-list";
import { CategoryDataType } from "@/types/category-type";
import { Suspense, useState } from "react";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";
import AddOrUpdateCategory from "@/features/categories/components/add-or-update-castegory";
import { useCategoryContext } from "@/features/categories/ctegory-context";

const CourseCategories = () => {
  const {category} = useCategoryContext()
  const navigate = useNavigate();
  // const { t } = useTranslation();
  const data = useLoaderData() as CategoryDataType;
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [categorySelect, setCategorySelect] = useState<number>();
  const [showAddCategory,setShowAddCategory] = useState<boolean>(false);

  const deleteCategory = (id: number) => {
    setCategorySelect(id);
    setShowDeleteModal(true);
  };
  const handleDeleteCategory = async () => {
    const response = httpInterceptedService.delete(
      `/CourseCategory/${categorySelect}`
    );
    toast.promise(
      response,
      {
        pending: "درحال حذف ...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({data} : any) {
            console.log(data);
            return data.message;
          },
        },
      },
      {
        position : "bottom-left",
      }
    );
    setShowDeleteModal(false);
  };
  return (
    <>
      <div>
        <div className="p-2">
          <div className="flex justify-between items-center mb-5">
            <button
            onClick={()=>setShowAddCategory(true)}
            className="bg-blue-600 text-white p-1 text-sm rounded-md font-semibold hover:scale-105 transition-all">
              افزودن دسته جدید
            </button>
          </div>
          {
            (showAddCategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
          }
          <Suspense
            fallback={<p className="text-slate-500 text-sm">صبور باشید...</p>}
          >
            <Await resolve={data.categories}>
              {(loadedCategory) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadedCategory}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف دسته بندی"
        body="آیا از حذف دسته بندی مورد نظر مطمعن هستید؟"
      >
        <>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="bg-white dark:bg-slate-900 shadow-sm rounded-md hover:scale-110 transition-all px-2 py-1 mx-1"
          >
            انصراف
          </button>
          <button
            onClick={handleDeleteCategory}
            className="text-rose-500 bg-white dark:bg-slate-900 hover:scale-110 transition-all shadow-sm rounded-md px-2 py-1 mx-1"
          >
            حذف
          </button>
        </>
      </Modal>
    </>
  );
};
export const categoriesLoader = async ({ request }: any) => {
  return defer({
    categories: loadCategories(request),
  });
};
const loadCategories = async (request: any) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = "/CourseCategory/sieve";
  url += `?page=${page}&pageSize=${pageSize}`;
  const response = await httpInterceptedService.get(url);
  return response.data;
};
export default CourseCategories;
