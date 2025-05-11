import { Box, Typography, Paper, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AssessmentIcon from '@mui/icons-material/Assessment';
import TestScoreSection from "./TestScoreSection";
import TestCommentSection from "./TestCommentSection";

interface TestResultSummaryProps {
  score?: number;
  maxScore?: number;
  comment?: string;
}

export default function TestResultSummary({ score, maxScore = 10, comment }: TestResultSummaryProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Don't render if no data
  if (score === undefined && !comment) return null;

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        borderRadius: "1.25rem",
        overflow: "hidden",
        mb: 4,
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <Box sx={{ 
        backgroundColor: isDarkMode ? color.teal700 : color.teal500,
        p: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 2
      }}>
        <AssessmentIcon sx={{ 
          color: isDarkMode ? color.teal50 : color.white,
          fontSize: 36
        }} />
        <Typography 
          variant="h5" 
          sx={{ 
            color: isDarkMode ? color.teal50 : color.white,
            fontWeight: 600,
            letterSpacing: "0.5px"
          }}
        >
          Test Result Summary
        </Typography>
      </Box>
      
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={3}>
          {score !== undefined && (
            <Grid item xs={12} md={comment ? 6 : 12}>
              <TestScoreSection score={score} maxScore={maxScore} />
            </Grid>
          )}
          
          {comment && (
            <Grid item xs={12} md={score !== undefined ? 6 : 12}>
              <TestCommentSection comment={comment} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}