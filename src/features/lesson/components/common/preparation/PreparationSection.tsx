import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Preparation } from "interfaces";
import useColor from "theme/useColor";
import PreparationMakeSentencesSection from "./makeSentences/PreparationMakeSentencesSection";

export default function PreparationSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const data: Preparation = {
    id: 1,
    questions: [1],
    status: true,
    tip: "This is tip for studying",
    title: "Preparation Classify",
    type: "CLASSIFY",
  };
  return (
    <Box
      sx={{
        mx: { xs: 0, md: 2, lg: 4 },
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
        {data.title}
      </Typography>
      <Typography
        variant="subtitle2"
        fontWeight={"400"}
        sx={{ color: isDarkMode ? color.emerald100 : color.emerald700 }}
      >
        {data.tip}
      </Typography>
      <PreparationMakeSentencesSection />
    </Box>
  );
}
