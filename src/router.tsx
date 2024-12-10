import { createBrowserRouter } from "react-router-dom";
import Login, { LoginAction } from "./features/identity/component/login";
import IdentityLayout from "./layouts/identity-layouts";
import MainLayout from "./layouts/mainLayout/mainLayout";
import NotFound from "./pages/notFound";
import UnhandledException from "./pages/unhandle-exeption";
import AddProperty from "./pages/add-property";
import { getAddData } from "./controller/addPropertyloader";
import Properties from "./pages/properties";
import { getRealEstates } from "./controller/getRealEstates";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        element: <Properties />,
        index: true,
        loader : getRealEstates
      },
      {
        path: "add-property",
        element: <AddProperty />,
        loader : getAddData,
        // action : insertProperty,
        errorElement: <AddProperty />,
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default Router;
