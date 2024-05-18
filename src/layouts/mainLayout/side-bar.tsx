import { useAppContext } from "@/contexts/app/app-context";
import { NavLink } from "react-router-dom";
import fak from "@assets/images/fak.png";
import { useTranslation } from "react-i18next";
import { FaRegUser } from "react-icons/fa6";
import { IoVideocamOutline } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoPricetagOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";

const SideBarMain = () => {
  const { showSidebar } = useAppContext();
  const { t } = useTranslation();
  return (
    <nav
      className={`${
        showSidebar ? "md:col-span-3 lg:col-span-2 2xl:col-span-2" : "md:hidden"
      } hidden md:block h-screen bg-slate-100 dark:bg-slate-800 border-e border-slate-300 dark:border-slate-500 shadow-sm`}
    >
      <div className="my-2 flex flex-col items-center">
        <div>
          <img width={100} height={100} src={fak} alt="fidar arian kavir" />
        </div>
        <h2 className="text-center font-bold dark:text-white">
          {t("mainLayout.sidebar.subTitle")}
        </h2>
        <hr className="w-2/3 my-2 bg-black h-[2px]" />
      </div>
      <div>
        <ul className="px-2 flex flex-col gap-y-2">
          <li className="px-2">
            <p className="text-[12px] text-slate-600 dark:text-slate-200">
              {t("mainLayout.sidebar.courceManagement")} :
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
                  <span className="line-clamp-1">{t("mainLayout.sidebar.allCources")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/course-categories"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <IoVideocamOutline size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.courcesCategory")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cources"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <CiDiscount1 size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.courcesDiscount")}</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="px-2">
            <p className="text-[12px] text-slate-600 dark:text-slate-200">
              {t("mainLayout.sidebar.userManagement")} :
            </p>
            <ul className="ps-8 flex flex-col items-start gap-y-1 my-1">
           
              <li>
                <NavLink
                  to="/manage"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <FaRegUser size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.teacherManagement")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cources"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <HiOutlineUserGroup size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.studentManagement")}</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="px-2">
            <p className="text-[12px] text-slate-600 dark:text-slate-200">
              {t("mainLayout.sidebar.blogManagement")} :
            </p>
            <ul className="ps-8 flex flex-col items-start gap-y-1 my-1">
            
              <li>
                <NavLink
                  to="/project"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <IoPricetagOutline size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.tagManagement")}</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cources"
                  className={({ isActive }) => {
                    return `hover:scale-110 transition-all hover:text-slate-950 text-slate-600 text-[12px] flex justify-start items-center gap-x-1 dark:hover:text-white ${
                      isActive && "text-slate-950 dark:text-white"
                    } `;
                  }}
                >
                  <span>
                    <IoDocumentTextOutline size={18} />
                  </span>
                  <span className="line-clamp-1">{t("mainLayout.sidebar.postManagement")}</span>
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
