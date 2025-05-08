import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function LoadingState() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box 
      component={Paper}
      elevation={3}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '40vh',
        p: 4,
        borderRadius: '16px',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
      }}
    >
      <CircularProgress 
        thickness={4}
        size={56}
        sx={{ 
          color: isDarkMode ? color.teal400 : color.teal600,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round'
          },
          mb: 2
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: isDarkMode ? color.gray200 : color.gray700,
          fontWeight: 500,
          mt: 2
        }}
      >
        Loading speaking practice...
      </Typography>
    </Box>
  );
}