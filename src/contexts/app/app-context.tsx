import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import appReducer from "./app-reducer";
import { AppReducerType } from "@/types/contexts-type";
import { useTranslation } from "react-i18next";

interface AppContextType extends AppReducerType {
  changeLanguage: (language: string) => void;
  changeTheme: (theme: string) => void;
  toggleSidebar : ()=> void,
}

const initialState: AppReducerType = {
  language: localStorage.getItem("language") || "en",
  changeLanguage: () => {},
  changeTheme: () => {},
  theme: localStorage.getItem("theme") || "light",
  showSidebar : false,
  toggleSidebar : () => {},
};
const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: PropsWithChildren) => {
  const { i18n } = useTranslation();
  const [state, dispatch] = useReducer(appReducer, initialState);
  const changeLanguage = (language: string) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: language });
  };
  const changeTheme = (theme: string) => {
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };
  const toggleSidebar =()=>{
    dispatch({type:'TOGGLE_SIDEBAR',payload:''})
  }
  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
  }, [state.language]);
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);
  return (
    <AppContext.Provider value={{ ...state, changeLanguage, changeTheme , toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};
const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  } else {
    return context;
  }
};
export { AppProvider, useAppContext };
