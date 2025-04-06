import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Voice } from "interfaces";

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
}

export default function VoiceSelector({
  voices,
  selectedVoice,
  setSelectedVoice,
}: VoiceSelectorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray700 : color.white,
        overflow: "hidden",
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        transition: "all 0.3s ease",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          backgroundColor: isDarkMode ? color.teal900 : color.teal100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: isDarkMode ? color.teal100 : color.teal800,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <RecordVoiceOverIcon fontSize="small" /> Select Voice
        </Typography>
        <Chip
          label={`${voices.length} available`}
          size="small"
          sx={{
            backgroundColor: isDarkMode ? color.teal800 : color.teal200,
            color: isDarkMode ? color.teal100 : color.teal800,
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
      </Box>
      <Divider />
      <List
        dense
        sx={{
          maxHeight: "180px",
          overflow: "auto",
          p: 1,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: isDarkMode ? color.gray600 : color.gray300,
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
          },
        }}
      >
        {voices.map((voice, index) => (
          <ListItem
            key={index}
            sx={{
              borderRadius: "0.75rem",
              mb: 0.5,
              backgroundColor:
                selectedVoice === voice.voice
                  ? isDarkMode
                    ? color.teal800
                    : color.teal100
                  : isDarkMode
                  ? color.gray800
                  : color.white,
              "&:hover": {
                backgroundColor:
                  selectedVoice === voice.voice
                    ? isDarkMode
                      ? color.teal700
                      : color.teal200
                    : isDarkMode
                    ? color.gray700
                    : color.gray100,
              },
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: `1px solid ${
                selectedVoice === voice.voice
                  ? isDarkMode
                    ? color.teal600
                    : color.teal300
                  : "transparent"
              }`,
              padding: "8px 12px",
            }}
            onClick={() => setSelectedVoice(voice.voice)}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor:
                  selectedVoice === voice.voice
                    ? isDarkMode
                      ? color.teal500
                      : color.teal500
                    : isDarkMode
                    ? color.gray600
                    : color.gray300,
                mr: 1.5,
              }}
            >
              <RecordVoiceOverIcon
                sx={{
                  fontSize: 16,
                  color:
                    selectedVoice === voice.voice
                      ? color.white
                      : isDarkMode
                      ? color.teal300
                      : color.teal700,
                }}
              />
            </Avatar>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                    fontWeight: selectedVoice === voice.voice ? 600 : 400,
                  }}
                >
                  {voice.name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
