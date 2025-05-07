import { Box, Typography, Button } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface EmptyStateProps {
  hasFilters: boolean;
  handleResetFilters: () => void;
}

export default function EmptyState({
  hasFilters,
  handleResetFilters,
}: EmptyStateProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        p: 4,
        textAlign: "center",
        bgcolor: isDarkMode ? color.gray800 : color.gray50,
        borderRadius: "1rem",
        border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
      }}
    >
      <Typography>No students found with the selected filters.</Typography>
      {hasFilters && (
        <Button
          onClick={handleResetFilters}
          sx={{
            mt: 2,
            color: isDarkMode ? color.teal300 : color.teal600,
            "&:hover": {
              bgcolor: isDarkMode
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(20, 184, 166, 0.1)",
            },
          }}
        >
          Clear filters
        </Button>
      )}
    </Box>
  );
}
