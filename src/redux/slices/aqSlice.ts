import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, Question } from "interfaces";

interface AQState {
  selectedAnswers: {
    questionId: Question["id"];
    answerId: Answer["id"];
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
        questionId: Question["id"];
        answerId: Answer["id"];
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
