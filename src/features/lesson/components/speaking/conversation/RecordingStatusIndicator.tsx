import { Box, LinearProgress, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface RecordingStatusIndicatorProps {
  isRecording: boolean;
}

export default function RecordingStatusIndicator({
  isRecording,
}: RecordingStatusIndicatorProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!isRecording) return null;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <LinearProgress
        color="error"
        sx={{
          height: 4,
          borderRadius: 2,
          bgcolor: isDarkMode ? color.gray700 : color.gray300,
          "& .MuiLinearProgress-bar": {
            bgcolor: color.red500,
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: color.red500,
          display: "block",
          textAlign: "center",
          mt: 0.5,
          fontWeight: "bold",
        }}
      >
        Recording...
      </Typography>
    </Box>
  );
}
