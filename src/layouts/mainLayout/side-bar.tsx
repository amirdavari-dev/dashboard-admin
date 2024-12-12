import { useAppContext } from "@/contexts/app/app-context";
import { NavLink } from "react-router-dom";
import azpo from "@assets/images/azpo.png";
import { useTranslation } from "react-i18next";
import { FaRegBuilding } from "react-icons/fa6";
import { BsBuildingAdd } from "react-icons/bs";

const SideBarMain = () => {
  const { showSidebar } = useAppContext();
  const { t } = useTranslation();
  return (
    <nav
      className={`${
        showSidebar ? "md:col-span-3 lg:col-span-2 2xl:col-span-2" : "md:hidden"
      } hidden md:block h-screen bg-white dark:bg-slate-800 border-e border-slate-300 dark:border-slate-500 shadow-sm`}
    >
      <div className="flex flex-col justify-start items-center gap-y-2 px-4 mb-6 mt-2">
        <div>
          <img width={80} height={100} src={azpo} alt="fidar arian kavir" />
        </div>
        <div>
          <h2 className="text-center font-bold dark:text-white mt-2 text-blue-600 text-[20px]">
            {t("mainLayout.sidebar.header")}
          </h2>
          <p className="font-light text-sm dark:text-white"> {t("mainLayout.sidebar.subText")}</p>
        </div>
        {/* <hr className="w-2/3 my-2 bg-black h-[2px]" /> */}
      </div>
      <div>
        <ul className="px-2 flex flex-col gap-y-2">
          <li className="px-2">
            <p className="text-blue-600 dark:text-slate-200 flex justify-start items-center gap-x-2">
              <span>
              <FaRegBuilding size={20} />
              </span>
              <span className="pt-1">
              {t("mainLayout.sidebar.categoryProperty")}

              </span>
            </p>
            <ul className="ps-8 flex flex-col items-start gap-y-1 mb-1 mt-3">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return `hover:bg-blue-600 p-2 hover:text-white rounded-full transition-all dark:text-white text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "bg-blue-600 text-white"
                    } `;
                  }}
                >
                  <span>
                  <BsBuildingAdd size={20} />
                  </span>
                  <span className="line-clamp-1 pt-1">
                    {t("mainLayout.sidebar.allproperties")}
                  </span>
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
