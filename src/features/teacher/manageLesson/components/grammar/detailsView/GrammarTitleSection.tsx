import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Grammar } from "interfaces";
import useColor from "theme/useColor";

interface GrammarTitleSectionProps {
  data: Grammar;
}

export default function GrammarTitleSection({
  data,
}: GrammarTitleSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  return (
    <Box
      sx={{
        bgcolor: cardBgColor,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        sx={{
          color: isDarkMode ? color.teal200 : color.teal700,
        }}
      >
        {data.title}
      </Typography>
    </Box>
  );
}
