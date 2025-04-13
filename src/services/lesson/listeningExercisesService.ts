import { ListenAndWriteAWord } from "interfaces";
import apiClient from "services/apiClient";
import { fileHandlerService } from "services/features";

const findById = async (id: number) => {
  try {
    const response = await apiClient.get(`/listen-and-write-a-word/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting listening exercises by id:", error);
    throw error;
  }
};

const findByListeningId = async (listeningId: number) => {
  try {
    const response = await apiClient.get(
      `/listen-and-write-a-word?listeningId=${listeningId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting listening exercises by id:", error);
    throw error;
  }
};

const create = async (data: ListenAndWriteAWord) => {
  try {
    const audioResult = await fileHandlerService.handleFileUpdate({
      base64: data.audio,
      path: "listen-and-write-a-word",
      randomName: "YES",
      fileName: data.id.toString(),
    });

    const response = await apiClient.post("/listen-and-write-a-word", {
      ...data,
      audio: audioResult.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating listening exercises:", error);
    throw error;
  }
};

const update = async (id: number, data: ListenAndWriteAWord) => {
  try {
    const existingData = await findById(id);
    const audioResult = await fileHandlerService.handleFileUpdate({
      base64: data.audio,
      path: "listen-and-write-a-word",
      randomName: "YES",
      fileName: data.id.toString(),
      oldFilePath: existingData.data.audio,
    });

    data.audio = audioResult.data;

    const response = await apiClient.put(
      `/listen-and-write-a-word/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating listening exercises:", error);
    throw error;
  }
};

const patch = async (id: number, data: Partial<ListenAndWriteAWord>) => {
  try {
    const existingData = await findById(id);

    if (data.audio) {
      const audioResult = await fileHandlerService.handleFileUpdate({
        base64: data.audio,
        path: "listen-and-write-a-word",
        randomName: "YES",
        fileName: id.toString(),
        oldFilePath: existingData.data.audio,
      });
      data.audio = audioResult.data;
    }

    const response = await apiClient.patch(
      `/listen-and-write-a-word/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching listening exercises:", error);
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await apiClient.delete(`/listen-and-write-a-word/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error patching listening exercises:", error);
    throw error;
  }
};

export const listeningExercisesService = {
  findById,
  findByListeningId,
  create,
  update,
  patch,
  remove,
};
