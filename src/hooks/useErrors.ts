import { useDispatch, useSelector } from "react-redux";
import {
  addError,
  removeError,
  clearAllErrors,
  ErrorPayload,
} from "../redux/slices/errorSlice";
import { RootState } from "../redux/type";

/**
 * Custom hook for managing errors throughout the application
 * Provides functions to show, dismiss, and clear errors
 * Also provides access to the current errors in the store
 */
export function useErrors() {
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.error.errors);

  /**
   * Show a new error notification
   * @param options Error details including message, severity, and optional detailed info
   */
  const showError = (options: ErrorPayload) => {
    dispatch(addError(options));
  };

  /**
   * Show an error notification with severity "error"
   * @param message Error message
   * @param details Optional detailed error information
   */
  const showErrorMessage = (message: string, details?: string) => {
    dispatch(
      addError({
        message,
        severity: "error",
        details,
      })
    );
  };

  /**
   * Show a warning notification
   * @param message Warning message
   * @param details Optional detailed warning information
   */
  const showWarning = (message: string, details?: string) => {
    dispatch(
      addError({
        message,
        severity: "warning",
        details,
      })
    );
  };

  /**
   * Show an info notification
   * @param message Info message
   * @param details Optional detailed info
   */
  const showInfo = (message: string, details?: string) => {
    dispatch(
      addError({
        message,
        severity: "info",
        details,
      })
    );
  };

  /**
   * Dismiss a specific error by ID
   * @param errorId ID of the error to dismiss
   */
  const dismissError = (errorId: string) => {
    dispatch(removeError(errorId));
  };

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    dispatch(clearAllErrors());
  };

  /**
   * Handle API errors and display appropriate error messages
   * @param error The error object from a try/catch block
   * @param fallbackMessage Optional fallback message if error doesn't have a message
   */
  const handleApiError = (
    error: unknown,
    fallbackMessage = "An unexpected error occurred"
  ) => {
    let message = fallbackMessage;
    let details: string | undefined;

    if (error instanceof Error) {
      message = error.message;
      details = error.stack;
    } else if (typeof error === "string") {
      message = error;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String((error as any).message);

      if ("data" in error) {
        try {
          details = JSON.stringify((error as any).data, null, 2);
        } catch (e) {
          // If stringify fails, use toString
          details = String((error as any).data);
        }
      }
    }

    showErrorMessage(message, details);
  };

  return {
    // Actions
    showError,
    showErrorMessage,
    showWarning,
    showInfo,
    dismissError,
    clearErrors,
    handleApiError,

    // State
    errors,
    hasErrors: errors.length > 0,
    latestError: errors.length > 0 ? errors[0] : null,
  };
}
