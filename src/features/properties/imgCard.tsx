// import prop from "@/assets/images/prop.png"
import { MdDeleteOutline } from "react-icons/md";
const ImageCard = ({src,handleDelete,imgId} : {imgId : string,src : string, handleDelete : (id : string) => void}) => {
  return (
    <div className="group w-[80px] min-w-[80px] max-w-[80px] h-[80px] rounded-md overflow-hidden relative">
      <img src={src} className="w-full h-full" alt="" />
      <button onClick={()=>{
        console.log(imgId);
        handleDelete(imgId)
        
      }} type="button" className="group-hover:flex transition-all hidden bg-slate-900/30 outline-none w-full h-full absolute top-0 left-0 justify-center items-center">
        <span>
        <MdDeleteOutline className="text-white" size={18} />
        </span>
      </button>
    </div>
  );
};
export default ImageCard;
