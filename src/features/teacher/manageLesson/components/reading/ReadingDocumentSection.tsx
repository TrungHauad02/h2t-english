import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WEDocumentInput } from "components/input";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";

interface ReadingDocumentSectionProps {
  documentUrl: string;
  onDocumentChange: (base64: string) => void;
}

export default function ReadingDocumentSection({
  documentUrl,
  onDocumentChange,
}: ReadingDocumentSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempDocument, setTempDocument] = useState<string>("");

  const cardBgColor = isDarkMode ? color.gray800 : color.gray50;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
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
    onDocumentChange(tempDocument);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <DescriptionIcon
            sx={{
              mr: 1.5,
              color: accentColor,
              fontSize: 28,
            }}
          />
          <Typography variant="h5" fontWeight="medium" color={textColor}>
            Reading Document
          </Typography>
        </Box>

        {isEditMode ? (
          <Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveChanges}
              sx={{
                bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
                color: "white",
                mr: 1,
                "&:hover": {
                  bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
                },
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleCancelEdit}
              sx={{
                borderColor: isDarkMode ? color.red400 : color.red600,
                color: isDarkMode ? color.red400 : color.red600,
                "&:hover": {
                  borderColor: isDarkMode ? color.red500 : color.red700,
                  bgcolor: "rgba(220, 38, 38, 0.04)",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditMode}
            sx={{
              bgcolor: isDarkMode ? color.emerald400 : color.emerald600,
              color: "white",
              "&:hover": {
                bgcolor: isDarkMode ? color.emerald500 : color.emerald700,
              },
            }}
          >
            Edit Document
          </Button>
        )}
      </Box>

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
