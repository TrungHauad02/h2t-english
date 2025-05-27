import { Box, Paper, Typography, Grid, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import QuizIcon from '@mui/icons-material/Quiz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface ToeicManagementStatsProps {
  data: {
    totalTests: number;
    activeTests: number;
    totalAttempts: number;
    averageScore: number;
  };
  isLoading: boolean;
}

export default function ToeicManagementStats({ data, isLoading }: ToeicManagementStatsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          height: 240,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <QuizIcon sx={{ color: isDarkMode ? color.emerald400 : color.emerald600, mr: 1 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}>
            TOEIC Management
          </Typography>
        </Box>
      </Paper>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 800) return { bg: color.emerald800, text: color.emerald300 };
    if (score >= 600) return { bg: color.yellow, text: color.gray800 };
    return { bg: color.red800, text: color.red300 };
  };

  const scoreColorScheme = getScoreColor(data.averageScore);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDarkMode 
            ? `0 12px 40px rgba(16, 185, 129, 0.15)` 
            : `0 12px 40px rgba(16, 185, 129, 0.12)`,
          border: `1px solid ${isDarkMode ? color.emerald500 : color.emerald300}`,
        }
      }}
    >
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        mb: 2,
        pb: 2,
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <QuizIcon sx={{ color: isDarkMode ? color.emerald400 : color.emerald600, mr: 1 }} />
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
          >
            TOEIC Management
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 1, 
            backgroundColor: isDarkMode ? `${color.teal800}40` : `${color.teal100}60`,
            border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
            textAlign: 'center'
          }}>
            <AssignmentIcon sx={{ 
              color: isDarkMode ? color.teal400 : color.teal600, 
              fontSize: 28, 
              mb: 1 
            }} />
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              sx={{ color: isDarkMode ? color.teal300 : color.teal700, mb: 0.5 }}
            >
              {data.totalTests}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
            >
              Total Tests
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                label={`${data.activeTests} Active`}
                size="small"
                sx={{
                  backgroundColor: isDarkMode ? color.green800 : color.green100,
                  color: isDarkMode ? color.green300 : color.green800,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                }}
              />
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 1, 
            backgroundColor: isDarkMode ? `${color.emerald800}40` : `${color.emerald100}60`,
            border: `1px solid ${isDarkMode ? color.emerald700 : color.emerald200}`,
            textAlign: 'center'
          }}>
            <TrendingUpIcon sx={{ 
              color: isDarkMode ? color.emerald400 : color.emerald600, 
              fontSize: 28, 
              mb: 1 
            }} />
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              sx={{ color: isDarkMode ? color.emerald300 : color.emerald700, mb: 0.5 }}
            >
              {data.totalAttempts}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
            >
              Total Attempts
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                label={`${data.averageScore.toFixed(0)} Avg Score`}
                size="small"
                sx={{
                  backgroundColor: isDarkMode ? scoreColorScheme.bg : `${scoreColorScheme.bg}20`,
                  color: isDarkMode ? scoreColorScheme.text : scoreColorScheme.bg,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}