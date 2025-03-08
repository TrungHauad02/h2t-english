import mockDataVocab from "./mockDataVocab";

const getVocabByTopicId = (topicId: number) => {
  return mockDataVocab.filter((vocab) => vocab.topicId === topicId);
};

export const vocabService = {
  getVocabByTopicId,
};
