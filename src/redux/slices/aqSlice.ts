import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AQState {
  selectedAnswers: {
    questionId: string;
    answerId: string;
  }[];
}

const initialState: AQState = {
  selectedAnswers: [],
};

export const aqSlice = createSlice({
  name: "aq",
  initialState,
  reducers: {
    selectAnswer: (
      state,
      action: PayloadAction<{
        questionId: string;
        answerId: string;
      }>
    ) => {
      const { questionId, answerId } = action.payload;
      const existingSelection = state.selectedAnswers.find(
        (selection) => selection.questionId === questionId
      );

      if (existingSelection) {
        existingSelection.answerId = answerId;
      } else {
        state.selectedAnswers.push({ questionId, answerId });
      }
    },
    clearAnswers: (state) => {
      state.selectedAnswers = [];
    },
  },
});

export const { selectAnswer, clearAnswers } = aqSlice.actions;
export default aqSlice.reducer;
