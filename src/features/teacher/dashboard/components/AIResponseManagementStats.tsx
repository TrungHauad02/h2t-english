import { Box, Paper, Typography, Grid } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface AIResponseManagementStatsProps {
  data: {
    totalResponses: number;
    evaluatedResponses: number;
    pendingEvaluation: number;
  };
  isLoading: boolean;
}

export default function AIResponseManagementStats({ data, isLoading }: AIResponseManagementStatsProps) {
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <SmartToyIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}>
            AI Response Management
          </Typography>
        </Box>
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
        height: 240,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        mb: 2,
        pb: 2,
        borderBottom: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        width: '100%'
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SmartToyIcon sx={{ color: isDarkMode ? color.teal400 : color.teal600, mr: 1 }} />
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ color: isDarkMode ? color.gray200 : color.gray800 }}
          >
            AI Response Management
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ textAlign: 'center' }}>
        <Grid item xs={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.teal400 : color.teal600, mb: 0.5 }}
          >
            {data.totalResponses}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            Total Responses
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: isDarkMode ? color.emerald400 : color.emerald600, mb: 0.5 }}
          >
            {data.evaluatedResponses}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            Evaluated
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.yellow : color.warning,
              mt: 1,
              fontWeight: 500,
            }}
          >
            {data.pendingEvaluation} Need Evaluation
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}