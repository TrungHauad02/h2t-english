import { Box, Grid, Paper, Stack } from "@mui/material";
import { Topic } from "interfaces";
import {
  TopicDescriptionSection,
  TopicImageCard,
  TopicStatusSection,
  TopicTitleSection,
} from "./topicDetailsView";

export default function TopicDetailsView({ data }: { data: Topic }) {
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
          <TopicImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <TopicTitleSection data={data} />
            <TopicDescriptionSection data={data} />
            <TopicStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
