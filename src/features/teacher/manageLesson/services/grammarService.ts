import { Grammar } from "interfaces";
import apiClient from "services/apiClient";
import { base64ToBlobUrl } from "utils/convert";

const getGrammarById = async (id: number) => {
  try {
    const response = await apiClient.get(`/grammars/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting grammar by id:", error);
    throw error;
  }
};

const updateGrammar = async (id: number, data: Grammar) => {
  try {
    // TODO: Luu image vao firebase
    data.image = base64ToBlobUrl(data.image, "image/png");
    const response = await apiClient.put(`/grammars/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating grammar:", error);
    throw error;
  }
};

const patchGrammar = async (id: number, data: any) => {
  try {
    // TODO: Luu image vao firebase
    if (data.image) data.image = base64ToBlobUrl(data.image, "image/png");
    const response = await apiClient.patch(`/grammars/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating grammar:", error);
    throw error;
  }
};

export const grammarService = {
  getGrammarById,
  updateGrammar,
  patchGrammar,
};
