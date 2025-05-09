import { Box, Container, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { CompetitionCard, CompetitionTitle } from "./competition";
import { useEffect, useState } from "react";
import { CompetitionTest } from "interfaces";
import { competitionTestService } from "services";
import { toast } from "react-toastify";

export default function CompetitionsSection() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [competitions, setCompetitions] = useState<CompetitionTest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData =
          await competitionTestService.getCompetitionTestsByTeacher(1, 3, {
            sortBy: "-createdAt",
            status: true,
          });
        setCompetitions(resData.data.content);
      } catch (error) {
        toast.error("Failed to fetch competition data");
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: isDarkMode ? colors.gray900 : colors.gray50,
      }}
    >
      <Container maxWidth="lg">
        <CompetitionTitle />
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
