import { useDispatch } from "react-redux";
import {
  addError,
  removeError,
  clearAllErrors,
} from "../redux/slices/errorSlice";

export interface ErrorOptions {
  message: string;
  severity: "error" | "warning" | "info";
  details?: string;
}

export function useErrors() {
  const dispatch = useDispatch();

  const showError = (options: ErrorOptions) => {
    dispatch(addError(options));
  };

  const dismissError = (errorId: string) => {
    dispatch(removeError(errorId));
  };

  const clearErrors = () => {
    dispatch(clearAllErrors());
  };

  return {
    showError,
    dismissError,
    clearErrors,
  };
}
