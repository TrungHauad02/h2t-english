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
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 3 }}>
      <Button
        variant="contained"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        sx={{
          backgroundColor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : "#2E7D32",
          color: "white",
          fontWeight: "bold",
          width: "140px",
          py: 1,
          "&:hover": {
            backgroundColor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : "#1B5E20",
          },
        }}
      >
        &lt; Previous
      </Button>

      <Box
        sx={{
          px: 3,
          py: 1,
          bgcolor: isDarkMode ? "#4E342E" : "#D7CCC8",
          color: isDarkMode ? "#FFF" : "#3E2723",
          borderRadius: 1,
          fontWeight: "bold",
          textAlign: "center",
          width: "80px",
          border: `1px solid ${isDarkMode ? "#5D4037" : "#A1887F"}`,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
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
          width: "140px",
          py: 1,
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
