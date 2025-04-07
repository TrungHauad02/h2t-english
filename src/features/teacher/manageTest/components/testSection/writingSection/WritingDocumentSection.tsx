import React, { useState } from "react";
import { Box, Paper, Typography, Stack, Alert, TextField, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WEDocumentInput } from "components/input";
import SubjectIcon from "@mui/icons-material/Subject";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import SectionHeader from "../../SectionHeader";

interface TopicSectionProps {
  documentUrl: string;
  onDocumentChange: (base64: string, minWords: number, maxWords: number) => void;
}

export default function TopicSection({
  documentUrl,
  onDocumentChange,
}: TopicSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempDocument, setTempDocument] = useState<string>("");
  const [minWords, setMinWords] = useState<number>(50);
  const [maxWords, setMaxWords] = useState<number>(300);
  const [tempMinWords, setTempMinWords] = useState<number>(50);
  const [tempMaxWords, setTempMaxWords] = useState<number>(300);
  const [wordCountError, setWordCountError] = useState<string | null>(null);

  const cardBgColor = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;


  const handleEditMode = () => {
    setIsEditMode(true);
    setTempDocument(documentUrl || "");
    setWordCountError(null);
    setTempMinWords(minWords);
    setTempMaxWords(maxWords);
  };

  const handleDocumentChange = (base64: string) => {
    setTempDocument(base64);
  };

  const handleSaveChanges = () => {
    // Validate limits
    if (tempMinWords >= tempMaxWords) {
      setWordCountError("Minimum words must be less than maximum words");
      return;
    }
    
    if (tempMinWords < 1) {
      setWordCountError("Minimum words must be at least 1");
      return;
    }

    // Save new limits and document
    setMinWords(tempMinWords);
    setMaxWords(tempMaxWords);
    onDocumentChange(tempDocument, tempMinWords, tempMaxWords);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setTempDocument("");
    setWordCountError(null);
    setTempMinWords(minWords);
    setTempMaxWords(maxWords);
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
        title="Topic"
        editText="Edit Topic"
        icon={<SubjectIcon />}
        isEditMode={isEditMode}
        handleSaveChanges={handleSaveChanges}
        handleEditMode={handleEditMode}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2}>
        {isEditMode ? (
          <>
            <WEDocumentInput
              value={tempDocument}
              onChange={handleDocumentChange}
              label="Topic Description"
              maxHeight="400px"
              padding="16px"
              errorMessage="Cannot load topic. Please try again."
              returnType="base64"
            />
            
            {/* Student word limits section */}
            <Box 
              sx={{ 
                backgroundColor: secondaryBgColor,
                p: 2,
                borderRadius: '0.75rem'
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoOutlinedIcon fontSize="small" />
                Student Response Word Limits
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Minimum words required:</Typography>
                  <TextField
                    type="number"
                    value={tempMinWords}
                    onChange={(e) => setTempMinWords(Number(e.target.value))}
                    size="small"
                    variant="outlined"
                    sx={{ width: 100 }}
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Maximum words allowed:</Typography>
                  <TextField
                    type="number"
                    value={tempMaxWords}
                    onChange={(e) => setTempMaxWords(Number(e.target.value))}
                    size="small"
                    variant="outlined"
                    sx={{ width: 100 }}
                    InputProps={{ inputProps: { min: 2 } }}
                  />
                </Box>
              </Stack>
            </Box>

            {/* Word count error alert */}
            {wordCountError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {wordCountError}
              </Alert>
            )}
          </>
        ) : documentUrl ? (
          <>
            <WEDocumentViewer
              fileUrl={documentUrl}
              maxHeight="400px"
              padding="16px"
              errorMessage="Cannot load topic. Please try again later."
              fontFamily="Roboto, sans-serif"
              lineHeight="1.6"
              wordBreak="break-word"
              whiteSpace="pre-wrap"
            />

            {/* Student word limits display when not in edit mode */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: secondaryBgColor,
                p: 2,
                borderRadius: '0.75rem'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography 
                  variant="body1" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    fontWeight: 'medium' 
                  }}
                >
                  <InfoOutlinedIcon 
                    sx={{ 
                      color: secondaryTextColor,
                      fontSize: 20 
                    }} 
                  />
                  Student Response Limits:
                </Typography>
                
                <Chip 
                  label={`Minimum: ${minWords} words`} 
                  size="small" 
                  variant="outlined" 
                  sx={{ 
                    borderColor: secondaryTextColor,
                    color: secondaryTextColor
                  }}
                />
                <Chip 
                  label={`Maximum: ${maxWords} words`} 
                  size="small" 
                  variant="outlined" 
                  sx={{ 
                    borderColor: secondaryTextColor,
                    color: secondaryTextColor
                  }}
                />
              </Stack>
            </Box>
          </>
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
            <SubjectIcon
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
              No topic has been added
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: secondaryTextColor }}
            >
              Click the Edit Topic button to add a topic description.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}