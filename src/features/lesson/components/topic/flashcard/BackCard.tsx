import { Box, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Vocabulary } from "interfaces";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import React from "react";

interface BackCardProps {
  vocab: Vocabulary;
}

export default function BackCard({ vocab }: BackCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;
  const textColor = isDarkMode ? color.white : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const sectionBgColor = isDarkMode ? color.gray700 : color.teal50;
  const borderColor = isDarkMode ? color.gray600 : color.gray200;

  const handleSpeakerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    speechSynthesis.speak(utterance);
  };

  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "1.25rem",
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 10px 25px rgba(0,0,0,0.3)"
          : "0 8px 20px rgba(0,0,0,0.15)",
        border: `1px solid ${borderColor}`,
        bgcolor: backgroundColor,
        cursor: "pointer",
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 15px 30px rgba(0,0,0,0.4)"
            : "0 12px 28px rgba(0,0,0,0.2)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${
            isDarkMode ? color.gray600 : color.gray200
          }`,
          bgcolor: isDarkMode ? color.gray700 : color.teal100,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: textColor,
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            {vocab.word}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: secondaryTextColor,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                px: 1,
                py: 0.2,
                borderRadius: "0.5rem",
                bgcolor: isDarkMode ? color.gray600 : color.teal200,
                fontSize: "0.75rem",
                fontWeight: "medium",
              }}
            >
              {vocab.wordType}
            </Box>
            {vocab.phonetic}
          </Typography>
        </Box>

        <Tooltip title="Listen to pronunciation" arrow>
          <IconButton
            onClick={handleSpeakerClick}
            sx={{
              bgcolor: isDarkMode ? color.teal700 : color.teal200,
              color: isDarkMode ? color.teal200 : color.teal700,
              "&:hover": {
                bgcolor: isDarkMode ? color.teal600 : color.teal300,
              },
              width: 40,
              height: 40,
            }}
          >
            <VolumeUpRounded />
          </IconButton>
        </Tooltip>
      </Box>

      <Stack spacing={2} sx={{ p: 2, flex: 1, overflow: "auto" }}>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: accentColor,
              fontWeight: "bold",
              mb: 1,
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '""',
                display: "inline-block",
                width: 3,
                height: 16,
                bgcolor: accentColor,
                mr: 1,
                borderRadius: 4,
              },
            }}
          >
            Meaning
          </Typography>
          <Box
            sx={{
              p: 1.5,
              bgcolor: sectionBgColor,
              borderRadius: "0.75rem",
              border: `1px solid ${isDarkMode ? color.gray600 : color.teal100}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: textColor,
                lineHeight: 1.5,
              }}
            >
              {vocab.meaning}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              color: accentColor,
              fontWeight: "bold",
              mb: 1,
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '""',
                display: "inline-block",
                width: 3,
                height: 16,
                bgcolor: accentColor,
                mr: 1,
                borderRadius: 4,
              },
            }}
          >
            Example
          </Typography>
          <Box
            sx={{
              p: 1.5,
              bgcolor: sectionBgColor,
              borderRadius: "0.75rem",
              border: `1px solid ${isDarkMode ? color.gray600 : color.teal100}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: textColor,
                fontStyle: "italic",
                lineHeight: 1.5,
                position: "relative",
                pl: 2,
              }}
            >
              {vocab.example}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
