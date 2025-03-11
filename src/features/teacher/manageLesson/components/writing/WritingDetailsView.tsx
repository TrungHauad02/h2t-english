import { Box, Grid, Paper, Stack } from "@mui/material";
import {
  WritingDescriptionSection,
  WritingImageCard,
  WritingStatusSection,
  WritingTitleSection,
  WritingTopicSection,
} from "./detailsView";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Writing } from "interfaces";
import WritingTipsSection from "./detailsView/WritingTipsSection";

export default function WritingDetailsView({ data }: { data: Writing }) {
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
          <WritingImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <WritingTitleSection data={data} />
            <WritingDescriptionSection data={data} />
            <WritingTopicSection data={data} />
            <WritingTipsSection data={data} />
            <WritingStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
