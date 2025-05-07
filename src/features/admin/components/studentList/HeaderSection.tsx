import { Box, Typography, Button } from "@mui/material";
import { School, FilterList } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface HeaderSectionProps {
  showFilters: boolean;
  toggleFilters: () => void;
}

export default function HeaderSection({
  showFilters,
  toggleFilters,
}: HeaderSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: isDarkMode ? color.teal200 : color.teal700,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <School /> Student Management
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant={showFilters ? "contained" : "outlined"}
          startIcon={<FilterList />}
          onClick={toggleFilters}
          sx={{
            bgcolor: showFilters
              ? isDarkMode
                ? color.emerald700
                : color.emerald600
              : "transparent",
            borderColor: isDarkMode ? color.emerald600 : color.emerald500,
            color: showFilters
              ? color.white
              : isDarkMode
              ? color.emerald400
              : color.emerald600,
            "&:hover": {
              bgcolor: showFilters
                ? isDarkMode
                  ? color.emerald600
                  : color.emerald500
                : isDarkMode
                ? "rgba(5, 150, 105, 0.1)"
                : "rgba(16, 185, 129, 0.1)",
            },
          }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>
    </Box>
  );
}
