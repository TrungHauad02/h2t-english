import React, { useState } from "react";
import { Box, Paper, Typography, Stack, TextField } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import SectionHeader from "../common/SectionHeader";

interface ListeningTranscriptSectionProps {
  transcript: string;
  handleSaveTranscript: (transcript: string) => void;
}

export default function ListeningTranscriptSection({
  transcript,
  handleSaveTranscript,
}: ListeningTranscriptSectionProps) {
  console.log(transcript);
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempTranscript, setTempTranscript] = useState<string>("");

  const cardBgColor = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  const handleEditMode = () => {
    setIsEditMode(true);
    setTempTranscript(transcript);
  };

  const handleTranscriptChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTempTranscript(event.target.value);
  };

  const handleSaveChanges = async () => {
    await handleSaveTranscript(tempTranscript);
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setTempTranscript("");
  };

  // Function to parse and format transcript lines
  const renderFormattedTranscript = (text: string) => {
    const lines = text.split("\n");

    return lines.map((line, index) => {
      // Check if line starts with a character name (e.g., "Emma:", "Jack:")
      const characterMatch = line.match(/^([A-Za-z]+):\s*(.*)/);

      if (characterMatch) {
        const characterName = characterMatch[1];
        const dialogue = characterMatch[2];

        return (
          <Typography
            key={index}
            variant="body1"
            sx={{
              color: textColor,
              lineHeight: 1.8,
              fontSize: "1rem",
              mb: 1.5,
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? color.teal300 : color.teal700,
              }}
            >
              {characterName}:
            </Box>{" "}
            {dialogue}
          </Typography>
        );
      }

      // Regular line without character name
      return (
        <Typography
          key={index}
          variant="body1"
          sx={{
            color: textColor,
            lineHeight: 1.8,
            fontSize: "1rem",
            mb: 1.5,
          }}
        >
          {line}
        </Typography>
      );
    });
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: cardBgColor,
        my: 4,
        border: `1px solid ${borderColor}`,
      }}
    >
      <SectionHeader
        title="Transcript Section"
        editText="Edit Transcript"
        icon={<DescriptionIcon />}
        isEditMode={isEditMode}
        handleSaveChanges={handleSaveChanges}
        handleEditMode={handleEditMode}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2}>
        {isEditMode ? (
          <TextField
            multiline
            fullWidth
            minRows={6}
            maxRows={20}
            value={tempTranscript}
            onChange={handleTranscriptChange}
            placeholder="Enter the transcript for the listening audio..."
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: secondaryBgColor,
                "& fieldset": {
                  borderColor: borderColor,
                },
                "&:hover fieldset": {
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDarkMode ? color.teal400 : color.teal600,
                },
              },
              "& .MuiInputBase-input": {
                color: textColor,
                fontSize: "1rem",
                lineHeight: 1.6,
              },
            }}
          />
        ) : transcript ? (
          <Box
            sx={{
              p: 3,
              backgroundColor: secondaryBgColor,
              borderRadius: "0.75rem",
              border: `1px solid ${borderColor}`,
              maxHeight: "600px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: isDarkMode ? color.gray700 : color.gray200,
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: isDarkMode ? color.gray600 : color.gray400,
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray500 : color.gray500,
                },
              },
            }}
          >
            <Box>{renderFormattedTranscript(transcript)}</Box>
          </Box>
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
              border: `1px dashed ${borderColor}`,
            }}
          >
            <ArticleIcon
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
              No transcript available
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray500 : color.gray500,
                maxWidth: "400px",
              }}
            >
              Click the Edit Transcript button to add a transcript for this
              listening lesson. This helps learners follow along with the audio
              content.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
