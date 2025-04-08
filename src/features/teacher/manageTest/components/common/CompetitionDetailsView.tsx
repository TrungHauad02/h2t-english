import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import CompetitionTitleSection from "./detailsView/CompetitionTitleSection";
import CompetitionScheduleSection from "./detailsView/CompetitionScheduleSection";
import CompetitionStatusSection from "./detailsView/CompetitionStatusSection";
import CompetitionInformation from "./detailsView/CompetitionInformation";

interface CompetitionDetailsViewProps {
  data: CompetitionTest;
}

export default function CompetitionDetailsView({ data }: CompetitionDetailsViewProps) {
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
          <CompetitionInformation data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <CompetitionTitleSection data={data} />
            <CompetitionScheduleSection data={data} />
            <CompetitionStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}