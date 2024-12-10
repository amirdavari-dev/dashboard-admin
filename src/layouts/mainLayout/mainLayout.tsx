import TopNav from "./top-nav";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { useAppContext } from "@/contexts/app/app-context";
import SideBarMain from "./side-bar";


const MainLayout = () => {
  const { showSidebar } = useAppContext();
  // const navigate = useNavigate();
  // const token: string | boolean = localStorage.getItem("token") || false;
  // if (!token) {
  //   navigate("/login");
  // }
  return (
    <div className="min-h-screen h-screen grid grid-cols-12">
      <SideBarMain />
      <div
        className={` ${
          showSidebar ? "md:col-span-9 lg:col-span-10" : "col-span-12"
        } col-span-12 relative overflow-y-scroll`}
      >
        <TopNav />
        <main className="px-2 pb-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
