import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function TimeRemaining() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2 },
        width: "30%", 
        border: "2px solid",
        borderColor: isDarkMode ? color.gray700 : "#ccc",
        borderRadius: "10px",
        bgcolor: isDarkMode ? color.gray900 : "#f9f9f9",
        textAlign: "left",
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", 
        justifyContent: "center",
        fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem", lg: "1.2rem" },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem", lg: "1.2rem" },
          color: isDarkMode ? color.gray200 : "black",
        }}
      >
        Time remaining:
      </Typography>
    </Box>
  );
}
