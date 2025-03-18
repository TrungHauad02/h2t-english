import { Box, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { Voice } from "interfaces";

export default function AvailableVoices({ voices }: { voices: Voice[] }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          color: isDarkMode ? color.teal300 : color.teal700,
        }}
      >
        <RecordVoiceOverIcon sx={{ mr: 1 }} />
        Available Voices
      </Typography>

      <Grid container spacing={2}>
        {voices.map((voice, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: "0.5rem",
                backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
              >
                {voice.voice}
              </Typography>
              <RecordVoiceOverIcon
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  fontSize: 20,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
