export const convertBase64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const byteCharacters = atob(base64);
  const byteArrays = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }

  const arrayBuffer = new ArrayBuffer(byteArrays.length);
  const view = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteArrays.length; i++) {
    view[i] = byteArrays[i];
  }

  return arrayBuffer;
};

export const base64ToBlobUrl = (base64: string): string => {
  if (!base64) return "";
  if (base64.startsWith("blob:")) {
    return base64;
  }
  const base64Data = base64.split(",")[1];

  const byteCharacters = atob(base64Data);

  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type: "image/png" });

  return URL.createObjectURL(blob);
};

export const base64DocxToBlobUrl = (base64: string): string => {
  if (!base64) return "";
  if (base64.startsWith("blob:")) {
    return base64;
  }
  const base64Data = base64.split(",")[1];

  const byteCharacters = atob(base64Data);

  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArray], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  return URL.createObjectURL(blob);
};

export const base64AudioToBlobUrl = (base64: string): string => {
  if (!base64) return "";
  if (base64.startsWith("blob:")) {
    return base64;
  }
  const base64Data = base64.split(",")[1];

  const byteCharacters = atob(base64Data);

  const byteArray = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteArray], {
    type: "audio/mpeg",
  });

  return URL.createObjectURL(blob);
};

export const convertToDate = (
  dateString: string | undefined
): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  date.setHours(23, 59, 59, 999);
  return date;
};
