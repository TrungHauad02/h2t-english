import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorItem, ErrorSeverity } from "components/display/error/types";

// Interface for error payload when adding a new error
export interface ErrorPayload {
  message: string;
  severity: ErrorSeverity;
  details?: string;
}

interface ErrorState {
  errors: ErrorItem[];
}

const initialState: ErrorState = {
  errors: [],
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    /**
     * Add a new error to the store
     * Automatically generates ID and timestamp
     */
    addError: (state, action: PayloadAction<ErrorPayload>) => {
      const newError: ErrorItem = {
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date(),
      };
      state.errors = [newError, ...state.errors];
    },

    /**
     * Remove a specific error by ID
     */
    removeError: (state, action: PayloadAction<string>) => {
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    },

    /**
     * Clear all errors from the store
     */
    clearAllErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { addError, removeError, clearAllErrors } = errorSlice.actions;
export default errorSlice.reducer;
