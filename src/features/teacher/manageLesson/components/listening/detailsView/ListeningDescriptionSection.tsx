import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import DescriptionIcon from "@mui/icons-material/Description";
import { Listening } from "interfaces";

export default function ListeningDescriptionSection({
  data,
}: {
  data: Listening;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray700 : color.white,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          pb: 1.5,
          borderBottom: `1px solid ${color.gray200}`,
        }}
      >
        <DescriptionIcon sx={{ mr: 1.5, color: accentColor, fontSize: 28 }} />
        <Typography variant="h6" fontWeight="medium">
          Description
        </Typography>
      </Box>

      <Typography
        variant="body1"
        paragraph
        sx={{
          lineHeight: 1.7,
          color: textColor,
          px: 1,
        }}
      >
        {data.description}
      </Typography>
    </Box>
  );
}
