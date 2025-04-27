import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ReactNode } from "react";
import { TestTypeKey } from "./TestOverviewSection";
import { TestOverviewSection } from "./TestOverviewSection";

interface TestContainerProps {
  children: ReactNode;
  type: string;
  title: string;
  description: string;
  loading?: boolean;
}

export default function TestContainer({
  children,
  type,
  title,
  description,
  loading = false,
}: TestContainerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box sx={{ mb: 6 }}>
      {/* Header Section with Overview */}
      <TestOverviewSection type={type as TestTypeKey} />
      
      {/* Main Content Section */}
      <Paper
        elevation={0}
        sx={{
          margin: { xs: "1rem", md: "2rem 5%" },
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          borderRadius: "1rem",
          border: `1px solid ${isDarkMode ? color.gray700 : color.emerald100}`,
          overflow: "hidden",
          boxShadow: `0 8px 16px ${color.gray900}15`,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            backgroundColor: isDarkMode ? color.gray700 : color.emerald50,
            borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.emerald100}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? color.emerald300 : color.emerald700,
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            {description}
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 8,
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CircularProgress size={40} sx={{ color: color.emerald500 }} />
              <Typography variant="body1" color="text.secondary">
                Loading tests...
              </Typography>
            </Box>
          ) : (
            children
          )}
        </Box>
      </Paper>
    </Box>
  );
}