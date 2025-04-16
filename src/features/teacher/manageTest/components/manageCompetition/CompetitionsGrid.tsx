import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Zoom,
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import CompetitionCard from "./CompetitionCard";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface CompetitionsGridProps {
  displayedCompetitions: CompetitionTest[];
}

export default function CompetitionsGrid({
  displayedCompetitions,
}: CompetitionsGridProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (displayedCompetitions.length === 0) {
    return (
      <Zoom in={true} style={{ transitionDelay: "250ms" }}>
        <Paper
          elevation={isDarkMode ? 2 : 0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 250,
            my: 4,
            p: 4,
            borderRadius: "1rem",
            backgroundColor: isDarkMode
              ? color.gray700
              : color.gray50,
            border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
          }}
        >
          <SearchOffIcon
            sx={{
              fontSize: 48,
              color: isDarkMode ? color.gray400 : color.gray500,
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              fontWeight: 500,
            }}
          >
            No competitions found matching your criteria
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray500,
              mt: 1,
              maxWidth: 450,
            }}
          >
            Try adjusting your search terms or filters to find what you're looking for,
            or create a new competition using the button above.
          </Typography>
        </Paper>
      </Zoom>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {displayedCompetitions.map((competition, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={competition.id}>
          <Zoom
            in={true}
            style={{
              transitionDelay: `${150 + index * 50}ms`,
            }}
          >
            <Box>
              <CompetitionCard competition={competition} />
            </Box>
          </Zoom>
        </Grid>
      ))}
    </Grid>
  );
}