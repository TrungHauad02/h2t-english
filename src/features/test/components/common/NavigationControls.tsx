import { Box, Stack, Button } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface NavigationControlsProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function NavigationControls({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
}: NavigationControlsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1.5}
      sx={{ mb: 2 }}
    >
      <Button
        variant="contained"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        startIcon={<ArrowBackIcon />}
        sx={{
          backgroundColor: currentIndex === 0 
            ? (isDarkMode ? color.gray700 : color.gray300) 
            : (isDarkMode ? color.teal700 : color.teal500),
          color: currentIndex === 0
            ? (isDarkMode ? color.gray500 : color.gray500)
            : 'white',
          fontWeight: "bold",
          minWidth: { xs: "90px", sm: "120px", md: "140px" },
          fontSize: { xs: "0.7rem", sm: "0.9rem" },
          py: { xs: 0.6, sm: 1 },
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: currentIndex === 0 
              ? (isDarkMode ? color.gray700 : color.gray300) 
              : (isDarkMode ? color.teal600 : color.teal400),
          },
        }}
      >
        Previous
      </Button>

      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 0.6, sm: 1 },
          fontSize: { xs: "0.8rem", sm: "1rem" },
          bgcolor: isDarkMode ? color.gray700 : color.gray200,
          color: isDarkMode ? color.gray200 : color.gray800,
          borderRadius: "6px",
          fontWeight: "bold",
          textAlign: "center",
          minWidth: "65px",
          border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
          boxShadow: isDarkMode 
            ? "0px 2px 4px rgba(0, 0, 0, 0.3)" 
            : "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {`${currentIndex + 1}/${totalItems}`}
      </Box>

      <Button
        variant="contained"
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        endIcon={<ArrowForwardIcon />}
        sx={{
          backgroundColor: currentIndex === totalItems - 1 
            ? (isDarkMode ? color.gray700 : color.gray300) 
            : (isDarkMode ? color.teal700 : color.teal500),
          color: currentIndex === totalItems - 1
            ? (isDarkMode ? color.gray500 : color.gray500)
            : 'white',
          fontWeight: "bold",
          minWidth: { xs: "90px", sm: "120px", md: "140px" },
          fontSize: { xs: "0.7rem", sm: "0.9rem" },
          py: { xs: 0.6, sm: 1 },
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: currentIndex === totalItems - 1 
              ? (isDarkMode ? color.gray700 : color.gray300) 
              : (isDarkMode ? color.teal600 : color.teal400),
          },
        }}
      >
        Next
      </Button>
    </Stack>
  );
}