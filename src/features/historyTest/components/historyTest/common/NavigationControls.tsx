import { Box, Stack, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";

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
        sx={{
          backgroundColor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : "#2E7D32",
          color: "white",
          fontWeight: "bold",
          minWidth: { xs: "90px", sm: "120px", md: "140px" }, 
          fontSize: { xs: "0.7rem", sm: "0.9rem" }, 
          py: { xs: 0.6, sm: 1 },
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : "#1B5E20",
          },
        }}
      >
        &lt; Previous
      </Button>

      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 0.6, sm: 1 },
          fontSize: { xs: "0.8rem", sm: "1rem" },
          bgcolor: isDarkMode ? "#424242" : "#EFEFEF",
          color: isDarkMode ? "#FFF" : "#333",
          borderRadius: "6px",
          fontWeight: "bold",
          textAlign: "center",
          minWidth: "65px", 
          border: `1px solid ${isDarkMode ? "#5D4037" : "#A1887F"}`,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {`${currentIndex + 1}/${totalItems}`}
      </Box>

      <Button
        variant="contained"
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        sx={{
          backgroundColor: currentIndex === totalItems - 1 ? (isDarkMode ? "#757575" : "#BDBDBD") : "#2E7D32",
          color: "white",
          fontWeight: "bold",
          minWidth: { xs: "90px", sm: "120px", md: "140px" },
          fontSize: { xs: "0.7rem", sm: "0.9rem" }, 
          py: { xs: 0.6, sm: 1 },
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: currentIndex === totalItems - 1 ? (isDarkMode ? "#757575" : "#BDBDBD") : "#1B5E20",
          },
        }}
      >
        Next &gt;
      </Button>
    </Stack>
  );
}
