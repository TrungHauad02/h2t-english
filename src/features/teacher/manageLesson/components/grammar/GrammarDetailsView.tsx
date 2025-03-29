import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Grammar } from "interfaces";
import useColor from "theme/useColor";
import LessonImageCard from "../common/LessonImageCard";
import TitleSection from "../common/TitleSection";
import { ContentSection, StatusSection } from "../common";

interface GrammarDetailsViewProps {
  data: Grammar;
}

export default function GrammarDetailsView({ data }: GrammarDetailsViewProps) {
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
          <LessonImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <TitleSection title={data.title} />
            <ContentSection title="Description" content={data.description} />
            <ContentSection title="Definition" content={data.definition} />
            <ContentSection title="Example" content={data.example} />
            <StatusSection status={data.status} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
