import { Box, Grid, Paper, Stack } from "@mui/material";
import { Topic } from "interfaces";
import { TopicDescriptionSection, TopicStatusSection } from "./detailsView";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import LessonImageCard from "../common/LessonImageCard";
import { TitleSection } from "../common";

export default function TopicDetailsView({ data }: { data: Topic }) {
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
      }}
    >
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          <LessonImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <TitleSection title={data.title} />
            <TopicDescriptionSection data={data} />
            <TopicStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
