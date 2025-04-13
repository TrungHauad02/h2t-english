import { Topic } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features/fileHandlerService";

const getLessonsForStudent = async (page: number, itemsPerPage: number) => {
  try {
    const response = await apiClient.get(
      `/topics?page=${page - 1}&size=${itemsPerPage}&status=true`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting topics:", error);
    throw error;
  }
};

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/topics/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting topic by id:", error);
    throw error;
  }
};

const create = async (topicData: Topic) => {
  try {
    // Use fileHandlerService to upload image
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: topicData.image,
      path: "topic",
      randomName: "YES",
      fileName: topicData.id.toString(),
    });

    const response = await apiClient.post("/topics", {
      ...topicData,
      image: fileResult.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating topic:", error);
    throw error;
  }
};

const update = async (topicId: number, topicData: Topic) => {
  try {
    // Get existing topic to retrieve old image path
    const existingTopic = await findById(topicId);

    // Use fileHandlerService to handle image update (upload new and delete old)
    const fileResult = await fileHandlerService.handleFileUpdate({
      base64: topicData.image,
      path: "topic",
      randomName: "YES",
      fileName: topicData.id.toString(),
      oldFilePath: existingTopic.data.image,
    });

    topicData.image = fileResult.data;
    const response = await apiClient.put(`/topics/${topicId}`, topicData);
    return response.data;
  } catch (error) {
    console.error("Error updating topic:", error);
    throw error;
  }
};

const patch = async (topicId: number, topicData: Partial<Topic>) => {
  try {
    if (topicData.image) {
      const existingTopic = await findById(topicId);

      // Handle file update
      const fileResult = await fileHandlerService.handleFileUpdate({
        base64: topicData.image,
        path: "topic",
        randomName: "YES",
        fileName: topicId.toString(),
        oldFilePath: existingTopic.data.image,
      });

      topicData.image = fileResult.data;
    }

    const response = await apiClient.patch(`/topics/${topicId}`, topicData);
    return response.data;
  } catch (error) {
    console.error("Error updating topic:", error);
    throw error;
  }
};

const verify = async (id: number) => {
  try {
    const response = await apiClient.get(`/topics/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error verifying topic:", error);
    throw error;
  }
};

export const topicService = {
  findById,
  create,
  update,
  patch,
  verify,
  getLessonsForStudent,
};
