import { CSSProperties, useEffect, useState } from "react";
import mammoth from "mammoth";
import {
  Box,
  CircularProgress,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { convertBase64ToArrayBuffer } from "utils/convert";
import { fetchFileFromUrl } from "utils/fetchFile";

interface WEDocumentViewerProps {
  base64File?: string;
  fileUrl?: string;
  errorMessage?: string;
  maxHeight?: string;
  padding?: string;
  sx?: SxProps<Theme>;
  fontFamily?: string;
  lineHeight?: string;
  wordBreak?: string;
  whiteSpace?: string;
}

export default function WEDocumentViewer({
  base64File,
  fileUrl,
  errorMessage = "Cannot load data. Try again",
  maxHeight = "400px",
  padding = "10px",
  sx,
  fontFamily = "Roboto, sans-serif",
  lineHeight = "1.5",
  wordBreak = "break-word",
  whiteSpace = "pre-wrap",
}: WEDocumentViewerProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const complexSx: SxProps<Theme> = {
    maxHeight: maxHeight,
    padding: padding,
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    overflowY: "auto",
    position: "relative",
    ...sx,
  };

  const customStyle: CSSProperties = {
    fontFamily: fontFamily,
    lineHeight: lineHeight,
    wordBreak: wordBreak as "normal" | "break-word" | "keep-all",
    whiteSpace: whiteSpace,
    padding: padding,
  };

  useEffect(() => {
    const loadFile = async () => {
      try {
        let arrayBuffer: ArrayBuffer | null = null;
        if (base64File) {
          arrayBuffer = convertBase64ToArrayBuffer(base64File);
        } else if (fileUrl) {
          arrayBuffer = await fetchFileFromUrl(fileUrl);
        }

        if (arrayBuffer) {
          mammoth
            .convertToHtml({ arrayBuffer })
            .then((result) => {
              setHtmlContent(result.value);
              setError("");
            })
            .catch((err) => {
              setError(errorMessage);
              console.error(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          throw new Error("Did not get any data. Try again");
        }
      } catch (err) {
        setError(errorMessage);
        console.error(err);
        setIsLoading(false);
      }
    };

    loadFile();
  }, [base64File, fileUrl, errorMessage]);

  return (
    <Box sx={complexSx}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <div
          style={customStyle}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </Box>
  );
}
