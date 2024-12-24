import { useSelector } from "react-redux";
import { RootState } from "redux/type";

export const useDarkMode = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return {
    isDarkMode,
  };
};
