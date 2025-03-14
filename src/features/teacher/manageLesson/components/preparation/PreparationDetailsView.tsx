import { Box, Grid } from "@mui/material";
import { Preparation } from "interfaces";
import { ContentSection, PreparationInfoSection } from "./detailsView";

interface PreparationDetailsViewProps {
  data: Preparation;
}

export default function PreparationDetailsView({
  data,
}: PreparationDetailsViewProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "1rem",
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PreparationInfoSection
            type={data.type}
            questionCount={data.questions.length}
            createdAt={data.createdAt}
            updatedAt={data.updatedAt}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <ContentSection
            title={data.title}
            tip={data.tip}
            status={data.status}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
