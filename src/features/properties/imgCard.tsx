// import prop from "@/assets/images/prop.png"
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "motion/react";
const ImageCard = ({
  src,
  handleDelete,
  handleShow,
  imgId,
  counterImg,
}: {
  imgId: string;
  src: string;
  counterImg: number;
  handleDelete: (id: string) => void;
  handleShow: (img: number) => void;
}) => {
  return (
    <div className="group w-[140px] min-w-[140px] max-w-[140px] h-[80px] rounded-md overflow-hidden relative">
      <img src={src} className="w-full h-full" alt="" />
      <div
        
        className="hidden group-hover:flex justify-center items-center gap-x-2  absolute top-0 left-0 w-full h-full "
      >
        <motion.button
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          initial={{scale : 0}}
          animate={{ scale: 1 }}
          exit={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            handleDelete(imgId);
          }}
          type="button"
          className="flex transition-all bg-slate-900/40 outline-none justify-center items-center p-2 rounded-md"
        >
          <span>
            <MdDeleteOutline className="text-white" size={18} />
          </span>
        </motion.button>
        <motion.button
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        initial={{scale : 0}}
        animate={{ scale: 1 }}
        exit={{ scale: 1 }}
        transition={{ duration: 0.5 }}
          onClick={() => {
            handleShow(counterImg);
          }}
          type="button"
          className="flex transition-all bg-slate-900/40 outline-none justify-center items-center p-2 rounded-md"
        >
          <span>
            <FaRegEye className="text-white" size={18} />
          </span>
        </motion.button>
      </div>
    </div>
  );
};
export default ImageCard;
