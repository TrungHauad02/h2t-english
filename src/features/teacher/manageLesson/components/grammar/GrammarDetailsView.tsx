import { Box, Grid, Paper, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Grammar } from "interfaces";
import useColor from "theme/useColor";
import {
  GrammarDefinitionSection,
  GrammarDescriptionSection,
  GrammarImageCard,
  GrammarStatusSection,
  GrammarTitleSection,
} from "./detailsView";

interface GrammarDetailsViewProps {
  data: Grammar;
}

export default function GrammarDetailsView({ data }: GrammarDetailsViewProps) {
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
          <GrammarImageCard data={data} />
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <GrammarTitleSection data={data} />
            <GrammarDescriptionSection data={data} />
            <GrammarDefinitionSection data={data} />
            <GrammarStatusSection data={data} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
