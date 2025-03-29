import React, { useState } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { WEAudioInput } from "components/input";
import SectionHeader from "../common/SectionHeader";

interface ListeningAudioSectionProps {
  audio: string;
  onAudioChange: (base64: string) => void;
  onSave: () => void;
}

export default function ListeningAudioSection({
  audio,
  onAudioChange,
  onSave,
}: ListeningAudioSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempAudio, setTempAudio] = useState<string>("");

  const cardBgColor = isDarkMode ? color.gray800 : color.gray50;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  const handleEditMode = () => {
    setIsEditMode(true);
    setTempAudio(audio);
  };

  const handleAudioChange = (base64: string) => {
    setTempAudio(base64);
  };

  const handleSaveChanges = () => {
    onAudioChange(tempAudio);
    onSave();
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setTempAudio("");
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
        title="Audio Section"
        editText="Edit Audio"
        icon={<AudioFileIcon />}
        isEditMode={isEditMode}
        handleSaveChanges={handleSaveChanges}
        handleEditMode={handleEditMode}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2}>
        {isEditMode ? (
          <WEAudioInput
            value={tempAudio}
            onChange={handleAudioChange}
            label="Listening Audio"
            errorMessage="Cannot load audio. Please try a different file."
          />
        ) : audio ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              p: 3,
              backgroundColor: secondaryBgColor,
              borderRadius: "0.75rem",
            }}
          >
            <audio controls src={audio} style={{ width: "100%" }} />
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
              minHeight: "150px",
            }}
          >
            <MusicNoteIcon
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
              No audio has been uploaded
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
            >
              Click the Edit Audio button to upload an audio file for this
              listening lesson.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
