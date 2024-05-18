import { createBrowserRouter } from "react-router-dom";
import Login, { LoginAction } from "./features/identity/component/login";
import Register, {
  registerAction,
} from "./features/identity/component/register";
import IdentityLayout from "./layouts/identity-layouts";
import MainLayout from "./layouts/mainLayout/mainLayout";
import Courses, { coursesLoader } from "./pages/courses";
import CourseCategories, { categoriesLoader } from "./pages/course-categories";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/components/course-details";
import { CategoryProvider } from "./features/categories/ctegory-context";
import NotFound from "./pages/notFound";
import UnhandledException from "./pages/unhandle-exeption";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Courses />,
        index: true,
        loader: coursesLoader,
      },
      {
        element: (
          <CategoryProvider>
            <CourseCategories />
          </CategoryProvider>
        ),
        path: "course-categories",
        loader: categoriesLoader,
      },
      {
        element: <CourseDetails />,
        path: "courses/:id",
        loader: courseDetailsLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default Router;
