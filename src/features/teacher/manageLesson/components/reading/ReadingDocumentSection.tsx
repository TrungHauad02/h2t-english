import React, { useState } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WEDocumentInput } from "components/input";
import DescriptionIcon from "@mui/icons-material/Description";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import SectionHeader from "../common/SectionHeader";

interface ReadingDocumentSectionProps {
  documentUrl: string;
  handleSaveFile: (value: string) => void;
}

export default function ReadingDocumentSection({
  documentUrl,
  handleSaveFile,
}: ReadingDocumentSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempDocument, setTempDocument] = useState<string>("");

  const cardBgColor = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  const handleEditMode = () => {
    setIsEditMode(true);
    setTempDocument("");
  };

  const handleDocumentChange = (base64: string) => {
    setTempDocument(base64);
  };

  const handleSaveChanges = () => {
    handleSaveFile(tempDocument);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setTempDocument("");
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: cardBgColor,
        mb: 4,
        border: `1px solid ${borderColor}`,
      }}
    >
      <SectionHeader
        title="Reading Document"
        editText="Edit Document"
        icon={<DescriptionIcon />}
        isEditMode={isEditMode}
        handleSaveChanges={handleSaveChanges}
        handleEditMode={handleEditMode}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2}>
        {isEditMode ? (
          <WEDocumentInput
            value={tempDocument}
            onChange={handleDocumentChange}
            label="Reading Document"
            maxHeight="400px"
            padding="16px"
            errorMessage="Cannot load document. Please try a different file."
            returnType="base64"
          />
        ) : documentUrl ? (
          <WEDocumentViewer
            fileUrl={documentUrl}
            maxHeight="400px"
            padding="16px"
            errorMessage="Cannot load document. Please try again later."
            fontFamily="Roboto, sans-serif"
            lineHeight="1.6"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
          />
        ) : (
          <Box
            sx={{
              p: 4,
              backgroundColor: secondaryBgColor,
              borderRadius: "0.75rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
            }}
          >
            <DescriptionIcon
              sx={{
                fontSize: 48,
                color: secondaryTextColor,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: secondaryTextColor,
                fontWeight: "medium",
                mb: 1,
              }}
            >
              No document has been uploaded
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
            >
              Click the Edit Document button to upload a document for this
              reading lesson.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
