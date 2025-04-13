import { RandomName } from "interfaces";
import { minioService } from "./minioService";

interface FileUpdateOptions {
  base64?: string; // File content in base64 format
  path: string; // Storage path/directory for the file
  randomName?: RandomName; // Whether to generate a random name
  fileName: string; // Name of the file
  oldFilePath?: string; // Path to the old file (if exists)
}

/**
 * Extracts the object name from a full Minio URL
 * Example: http://localhost:9000/h2t-english/route/-1-1a14af94-8862-4372-ae60-43519dc164bb
 * Returns: route/-1-1a14af94-8862-4372-ae60-43519dc164bb
 */
const extractObjectNameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split("/");
    parts.splice(0, 2);
    return parts.join("/");
  } catch (error) {
    console.error("Error extracting object name from URL:", error);
    return url;
  }
};

const handleFileUpdate = async ({
  base64,
  path,
  randomName = "NO",
  fileName,
  oldFilePath,
}: FileUpdateOptions) => {
  try {
    // Check if the base64 string is valid
    if (base64 && typeof base64 === "string" && isUrlString(base64)) {
      return { data: base64 };
    }

    if (oldFilePath && base64) {
      // Upload new file first
      const uploadResult = await minioService.uploadFile(
        base64,
        path,
        randomName,
        fileName
      );

      // If upload succeeded, delete old file
      if (uploadResult && oldFilePath) {
        try {
          // Extract object name from the full URL before deleting
          const objectName = extractObjectNameFromUrl(oldFilePath);
          await minioService.deleteFile(objectName);
        } catch (deleteError) {
          console.error(
            "Error deleting old file, but new file was uploaded successfully:",
            deleteError
          );
        }
      }

      return uploadResult;
    }
    // Case: New file provided but no old file exists (create scenario)
    else if (base64) {
      return await minioService.uploadFile(base64, path, randomName, fileName);
    }
    // Case: No new file provided (keep existing file)
    return { data: oldFilePath };
  } catch (error) {
    console.error("Error handling file update:", error);
    throw error;
  }
};

const deleteFile = async (filePath: string | undefined) => {
  if (!filePath) return { success: true, message: "No file to delete" };

  try {
    // Extract object name from the full URL before deleting
    const objectName = extractObjectNameFromUrl(filePath);
    const result = await minioService.deleteFile(objectName);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

const isFilePathChanged = (
  oldPath: string | undefined,
  newPath: string | undefined
): boolean => {
  if (!oldPath && !newPath) return false;
  if (!oldPath || !newPath) return true;
  return oldPath !== newPath;
};

const isUrlString = (str: string) => {
  return str.startsWith("http://") || str.startsWith("https://");
};

export const fileHandlerService = {
  handleFileUpdate,
  deleteFile,
  isFilePathChanged,
};
