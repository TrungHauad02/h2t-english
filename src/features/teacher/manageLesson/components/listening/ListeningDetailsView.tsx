import { Box, Grid, Paper, Stack } from "@mui/material";
import { Listening } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  ListeningDescriptionSection,
  ListeningImageCard,
  ListeningStatusSection,
  ListeningTitleSection,
} from "./detailsView";

interface ListeningDetailsViewProps {
  data: Listening;
}

export default function ListeningDetailsView({
  data,
}: ListeningDetailsViewProps) {
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
          <ListeningImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <ListeningTitleSection data={data} />
            <ListeningDescriptionSection data={data} />
            <ListeningStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
