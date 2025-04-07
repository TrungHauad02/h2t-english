import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Test } from "interfaces";
import useColor from "theme/useColor";
import {
  TestDescriptionSection,
  TestStatusSection,
  TestTitleSection,
  InformationTest,
} from "./detailsView";

interface TestDetailsViewProps {
  data: Test;
}

export default function TestDetailsView({ data }: TestDetailsViewProps) {
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
          <InformationTest data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <TestTitleSection data={data} />
            <TestDescriptionSection data={data} />
            <TestStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
