import { Box, Grid, Paper, Stack } from "@mui/material";
import { Route } from "interfaces";
import {
  RouteDescriptionSection,
  RouteImageCard,
  RouteStatusSection,
  RouteTitleSection,
} from "./routeDetailsView";

export default function RouteDetailsView({ data }: { data: Route }) {
  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: "white",
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
