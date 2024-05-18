import { useAppContext } from "@/contexts/app/app-context";
import { Button } from "./ui/button";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
const ChangeTheme = () => {
  const { theme, changeTheme } = useAppContext();
  return (
    <Button className="border-none p-0 mx-1 hover:scale-110 transition-all"
      variant="outline"
      onClick={() => {
        changeTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? (
        <MdDarkMode size={20} />
      ) : (
        <MdOutlineLightMode className="text-white" size={20} />
      )}
    </Button>
  );
};
export default ChangeTheme;
