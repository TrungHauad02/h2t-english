export const fetchFileFromUrl = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Cannot fetch file");
  }
  return await response.arrayBuffer();
};
