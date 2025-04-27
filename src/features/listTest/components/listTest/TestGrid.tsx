import { Grid, Typography, CircularProgress, Paper } from "@mui/material";
import {TestItem} from "./TestItem";
import { Test } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface TestGridProps {
  tests: Test[];
  loading?: boolean;
}

export default function TestGrid({ tests, loading = false }: TestGridProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          borderRadius: "1rem",
          border: `1px solid ${isDarkMode ? color.gray700 : color.emerald100}`,
        }}
      >
        <CircularProgress size={40} sx={{ color: color.emerald500, mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading tests...
        </Typography>
      </Paper>
    );
  }

  if (tests.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          px: 2,
          textAlign: "center",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          borderRadius: "1rem",
          border: `1px dashed ${isDarkMode ? color.gray600 : color.gray200}`,
        }}
      >
        <AutoAwesomeIcon
          sx={{
            fontSize: 40,
            color: isDarkMode ? color.emerald400 : color.emerald500,
            mb: 2,
            opacity: 0.7,
          }}
        />
        <Typography
          variant="h6"
          sx={{ 
            color: isDarkMode ? color.emerald300 : color.emerald600,
            mb: 1,
            fontWeight: "medium" 
          }}
        >
          No tests found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search criteria or check back later for new tests.
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={3}>
      {tests.map((test) => (
        <TestItem test={test} key={test.id} />
      ))}
    </Grid>
  );
}