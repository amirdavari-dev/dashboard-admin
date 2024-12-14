import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import usFlag from "@/assets/images/us.png";
import ruflag from "@/assets/images/ru.jpg"
import { useAppContext } from "@/contexts/app/app-context";
import { useNavigate } from "react-router-dom";

const ChangeLanguage = () => {
  const { language, changeLanguage } = useAppContext();
  const [position, setPosition] = useState<string>("");
  const navigate = useNavigate()
  const handleLanguageChange = (lang : string) => {
    navigate(`?lang=${lang}`);    
    changeLanguage(lang);
  }
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="outline-none p-0 ms-2 hover:scale-110 transition-all rounded-full overflow-hidden w-5 h-5">
        <img
          className="w-full h-full"
          width={50}
          height={50}
          src={language === "ru" ? ruflag : usFlag}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`bg-slate-300 dark:bg-slate-500 p-3 rounded-lg z-50 ${
          language === "ru" ? "ms-4" : "me-4"
        } mt-1`}
      >
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            onClick={() => handleLanguageChange("en")}
            className="outline-none cursor-pointer"
            value="2"
          >
            <div
              className={`flex-dropdown group`}
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
          <DropdownMenuRadioItem
            onClick={() => handleLanguageChange("ru")}
            className="outline-none cursor-pointer"
            value="2"
          >
            <div
              className={`flex-dropdown  group`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <img
                  className=" h-full rounded-full group-hover:scale-90 transition-all"
                  src={ruflag}
                />
              </div>
              <span className="text-xs group-hover:text-green-500 transition-all">
                Russian
              </span>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ChangeLanguage;
