import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Sppiner = () => {
  return (
    <div className="absolute top-0 flex justify-center items-center bg-slate-400/25 w-full h-full">
      <AiOutlineLoading3Quarters size={20} className=" w-4 h-4 me-3 text-black animate-spin" />
    </div>
  );
};
export default Sppiner;
