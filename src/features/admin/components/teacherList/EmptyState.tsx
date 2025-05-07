import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { FilterAltOff, School } from "@mui/icons-material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface EmptyStateProps {
  hasFilters: boolean;
  handleResetFilters: () => void;
  onAddTeacher?: () => void;
}

export default function EmptyState({
  hasFilters,
  handleResetFilters,
  onAddTeacher,
}: EmptyStateProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 5,
        borderRadius: "1rem",
        bgcolor: isDarkMode ? color.gray800 : color.gray50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        border: `1px dashed ${isDarkMode ? color.teal700 : color.teal300}`,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          bgcolor: isDarkMode
            ? "rgba(20, 184, 166, 0.1)"
            : "rgba(20, 184, 166, 0.05)",
          border: `2px solid ${isDarkMode ? color.teal700 : color.teal300}`,
        }}
      >
        <School
          sx={{
            fontSize: 40,
            color: isDarkMode ? color.teal400 : color.teal600,
          }}
        />
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: isDarkMode ? color.teal100 : color.teal800,
          mb: 1,
        }}
      >
        {hasFilters ? "No matching teachers found" : "No teachers found"}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray600,
          maxWidth: "500px",
          mb: 3,
        }}
      >
        {hasFilters
          ? "We couldn't find any teachers matching your current filters. Try adjusting your search criteria or reset all filters."
          : "There are no teachers in the system yet. You can add new teachers to get started."}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {hasFilters && (
          <Button
            variant="outlined"
            startIcon={<FilterAltOff />}
            onClick={handleResetFilters}
            sx={{
              borderRadius: "8px",
              borderColor: isDarkMode ? color.teal500 : color.teal400,
              color: isDarkMode ? color.teal300 : color.teal600,
              "&:hover": {
                borderColor: isDarkMode ? color.teal400 : color.teal500,
                bgcolor: isDarkMode
                  ? "rgba(20, 184, 166, 0.1)"
                  : "rgba(20, 184, 166, 0.05)",
              },
              transition: "all 0.2s ease",
              minWidth: { xs: "100%", sm: "auto" },
              py: 1,
            }}
          >
            Reset All Filters
          </Button>
        )}

        {onAddTeacher && (
          <Button
            variant="contained"
            onClick={onAddTeacher}
            sx={{
              borderRadius: "8px",
              bgcolor: isDarkMode ? color.teal700 : color.teal600,

              boxShadow: isDarkMode
                ? "0 4px 12px rgba(20, 184, 166, 0.3)"
                : "0 4px 12px rgba(20, 184, 166, 0.2)",
              "&:hover": {
                boxShadow: isDarkMode
                  ? "0 6px 16px rgba(20, 184, 166, 0.4)"
                  : "0 6px 16px rgba(20, 184, 166, 0.3)",
                bgcolor: isDarkMode ? color.teal600 : color.teal500,
              },
              transition: "all 0.2s ease",
              minWidth: { xs: "100%", sm: "auto" },
              py: 1,
            }}
          >
            Add New Teacher
          </Button>
        )}
      </Box>
    </Paper>
  );
}
