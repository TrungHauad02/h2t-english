import { Vocabulary, VocabularyFilter } from "interfaces";
import apiClient from "services/apiClient";

const getVocabByTopicId = async (
  page: number,
  itemsPerPage: number,
  topicId: number,
  filter?: VocabularyFilter
) => {
  try {
    const url = `/vocabularies?page=${
      page - 1
    }&itemsPerPage=${itemsPerPage}&topicId=${topicId}`;

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting vocab by topic id:", error);
    throw error;
  }
};

const createVocab = async (data: Vocabulary) => {
  try {
    const response = await apiClient.post("/vocabularies", data);
    return response.data;
  } catch (error) {
    console.error("Error creating vocab:", error);
    throw error;
  }
};

const updateVocab = async (id: number, data: Vocabulary) => {
  try {
    const response = await apiClient.put(`/vocabularies/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating vocab:", error);
    throw error;
  }
};

export const vocabService = {
  getVocabByTopicId,
  createVocab,
  updateVocab,
};
