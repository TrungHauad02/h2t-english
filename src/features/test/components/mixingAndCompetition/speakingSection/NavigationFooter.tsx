import { 
    Box, 
    Button,
    alpha,
  } from "@mui/material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  import useColor from "theme/useColor";
  
  interface NavigationFooterProps {
    handlePrevious: () => void;
    handleNext: () => void;
    currentIndex: number;
    totalQuestions: number;
    isDarkMode: boolean;
  }
  
  export default function NavigationFooter({ 
    handlePrevious, 
    handleNext,
    currentIndex,
    totalQuestions,
    isDarkMode
  }: NavigationFooterProps) {
    const color = useColor();
  
    return (
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          p: { xs: 2, sm: 3 },
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          backgroundColor: isDarkMode ? alpha(color.gray900, 0.4) : alpha(color.gray50, 0.7)
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            borderColor: isDarkMode ? color.gray600 : color.gray300,
            color: isDarkMode ? color.gray200 : color.gray700,
            borderRadius: '28px',
            px: { xs: 2, sm: 3 },
            py: 1,
            '&:hover': {
              borderColor: isDarkMode ? color.gray500 : color.gray400,
              backgroundColor: isDarkMode ? alpha(color.gray700, 0.5) : color.gray50
            },
            '&.Mui-disabled': {
              borderColor: isDarkMode ? color.gray800 : color.gray200,
              color: isDarkMode ? color.gray700 : color.gray400
            },
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Previous
        </Button>
        
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          disabled={currentIndex === totalQuestions - 1}
          sx={{
            backgroundColor: isDarkMode ? color.teal700 : color.teal500,
            color: 'white',
            borderRadius: '28px',
            px: { xs: 2, sm: 3 },
            py: 1,
            '&:hover': {
              backgroundColor: isDarkMode ? color.teal800 : color.teal600
            },
            '&.Mui-disabled': {
              backgroundColor: isDarkMode ? color.gray800 : color.gray300,
              color: isDarkMode ? color.gray600 : color.gray100
            },
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          Next
        </Button>
      </Box>
    );
  }