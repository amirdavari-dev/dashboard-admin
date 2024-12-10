import ChangeLanguage from "@/components/change-language";
import ChangeTheme from "@/components/change-theme";
import { useAppContext } from "@/contexts/app/app-context";
import { RiMenu3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { TbLogout2 } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
const TopNav = () => {
  const { toggleSidebar, language } = useAppContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-300 dark:border-slate-500 z-50">
      <div>
        <button
          className="mx-3 dark:text-white hover:scale-110 transition-all"
          onClick={toggleSidebar}
        >
          <RiMenu3Fill size={20} />
        </button>
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className="px-1">
        
        <button
          onClick={logout}
          className="border-none p-0 mx-1 hover:scale-110 transition-all text-slate-600 dark:text-white"
        >
          {language === "fa" ? (
            <TbLogout2 size={20} />
          ) : (
            <HiOutlineLogout size={20} />
          )}
        </button>
      </div>
    </nav>
  );
};
export default TopNav;
