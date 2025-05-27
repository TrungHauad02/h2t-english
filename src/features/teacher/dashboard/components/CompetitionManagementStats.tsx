import { Box, Paper, Typography, Grid, Chip, LinearProgress } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CompetitionManagementStatsProps {
  data: {
    totalCompetitions: number;
    activeCompetitions: number;
    completedCompetitions: number;
    totalSubmissions: number;
  };
  isLoading: boolean;
}

export default function CompetitionManagementStats({ data, isLoading }: CompetitionManagementStatsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const activePercentage = data.totalCompetitions > 0 ? (data.activeCompetitions / data.totalCompetitions) * 100 : 0;
  const completedPercentage = data.totalCompetitions > 0 ? (data.completedCompetitions / data.totalCompetitions) * 100 : 0;

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: "1rem",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          height: 320,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <EmojiEventsIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}>
            Competition Management
          </Typography>
        </Box>
        <LinearProgress sx={{ borderRadius: 1, height: 6 }} />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        height: 320,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDarkMode 
            ? `0 12px 40px rgba(20, 184, 166, 0.15)` 
            : `0 12px 40px rgba(20, 184, 166, 0.12)`,
          border: `1px solid ${isDarkMode ? color.teal500 : color.teal300}`,
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
          <EmojiEventsIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
          >
            Competition Management
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ color: isDarkMode ? color.teal300 : color.teal600, mb: 0.5 }}
            >
              {data.totalCompetitions}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
            >
              Total Competitions
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ color: isDarkMode ? color.emerald300 : color.emerald600, mb: 0.5 }}
            >
              {data.totalSubmissions}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
            >
              Total Submissions
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PlayCircleIcon 
              sx={{ 
                color: isDarkMode ? color.green400 : color.green600, 
                mr: 1, 
                fontSize: 18 
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
            >
              Active
            </Typography>
          </Box>
          <Chip
            label={`${data.activeCompetitions} (${activePercentage.toFixed(1)}%)`}
            size="small"
            sx={{
              backgroundColor: isDarkMode ? color.green800 : color.green100,
              color: isDarkMode ? color.green300 : color.green800,
              fontWeight: 600,
            }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={activePercentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            "& .MuiLinearProgress-bar": {
              backgroundColor: isDarkMode ? color.green500 : color.green600,
              borderRadius: 4,
            },
          }}
        />
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircleIcon 
              sx={{ 
                color: isDarkMode ? color.gray400 : color.gray600, 
                mr: 1, 
                fontSize: 18 
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
            >
              Completed
            </Typography>
          </Box>
          <Chip
            label={`${data.completedCompetitions} (${completedPercentage.toFixed(1)}%)`}
            size="small"
            sx={{
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
              color: isDarkMode ? color.gray300 : color.gray700,
              fontWeight: 600,
            }}
          />
        </Box>
        <LinearProgress
          variant="determinate"
          value={completedPercentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            "& .MuiLinearProgress-bar": {
              backgroundColor: isDarkMode ? color.gray500 : color.gray600,
              borderRadius: 4,
            },
          }}
        />
      </Box>
    </Paper>
  );
}