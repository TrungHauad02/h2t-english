import { Box, Container, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { competitions } from "../services/mockData";
import CompetitionCard from "./competition/CompetitionCard";
import CompetitionTitle from "./competition/CompetitionTitle";

export default function CompetitionsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
      }}
    >
      <Container maxWidth="lg">
        <CompetitionTitle/>
        <Grid container spacing={4}>
          {competitions.map((competition) => (
            <Grid item key={competition.id} xs={12} sm={6} md={4}>
              <CompetitionCard competition={competition} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
