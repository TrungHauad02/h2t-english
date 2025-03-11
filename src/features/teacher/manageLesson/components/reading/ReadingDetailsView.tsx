import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Reading } from "interfaces";
import useColor from "theme/useColor";
import {
  ReadingDescriptionSection,
  ReadingImageCard,
  ReadingStatusSection,
  ReadingTitleSection,
} from "./detailsView";

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
          <ReadingImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <ReadingTitleSection data={data} />
            <ReadingDescriptionSection data={data} />
            <ReadingStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
