import { useAppContext } from "@/contexts/app/app-context";
import { NavLink } from "react-router-dom";
import azpo from "@assets/images/azpo.png";
import { IoVideocamOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const SideBarMain = () => {
  const { showSidebar } = useAppContext();
  const {t} = useTranslation()
  return (
    <nav
      className={`${
        showSidebar ? "md:col-span-3 lg:col-span-2 2xl:col-span-2" : "md:hidden"
      } hidden md:block h-screen bg-slate-100 dark:bg-slate-800 border-e border-slate-300 dark:border-slate-500 shadow-sm`}
    >
      <div className="my-2 flex flex-col items-center">
        <div>
          <img width={100} height={100} src={azpo} alt="fidar arian kavir" />
        </div>
        <h2 className="text-center font-bold dark:text-white mt-2">
        {t("mainLayout.sidebar.header")}
        </h2>
        <hr className="w-2/3 my-2 bg-black h-[2px]" />
      </div>
      <div>
        <ul className="px-2 flex flex-col gap-y-2">
          <li className="px-2">
            <p className="text-[12px] text-slate-600 dark:text-slate-200">
            {t("mainLayout.sidebar.categoryProperty")}
            </p>
            <ul className="ps-8 flex flex-col items-start gap-y-1 my-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <IoVideocamOutline size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.allproperties")}</span>
                </NavLink>
              </li>
            </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};
export default SideBarMain;
