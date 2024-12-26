import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { getIntroductionTextByType } from "../services/introductionService";
import { useParams } from "react-router-dom";

export default function Introduction() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const { type } = useParams();
  const introInfo = getIntroductionTextByType(type ? type : "");
  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.emerald200 : color.emerald100,
        padding: "2rem",
        borderRadius: "1rem",
        marginX: "5%",
        marginY: "2rem",
        textAlign: "center",
        boxShadow: `0px 4px 12px ${color.emerald800}80`,
        border: `2px solid ${isDarkMode ? color.emerald500 : color.emerald700}`,
      }}
    >
      <Typography
        variant="h4"
        component="h5"
        sx={{
          fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
          color: color.emerald900,
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        {introInfo.title}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          display: { xs: "none", sm: "block" },
          color: color.emerald800,
          marginBottom: "1rem",
        }}
      >
        {introInfo.subtitle}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          color: color.emerald700,
        }}
      >
        {introInfo.bodyText}
      </Typography>
    </Box>
  );
}
