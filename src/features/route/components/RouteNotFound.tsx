import { Box, Paper, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function RouteNotFound() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: isDarkMode ? color.gray700 : color.white,
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: 600,
            mb: 2,
          }}
        >
          Route Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
        >
          The learning path you're looking for doesn't exist or might have been
          removed.
        </Typography>
      </Paper>
    </Box>
  );
}
