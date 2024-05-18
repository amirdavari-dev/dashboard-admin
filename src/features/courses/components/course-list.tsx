import { ListDataType } from "@/types/courses-type";
import Course from "./course";

const CourseList = ({courses } : any) => {
  return (
    <div className="grid grid-cols-12 gap-5 p-10 xs:p-0">
      {courses.map((course: ListDataType) => (
        <Course {...course} key={course.id} />
      ))}
    </div>
  );
};
export default CourseList;
