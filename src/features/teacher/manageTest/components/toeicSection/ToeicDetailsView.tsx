import { Box, Grid, Paper, Stack } from "@mui/material";
import { Toeic } from "interfaces";
import {
  ToeicStatusSection,
  ToeicTitleSection,
  ToeicInformation,
  ToeicDurationSection,
} from "./detailsView";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function RouteDetailsView({ data }: { data: Toeic }) {
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
          <ToeicInformation data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <ToeicTitleSection data={data} />
            <ToeicDurationSection data={data} />
            
            <ToeicStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
