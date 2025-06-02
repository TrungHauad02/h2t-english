import { PreparationType } from "interfaces";

export const PREPARATION_TYPE_DEFAULTS = {
  [PreparationType.MATCH_WORD_WITH_SENTENCES]: {
    title: "Match Words with Sentences",
    tip: "Drag and drop the words to match them with the correct sentences. Pay attention to grammar and context clues.",
  },
  [PreparationType.CLASSIFY]: {
    title: "Classify Items",
    tip: "Sort the items into the correct categories. Read each item carefully and think about which group it belongs to.",
  },
  [PreparationType.WORDS_MAKE_SENTENCES]: {
    title: "Make Sentences from Words",
    tip: "Arrange the given words to form grammatically correct and meaningful sentences. Consider word order and sentence structure.",
  },
};

export function getPreparationDefaults(type: PreparationType) {
  return (
    PREPARATION_TYPE_DEFAULTS[type] || {
      title: "",
      tip: "",
    }
  );
}
