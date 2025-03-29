import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Speaking } from "interfaces";
import LessonImageCard from "../common/LessonImageCard";
import { ContentSection, StatusSection, TitleSection } from "../common";

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
            <TitleSection title={data.title} />
            <ContentSection title="Description" content={data.description} />
            <ContentSection title="Topic" content={data.topic} />
            <StatusSection status={data.status} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
