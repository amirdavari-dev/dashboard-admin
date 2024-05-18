import { ListDataType } from "@/types/courses-type";
import { GoClock } from "react-icons/go";
import { FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Course = ({
  id,
  title,
  coverImageUrl,
  courseLevel,
  description,
  duration,
  numOfReviews,
}: ListDataType) => {
  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-md col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-2 hover:bg-slate-200 hover:scale-105 transition-all group">
      <div>
        <img src={coverImageUrl} alt={`title-cover${title}-list`} />
      </div>
      <div className="p-2">
        <div>
          <p className="px-2 w-fit rounded-lg mt-3 bg-blue-400 text-white">
            {courseLevel}
          </p>

          <h6 className="font-bold truncate mt-5 group-hover:text-blue-500 dark:group-hover:text-blue-400 dark:text-white hover:underline pb-1 hover:cursor-pointer">
            <Link to={`/courses/${id}`}>{title}</Link>
          </h6>
          <p className=" mb-2 text-xs text-justify text-slate-500 dark:text-slate-300 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex justify-between items-center text-xs mt-4 text-slate-500 dark:text-white">
          <div className="flex justify-center items-center gap-x-2">
            <span>
              <GoClock />
            </span>
            <span>{duration} ساعت</span>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <span>
              <FaRegComment />
            </span>
            <span>{numOfReviews} نظر</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Course;
