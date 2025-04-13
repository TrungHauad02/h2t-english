import { Vocabulary, VocabularyFilter } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features/fileHandlerService";

const findVocabByTopicId = async (
  page: number,
  itemsPerPage: number,
  topicId: number,
  filter?: VocabularyFilter
) => {
  try {
    let url = `/vocabularies?page=${
      page - 1
    }&size=${itemsPerPage}&topicId=${topicId}`;

    if (filter) {
      if (filter.status !== undefined && filter.status !== null) {
        url += `&status=${encodeURIComponent(filter.status)}`;
      }
    }

    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error getting vocab by topic id:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/vocabularies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting vocabulary by id:", error);
    throw error;
  }
};

const create = async (vocabData: Vocabulary) => {
  try {
    // Use fileHandlerService to upload image
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: vocabData.image,
      path: "vocabulary",
      randomName: "YES",
      fileName: vocabData.id.toString(),
    });

    const response = await apiClient.post("/vocabularies", {
      ...vocabData,
      image: fileResult.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating vocab:", error);
    throw error;
  }
};

const update = async (id: number, vocabData: Vocabulary) => {
  try {
    // Get existing vocabulary to retrieve old image path
    const existingVocab = await findById(id);

    // Use fileHandlerService to handle image update (upload new and delete old)
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: vocabData.image,
      path: "vocabulary",
      randomName: "YES",
      fileName: vocabData.id.toString(),
      oldFilePath: existingVocab.data.image,
    });

    vocabData.image = fileResult.data;
    const response = await apiClient.put(`/vocabularies/${id}`, vocabData);
    return response.data;
  } catch (error) {
    console.error("Error updating vocab:", error);
    throw error;
  }
};

const patch = async (id: number, vocabData: Partial<Vocabulary>) => {
  try {
    if (vocabData.image) {
      const existingVocab = await findById(id);

      // Handle file update
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: vocabData.image,
        path: "vocabulary",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingVocab.data.image,
      });

      vocabData.image = fileResult.data;
    }

    const response = await apiClient.patch(`/vocabularies/${id}`, vocabData);
    return response.data;
  } catch (error) {
    console.error("Error updating vocab:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    // Get existing vocabulary to retrieve image path
    const existingVocab = await findById(id);

    // Delete the associated image file first
    if (existingVocab.data.image) {
      await fileHandlerService.deleteFile(existingVocab.data.image);
    }

    // Then delete the vocabulary
    const response = await apiClient.delete(`/vocabularies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vocab:", error);
    throw error;
  }
};

export const vocabService = {
  findVocabByTopicId,
  findById,
  create,
  update,
  patch,
  remove,
};
