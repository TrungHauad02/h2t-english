import { Vocabulary, VocabularyFilter } from "interfaces";
import apiClient from "services/apiClient";

const findVocabByTopicId = async (
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

const create = async (data: Vocabulary) => {
  try {
    const response = await apiClient.post("/vocabularies", data);
    return response.data;
  } catch (error) {
    console.error("Error creating vocab:", error);
    throw error;
  }
};

const update = async (id: number, data: Vocabulary) => {
  try {
    const response = await apiClient.put(`/vocabularies/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating vocab:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/vocabularies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vocab:", error);
    throw error;
  }
};

export const vocabService = {
  findVocabByTopicId,
  create,
  update,
  remove,
};
