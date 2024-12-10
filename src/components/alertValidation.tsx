import { ReactNode } from "react";
import { IoAlertOutline } from "react-icons/io5";

const AlertValidation = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center text-rose-600 gap-x-2 text-sm">
      <div>
        <p>{children}</p>
      </div>
      <div className="flex justify-center items-center">
        <IoAlertOutline size={18} />
      </div>
    </div>
  );
};
export default AlertValidation;
