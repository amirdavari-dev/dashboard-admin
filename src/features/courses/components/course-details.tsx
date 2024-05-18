import { httpInterceptedService } from "@/core/http-service";
import { ListDataType } from "@/types/courses-type";
import { useLoaderData } from "react-router-dom";

const CourseDetails = () => {
  const {
    coverImageUrl,
    description,
    title,
    duration,
    courseLevel,
    numOfChapters,
    numOfLectures,
    numOfReviews,
    averageReviewRating,
  } = useLoaderData() as ListDataType;
  return (
    <div className="mt-4 bg-white dark:bg-slate-700 p-2 rounded-md shadow-md">
      <div className="flex items-center flex-col">
        <div className="w-fit rounded-md overflow-hidden">
          <img src={coverImageUrl} alt={title} width={300} />
        </div>
        <div className="text-center">
          <div className="flex justify-center items-center my-2">
            <p className="w-fit bg-blue-500 text-white rounded-md px-2">Css</p>
          </div>
          <h6 className="font-bold dark:text-white">{title}</h6>
          <p className="text-slate-500 dark:text-slate-300 text-sm mt-5">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-3 mb-10 cursor-default ">
        <div className="col-span-6 xs:col-span-4 md:col-span-4 lg:col-span-2 bg-slate-200 dark:bg-slate-600 p-2 md:p-1 lg:p-2 rounded-md flex flex-col items-center">
          <p className="text-slate-700 dark:text-white">زمان آموزش</p>
          <p className="text-blue-500 text-xs dark:text-blue-300">{duration} ساعت</p>
        </div>
        <div className="col-span-6 xs:col-span-4 md:col-span-4 lg:col-span-2 bg-slate-200 dark:bg-slate-600 p-2 md:p-1 lg:p-2 rounded-md flex flex-col items-center">
          <p className="text-slate-700 dark:text-white">سطح دوره</p>
          <p className="text-blue-500 text-xs dark:text-blue-300">{courseLevel}</p>
        </div>
        <div className="col-span-6 xs:col-span-4 md:col-span-4 lg:col-span-2 bg-slate-200 dark:bg-slate-600 p-2 md:p-1 lg:p-2 rounded-md flex flex-col items-center">
          <p className="text-slate-700 dark:text-white">تعداد فصل ها</p>
          <p className="text-blue-500 text-xs dark:text-blue-300">{numOfChapters} فصل</p>
        </div>
        <div className="col-span-6 xs:col-span-4 md:col-span-4 lg:col-span-2 bg-slate-200 dark:bg-slate-600 p-2 md:p-1 lg:p-2 rounded-md flex flex-col items-center">
          <p className="text-slate-700 dark:text-white">تعداد مباحث</p>
          <p className="text-blue-500 text-xs dark:text-blue-300">{numOfLectures} مبحث</p>
        </div>
        <div className="col-span-6 xs:col-span-4 md:col-span-4 lg:col-span-2 bg-slate-200 dark:bg-slate-600 p-2 md:p-1 lg:p-2 rounded-md flex flex-col items-center">
          <p className="text-slate-700 dark:text-white">تعداد نظرات</p>
          <p className="text-blue-500 text-xs dark:text-blue-300">{numOfReviews} نظر</p>
        </div>
        <div className="col-span-6 xs:col-span-4 md:col-span-4 lg:col-span-2 bg-slate-200 dark:bg-slate-600 p-2 md:p-1 lg:p-2 rounded-md flex flex-col items-center">
          <p className="text-slate-700 dark:text-white">میانگین نظرات</p>
          <p className="text-blue-500 text-xs dark:text-blue-300">{averageReviewRating} از {averageReviewRating}</p>
        </div>
      </div>
    </div>
  );
};
export const courseDetailsLoader = async ({ params }: any) => {
  const response = await httpInterceptedService.get(
    `Course/by-id/${params.id}`
  );
  return response.data;
};
export default CourseDetails;
