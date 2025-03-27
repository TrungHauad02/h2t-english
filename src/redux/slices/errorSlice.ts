import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the error interface with proper types
export type ErrorSeverity = "error" | "warning" | "info";

export interface ErrorItem {
  id: string;
  message: string;
  timestamp: Date;
  severity: ErrorSeverity;
  details?: string;
}

export type NewErrorPayload = Omit<ErrorItem, "id" | "timestamp">;

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
    addError: (state, action: PayloadAction<NewErrorPayload>) => {
      const newError: ErrorItem = {
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date(),
      };
      state.errors = [newError, ...state.errors];
    },
    removeError: (state, action: PayloadAction<string>) => {
      state.errors = state.errors.filter(
        (error) => error.id !== action.payload
      );
    },
    clearAllErrors: (state) => {
      state.errors = [];
    },
  },
});

export const { addError, removeError, clearAllErrors } = errorSlice.actions;
export default errorSlice.reducer;
