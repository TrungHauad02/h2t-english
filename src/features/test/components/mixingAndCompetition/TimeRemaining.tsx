import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function TimeRemaining() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        maxWidth: { xs:"60%"},
        bgcolor: isDarkMode ? color.emerald600 : color.emerald100,
        display: "flex",
        mx: { sm:"auto" },
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1.5,
        boxShadow: isDarkMode ? "0 0 8px rgba(0,0,0,0.5)" : "0 0 6px rgba(0,0,0,0.1)",
        border: `1px solid ${isDarkMode ? color.emerald400 : color.emerald300}`,
        mb: 2,
      }}
    >
      <AccessTimeIcon sx={{ color: isDarkMode ? "#fff" : color.emerald600 }} />

      <Typography
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem" },
          color: isDarkMode ? "#fff" : color.emerald900,
          fontWeight: "bold",
        }}
      >
        Time remaining:
      </Typography>
    </Box>
  );
}
