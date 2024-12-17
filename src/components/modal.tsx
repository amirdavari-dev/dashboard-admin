import { ModalType } from "@/types/category-type";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
const Modal = ({ isOpen, open, title, body, children, isClose }: ModalType) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            onClick={() => open(isClose ? false : true)}
            className="fixed top-0 left-0 h-screen w-screen bg-slate-700/75 z-[500px] flex justify-center items-center"
          >
            <div
              data-aos="zoom-in"
              className="w-2/5 h-fit bg-white dark:bg-slate-800 dark:text-white rounded-lg p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                <div>
                  <h5 className="font-bold">{title}</h5>
                </div>
                {isClose && (
                  <div className="text-end">
                    <button
                      onClick={() => open(false)}
                      type="button"
                      className="h-full"
                    >
                      <IoClose size={20} />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <p className="p-3">{body}</p>
              </div>
              <div className="text-end text-sm">{children}</div>
            </div>
          </div>,
          document.getElementById("modal")!
        )}
    </>
  );
};
export default Modal;
