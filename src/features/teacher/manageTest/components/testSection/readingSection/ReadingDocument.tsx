import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SectionHeader from '../common/SectionHeader';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WEDocumentInput } from "components/input";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";

interface ReadingDocumentProps {
  file?: string;
  isEditingDocument: boolean;
  tempDocument: string;
  handleEditDocument: () => void;
  handleDocumentChange: (base64: string) => void;
  handleSaveDocument: () => void;
  handleCancelEdit: () => void;
}

export default function ReadingDocument({
  file,
  isEditingDocument,
  tempDocument,
  handleEditDocument,
  handleDocumentChange,
  handleSaveDocument,
  handleCancelEdit
}: ReadingDocumentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
      }}
    >
      <SectionHeader
        title="Reading Document"
        editText="Edit Document"
        icon={<DescriptionIcon />}
        isEditMode={isEditingDocument}
        handleSaveChanges={handleSaveDocument}
        handleEditMode={handleEditDocument}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2}>
        {isEditingDocument ? (
          <WEDocumentInput
            value={tempDocument}
            onChange={handleDocumentChange}
            label="Reading Document"
            maxHeight="400px"
            padding="16px"
            errorMessage="Cannot load document. Please try a different file."
            returnType="base64"
          />
        ) : file ? (
          <WEDocumentViewer
            fileUrl={file}
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