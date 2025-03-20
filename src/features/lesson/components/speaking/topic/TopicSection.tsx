import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function TopicSection({ topic }: { topic: string }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  return (
    <Box
      sx={{
        p: 2,
        mb: 3,
        bgcolor: isDarkMode ? color.gray700 : color.gray200,
        borderRadius: 1,
        borderLeft: `4px solid ${
          isDarkMode ? color.emerald400 : color.emerald600
        }`,
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="subtitle1"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
        sx={{ color: isDarkMode ? color.emerald200 : color.emerald800 }}
      >
        Speaking Topic
      </Typography>
      <Typography
        variant="h5"
        mt={1}
        sx={{ color: isDarkMode ? color.white : color.gray900 }}
      >
        {topic}
      </Typography>
    </Box>
  );
}
