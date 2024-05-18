import { httpInterceptedService } from "@/core/http-service";
import CourseList from "@/features/courses/components/course-list";
import { LoaderDataType } from "@/types/courses-type";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

const Courses = () => {
  const data = useLoaderData() as LoaderDataType;
  return (
    <div>
      <div className="p-2">
        <div className="flex justify-between items-center mb-5">
          <button className="bg-blue-600 text-white p-1 text-sm rounded-md font-semibold hover:scale-105 transition-all">
            افزودن دوره جدید
          </button>
        </div>
        <Suspense fallback={<p className="text-slate-500 text-sm">صبور باشید...</p>}>
          <Await resolve={data.courses}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};
export const coursesLoader = async () => {
  return defer({
    courses: loadCourses(),
  });
};
export const loadCourses = async () => {
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
};
export default Courses;
