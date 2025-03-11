import { mockData } from "./mockDataListenAWriteAWord";

const getListenAndWriteAWordByListeningId = (listeningId: number) => {
  return mockData.filter((item) => item.listeningId === listeningId);
};

export const listenAndWriteAWordService = {
  getListenAndWriteAWordByListeningId,
};
