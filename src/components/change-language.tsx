import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import faFlag from "@assets/images/ir.png";
import usFlag from "@assets/images/us.png";
import { useAppContext } from "@/contexts/app/app-context";

const ChangeLanguage = () => {
  const { language, changeLanguage } = useAppContext();
  const [position, setPosition] = useState<string>("");
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="outline-none p-0 ms-2 hover:scale-110 transition-all rounded-full overflow-hidden w-5 h-5">
        <img
          className="w-full h-full"
          width={50}
          height={50}
          src={language === "fa" ? faFlag : usFlag}
          alt="Iran flag"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`bg-slate-300 dark:bg-slate-500 p-3 rounded-lg z-50 ${
          language === "fa" ? "ms-4" : "me-4"
        } mt-1`}
      >
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            onClick={() => changeLanguage("fa")}
            className="outline-none cursor-pointer mb-2"
            value="1"
          >
            <div
              className={`flex-dropdown ${
                language === "en" && "flex-row-reverse"
              } group`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <img
                  className="h-full rounded-full group-hover:scale-90 transition-all"
                  src={faFlag}
                  alt="iranFlag"
                />
              </div>
              <span className="text-xs group-hover:text-green-500 transition-all">
                فارسی
              </span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => changeLanguage("en")}
            className="outline-none cursor-pointer"
            value="2"
          >
            <div
              className={`flex-dropdown ${
                language === "en" && "flex-row-reverse"
              } group`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <img
                  className=" h-full rounded-full group-hover:scale-90 transition-all"
                  src={usFlag}
                  alt="iranFlag"
                />
              </div>
              <span className="text-xs group-hover:text-green-500 transition-all">
                English
              </span>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ChangeLanguage;
