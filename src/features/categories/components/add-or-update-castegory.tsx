import { httpInterceptedService } from "@/core/http-service";
import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCategoryContext } from "../ctegory-context";
import { useEffect } from "react";

const AddOrUpdateCategory = ({
  setShowAddCategory,
}: {
  setShowAddCategory: Function;
}) => {
  const { category, setCategory } = useCategoryContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("id", category.id);
    }
  }, [category]);
  // const {t} = useTranslation()
  const onSubmit = (data: any) => {
    setShowAddCategory(false);
    const response = httpInterceptedService.post(`/CourseCategory/`, data);
    toast.promise(
      response,
      {
        pending: "در حال ذخیره اطلاعات ...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            if (category) {
              setCategory(null);
            }
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }: any) {
            console.log(data);

            return "امکان افزودن دسته بندی تکراری وجد ندارد";
          },
        },
      },
      {
        position: "bottom-left",
      }
    );
  };
  const onClose = () => {
    setShowAddCategory(false);
    setCategory(null);
  };
  return (
    <div className="bg-white dark:bg-slate-700 p-2 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className="w-full text-slate-700 text-sm"
            htmlFor="nameCategory"
          >
            نام دسته بندی:
          </label>
          <input
            autoComplete="off"
            className="w-full bg-slate-200 p-1 rounded-md border dark:bg-slate-300 mt-1 border-slate-300 outline-none"
            type="text"
            id="nameCategory"
            {...register("name", { required: true })}
          />
          {errors.name && errors.name.type === "required" && (
            <p>نام الزامی است</p>
          )}
        </div>
        <div className="my-2 text-sm">
          <button
            className="bg-white hover:scale-95 transition-all px-2 py-1 rounded-md"
            type="button"
            onClick={onClose}
          >
            بستن
          </button>
          <button
            className="bg-blue-600 hover:scale-95 transition-all text-white px-2 py-1 mx-2 rounded-md"
            type="submit"
          >
            ثبت تغییرات
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddOrUpdateCategory;
