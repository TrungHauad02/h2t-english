import { Box, Typography, Paper } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

export default function AIResponseHeader() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.teal800 : color.teal500,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderLeft: `6px solid ${isDarkMode ? color.teal500 : color.teal700}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6,
        },
      }}
    >
      <SmartToyOutlinedIcon 
        sx={{ 
          fontSize: { xs: 32, md: 40 }, 
          color: isDarkMode ? color.teal200 : color.white 
        }} 
      />
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: color.white,
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          System AI Response
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.teal100 : color.teal50,
            mt: 0.5,
          }}
        >
          Manage and track AI interaction history
        </Typography>
      </Box>
    </Box>
  );
}