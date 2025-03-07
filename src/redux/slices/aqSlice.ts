import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LessonAnswer, LessonQuestion } from "interfaces";

interface AQState {
  selectedAnswers: {
    questionId: LessonQuestion["id"];
    answerId: LessonAnswer["id"];
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
        questionId: LessonQuestion["id"];
        answerId: LessonAnswer["id"];
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
