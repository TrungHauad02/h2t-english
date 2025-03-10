import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";

interface WEDocumentInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  maxHeight?: string;
  padding?: string;
  fontFamily?: string;
  lineHeight?: string;
  wordBreak?: string;
  whiteSpace?: string;
  errorMessage?: string;
  valueType?: "base64" | "url" | "auto";
  returnType?: "base64" | "url";
}

// Utility function to check if a string is a URL
const isUrl = (str: string): boolean => {
  try {
    return (
      str.startsWith("http://") ||
      str.startsWith("https://") ||
      str.startsWith("/")
    );
  } catch (e) {
    return false;
  }
};

const isBase64DocxDataUrl = (str: string): boolean => {
  return str.startsWith(
    "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"
  );
};

const extractBase64FromDataUrl = (dataUrl: string): string => {
  const matches = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
  return matches ? matches[1] : dataUrl;
};

export default function WEDocumentInput({
  value,
  onChange,
  label,
  sx,
  required,
  maxHeight = "400px",
  padding = "10px",
  fontFamily = "Roboto, sans-serif",
  lineHeight = "1.5",
  wordBreak = "break-word",
  whiteSpace = "pre-wrap",
  errorMessage = "Cannot load document. Try again",
  valueType = "auto",
  returnType = "base64",
}: WEDocumentInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [isHovering, setIsHovering] = useState(false);

  const isValueUrl =
    valueType === "url" || (valueType === "auto" && isUrl(value));

  const getDisplayBase64 = (value: string): string => {
    if (isBase64DocxDataUrl(value)) {
      return extractBase64FromDataUrl(value);
    }
    return value;
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      onChange(result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".docx")) {
      handleFileRead(file);
    } else {
      console.error("Please select a DOCX file");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <Stack spacing={2} sx={sx}>
      {label && (
        <Typography
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            fontSize: "1rem",
            textAlign: "left",
            pl: "0.2rem",
          }}
        >
          {label} {required && <span style={{ color: color.red500 }}>*</span>}
        </Typography>
      )}

      {!value ? (
        <Box
          sx={{
            border: `2px dashed ${
              isHovering
                ? isDarkMode
                  ? color.emerald400
                  : color.emerald500
                : color.gray400
            }`,
            borderRadius: "1rem",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: isDarkMode ? color.gray800 : color.gray50,
            minHeight: "150px",
            transition: "border-color 0.3s ease",
            "&:hover": {
              borderColor: isDarkMode ? color.emerald400 : color.emerald500,
            },
          }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <input
            type="file"
            accept=".docx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <IconButton
            sx={{
              color: isDarkMode ? color.emerald400 : color.emerald600,
              mb: 1,
            }}
          >
            <DescriptionIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{ color: color.gray500, textAlign: "center" }}
          >
            Click to upload document
            <br />
            (DOCX files only)
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ mb: 2 }}>
            <WEDocumentViewer
              base64File={isValueUrl ? undefined : getDisplayBase64(value)}
              fileUrl={isValueUrl ? value : undefined}
              maxHeight={maxHeight}
              padding={padding}
              fontFamily={fontFamily}
              lineHeight={lineHeight}
              wordBreak={wordBreak}
              whiteSpace={whiteSpace}
              errorMessage={errorMessage}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: isDarkMode ? color.red700 : color.red600,
                "&:hover": {
                  backgroundColor: isDarkMode ? color.red800 : color.red700,
                },
              }}
              onClick={handleRemove}
            >
              Remove Document
            </Button>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
