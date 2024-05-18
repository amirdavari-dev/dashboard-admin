import ChangeLanguage from "@/components/change-language";
import ChangeTheme from "@/components/change-theme";
import { Outlet } from "react-router-dom";

const IdentityLayout = () => {
  return (
    <div>
      <nav>
        <ChangeLanguage />
        <ChangeTheme />
      </nav>
      <div className="container-identity p-2">
        <Outlet />
      </div>
    </div>
  );
};
export default IdentityLayout;
