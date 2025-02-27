import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function SpeakingTopicSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        mx: { xs: 0, md: 2 },
        px: { xs: 2, md: 4 },
        py: { xs: 1, md: 2 },
        bgcolor: isDarkMode ? color.gray800 : color.gray200,
      }}
    >
      <Typography
        variant="subtitle1"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
        sx={{ color: isDarkMode ? color.emerald200 : color.emerald800 }}
      >
        You have 120 seconds to talk about this topic
      </Typography>
    </Box>
  );
}
