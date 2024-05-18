import { AppReducerType, DispatchAppLanguageType } from "@/types/contexts-type";

const appReducer = (
  state: AppReducerType,
  action: DispatchAppLanguageType
): AppReducerType => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "CHANGE_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    default:
      return state;
  }
};
export default appReducer;
