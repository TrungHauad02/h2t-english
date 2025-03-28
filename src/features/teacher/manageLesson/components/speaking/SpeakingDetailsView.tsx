import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Speaking } from "interfaces";
import {
  SpeakingStatusSection,
  SpeakingTitleSection,
  SpeakingDescriptionSection,
  SpeakingTopicSection,
} from "./detailsView";
import LessonImageCard from "../LessonImageCard";

interface SpeakingDetailsViewProps {
  data: Speaking;
}

export default function SpeakingDetailsView({
  data,
}: SpeakingDetailsViewProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          <LessonImageCard data={data} hideQuestions={true} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <SpeakingTitleSection data={data} />
            <SpeakingDescriptionSection data={data} />
            <SpeakingTopicSection data={data} />
            <SpeakingStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
