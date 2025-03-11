import React, { useState, useRef } from "react";
import { Box, Typography, Button, Stack, SxProps, Theme } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WEAudioInputProps {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
  required?: boolean;
  errorMessage?: string;
}

export default function WEAudioInput({
  value,
  onChange,
  label,
  sx,
  required,
  errorMessage = "Cannot load audio. Please try a different file.",
}: WEAudioInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [error, setError] = useState<boolean>(false);

  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      setError(false);
    };
    reader.onerror = () => {
      setError(true);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      handleFileRead(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setError(false);
  };

  const renderAudioContent = () => {
    if (error) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: isDarkMode ? color.red400 : color.red600 }}
          >
            {errorMessage}
          </Typography>
        </Box>
      );
    }

    if (value) {
      return (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 2,
          }}
        >
          <audio
            controls
            src={value}
            style={{ width: "100%", marginBottom: "1rem" }}
            onError={() => setError(true)}
          />
          <Typography variant="body2" sx={{ color: secondaryTextColor }}>
            Click to replace audio or use the button below to remove
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
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
          Click to upload audio file
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
        >
          Supported formats: MP3, WAV, OGG
        </Typography>
      </Box>
    );
  };

  return (
    <Stack spacing={1} sx={sx}>
      {label && (
        <Typography
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            fontSize: "1rem",
            textAlign: "left",
            pl: "0.2rem",
          }}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <Box
        sx={{
          border: `2px dashed ${
            error ? (isDarkMode ? color.red400 : color.red600) : color.gray400
          }`,
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundColor: secondaryBgColor,
          minHeight: 120,
          overflow: "hidden",
          "&:hover": {
            borderColor: error
              ? isDarkMode
                ? color.red500
                : color.red700
              : isDarkMode
              ? color.emerald400
              : color.emerald500,
          },
        }}
        onClick={handleClick}
      >
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {renderAudioContent()}
      </Box>
      {value && !error && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleRemoveAudio}
            size="small"
            sx={{
              borderColor: isDarkMode ? color.red400 : color.red600,
              color: isDarkMode ? color.red400 : color.red600,
              "&:hover": {
                borderColor: isDarkMode ? color.red500 : color.red700,
                bgcolor: "rgba(220, 38, 38, 0.04)",
              },
            }}
          >
            Remove Audio
          </Button>
        </Box>
      )}
    </Stack>
  );
}
