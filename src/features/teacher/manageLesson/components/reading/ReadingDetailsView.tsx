import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Reading } from "interfaces";
import useColor from "theme/useColor";
import { ReadingDescriptionSection } from "./detailsView";
import LessonImageCard from "../common/LessonImageCard";
import { StatusSection, TitleSection } from "../common";

interface ReadingDetailsViewProps {
  data: Reading;
}

export default function ReadingDetailsView({ data }: ReadingDetailsViewProps) {
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
            <ReadingDescriptionSection data={data} />
            <StatusSection status={data.status} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
