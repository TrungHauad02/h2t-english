import { VocabularyFilter } from "interfaces";
import apiClient from "services/apiClient";

const getVocabByTopicId = async (
  page: number,
  itemsPerPage: number,
  topicId: number,
  filter?: VocabularyFilter
) => {
  try {
    const url = `/vocabularies?page=${page}&itemsPerPage=${itemsPerPage}&topicId=${topicId}`;

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting vocab by topic id:", error);
    throw error;
  }
};

export const vocabService = {
  getVocabByTopicId,
};
