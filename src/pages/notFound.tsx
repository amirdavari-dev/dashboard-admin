import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="my-2">
        <p className="font-bold text-[40px] bg-slate-200 px-3 py-1 rounded-md m-0">404</p>
      </div>
      <div>
        <p className="text-slate-600">صفحه ای با این آدرس یافت نشد.</p>
        <div className="text-center my-5 hover:scale-105 transition-all">
          <Link className="bg-blue-500 text-white p-1 rounded-md" to="/">به صفحه اصلی بروید</Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
