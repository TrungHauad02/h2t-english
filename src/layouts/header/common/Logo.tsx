import { Typography, Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";

export default function Logo() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      <Book size={32} color={color.emerald500} />
      <Typography
        variant="h5"
        sx={{
          ml: 1,
          fontFamily: "serif",
          fontWeight: "bold",
          letterSpacing: 1,
          fontSize: "1.5rem",
          color: isDarkMode ? color.white : color.black,
        }}
      >
        H2T ENGLISH
      </Typography>
    </Box>
  );
}
