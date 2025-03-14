import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Preparation, PreparationType } from "interfaces";
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
    type: PreparationType.CLASSIFY,
  };

  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;
  const titleColor = isDarkMode ? color.teal300 : color.teal500;
  const tipColor = isDarkMode ? color.gray100 : color.gray700;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;

  return (
    <Box
      sx={{
        mx: { xs: 0, md: 2, lg: 4 },
        px: { xs: 2, md: 4 },
        py: { xs: 1, md: 2 },
        bgcolor: backgroundColor,
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="subtitle1"
        fontSize={"1.1rem"}
        fontWeight={"bold"}
        sx={{ color: titleColor, mb: 1 }}
      >
        {data.title}
      </Typography>

      <Typography
        variant="subtitle2"
        fontWeight={"400"}
        sx={{ color: tipColor, mb: 2, fontStyle: "italic" }}
      >
        {data.tip}
      </Typography>

      <PreparationMakeSentencesSection />
    </Box>
  );
}
