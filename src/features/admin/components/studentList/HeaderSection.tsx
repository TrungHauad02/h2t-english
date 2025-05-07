import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";

interface HeaderSectionProps {
  showFilters: boolean;
  toggleFilters: () => void;
}

export default function HeaderSection({
  showFilters,
  toggleFilters,
}: HeaderSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: "1rem",
        bgcolor: isDarkMode ? color.teal900 : color.teal50,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        boxShadow: isDarkMode
          ? "0 6px 16px rgba(0,0,0,0.4)"
          : "0 6px 16px rgba(0,0,0,0.1)",
        border: `1px solid ${isDarkMode ? color.teal800 : color.teal100}`,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isDarkMode ? color.teal100 : color.teal800,
            mb: 0.5,
          }}
        >
          Students Management
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Button
          variant={showFilters ? "contained" : "outlined"}
          startIcon={showFilters ? <FilterAltOff /> : <FilterAlt />}
          onClick={toggleFilters}
          sx={{
            borderRadius: "8px",
            ...(showFilters
              ? {
                  bgcolor: isDarkMode ? color.emerald700 : color.emerald500,
                  color: color.white,
                  "&:hover": {
                    bgcolor: isDarkMode ? color.emerald600 : color.emerald400,
                  },
                }
              : {
                  borderColor: isDarkMode ? color.emerald500 : color.emerald400,
                  color: isDarkMode ? color.emerald300 : color.emerald600,
                  "&:hover": {
                    borderColor: isDarkMode
                      ? color.emerald400
                      : color.emerald500,
                    bgcolor: isDarkMode
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(16, 185, 129, 0.1)",
                  },
                }),
            transition: "all 0.2s ease",
            minWidth: isMobile ? "100%" : "auto",
          }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>
    </Paper>
  );
}
