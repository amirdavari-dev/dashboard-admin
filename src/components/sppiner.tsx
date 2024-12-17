import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Sppiner = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center bg-slate-900/80 w-full h-full z-[300]">
      <div className="flex flex-col justify-center items-center gap-y-2">
      <AiOutlineLoading3Quarters size={20} className=" w-32 h-32 me-3 text-blue-600 animate-spin" />
      <p className="text-[30px] bg-white px-2 rounded-2xl text-blue-600">
      Please Wait

      </p>

      </div>
    </div>
  );
};
export default Sppiner;
