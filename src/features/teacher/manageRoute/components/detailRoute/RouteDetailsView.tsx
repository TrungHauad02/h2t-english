import { Box, Grid, Paper, Stack } from "@mui/material";
import { Route } from "interfaces";
import {
  RouteDescriptionSection,
  RouteImageCard,
  RouteStatusSection,
  RouteTitleSection,
} from "./detailsView";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function RouteDetailsView({ data }: { data: Route }) {
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
          <RouteImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <RouteTitleSection data={data} />
            <RouteDescriptionSection data={data} />
            <RouteStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
