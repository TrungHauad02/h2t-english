import { Box, Typography, Paper, Button } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function EmptyState() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        borderRadius: '16px',
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        textAlign: 'center'
      }}
    >
      <QuestionAnswerIcon 
        sx={{ 
          fontSize: 48, 
          color: isDarkMode ? color.gray600 : color.gray400,
          mb: 2
        }} 
      />
      
      <Typography 
        variant="h6" 
        sx={{ 
          color: isDarkMode ? color.gray200 : color.gray700,
          mb: 1
        }}
      >
        No speaking questions available
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: isDarkMode ? color.gray400 : color.gray500,
          maxWidth: '400px',
          mb: 3
        }}
      >
        There are no speaking practice questions available for this section. Please try another section or contact your instructor.
      </Typography>
      
      <Button
        variant="outlined"
        sx={{
          borderRadius: '24px',
          borderColor: isDarkMode ? color.teal600 : color.teal500,
          color: isDarkMode ? color.teal400 : color.teal600,
          px: 3,
          py: 1,
          '&:hover': {
            borderColor: isDarkMode ? color.teal500 : color.teal600,
            backgroundColor: isDarkMode ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.05)'
          },
          textTransform: 'none',
          fontWeight: 500
        }}
      >
        Return to Tests
      </Button>
    </Box>
  );
}