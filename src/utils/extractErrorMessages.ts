/**
 * Extracts field-specific error messages from API error responses
 *
 * If field-specific errors exist, they are combined into a single string
 * If no field errors exist, returns the general error message
 *
 * @param error The error response from API
 * @returns A string containing all error messages
 */
export function extractErrorMessages(error: unknown): string {
  // Default error message if we can't extract anything
  const defaultErrorMessage = "An unexpected error occurred";

  try {
    // Check if error has axios response structure
    if (error && typeof error === "object" && "response" in error) {
      const response = (error as any).response;

      // Check if response has data
      if (response && response.data) {
        const responseData = response.data;

        // Check if there are field-specific errors in data.data object
        if (responseData.data && typeof responseData.data === "object") {
          // Get all field error messages and filter out empty ones
          const fieldErrors = Object.values(responseData.data)
            .filter((value) => value && typeof value === "string")
            .map((message) => String(message));

          // If we have field errors, combine them
          if (fieldErrors.length > 0) {
            return fieldErrors.join(", ");
          }
        }

        // If no field errors, return the general message
        if (responseData.message) {
          return responseData.message;
        }
      }
    }

    // Direct error without response structure (might be from other sources)
    if (error && typeof error === "object" && "data" in error) {
      const errorData = (error as any).data;

      // If error.data.data exists and has fields with error messages
      if (errorData.data && typeof errorData.data === "object") {
        const fieldErrors = Object.values(errorData.data)
          .filter((value) => value && typeof value === "string")
          .map((message) => String(message));

        if (fieldErrors.length > 0) {
          return fieldErrors.join(", ");
        }
      }

      // If no field errors, return the general message
      if (errorData.message) {
        return errorData.message;
      }
    }

    // Handle case where error is already the data object
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      "data" in error &&
      "message" in error
    ) {
      const errorObj = error as any;

      // Check if there are field errors in data object
      if (errorObj.data && typeof errorObj.data === "object") {
        const fieldErrors = Object.values(errorObj.data)
          .filter((value) => value && typeof value === "string")
          .map((message) => String(message));

        if (fieldErrors.length > 0) {
          return fieldErrors.join(", ");
        }
      }

      // If no field errors, return the general message
      if (errorObj.message) {
        return errorObj.message;
      }
    }

    // If error is a regular Error object
    if (error instanceof Error) {
      return error.message;
    }

    // If error is a string
    if (typeof error === "string") {
      return error;
    }
  } catch (e) {
    // If anything goes wrong while parsing the error
    console.error("Error extracting error messages:", e);
  }

  // Default case if we couldn't extract any meaningful error
  return defaultErrorMessage;
}
