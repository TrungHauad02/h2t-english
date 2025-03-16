import { Box, Paper, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  isDarkMode: boolean;
  paperBgColor: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  isDarkMode,
  paperBgColor,
}: StatCardProps) {
  // Extract the score percentage if present in the value
  const isPercentage = value.includes("%");
  const numericValue = parseFloat(value.replace(/%$/, ""));
  const hasScore = !isNaN(numericValue);

  // Determine if this is a high score card
  const isHighScore = title.toLowerCase().includes("high");

  return (
    <Paper
      elevation={isDarkMode ? 1 : 3}
      sx={{
        p: 0,
        display: "flex",
        alignItems: "stretch",
        bgcolor: paperBgColor,
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${
          isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }`,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isDarkMode
            ? "0 8px 16px rgba(0,0,0,0.4)"
            : "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          width: "4px",
          bgcolor: color,
          borderRadius: "4px 0 0 4px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            mr: 2,
            p: 1.5,
            borderRadius: "12px",
            backgroundColor: isDarkMode
              ? `${color}20` // 12% opacity in hex
              : `${color}15`, // 8% opacity in hex
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color,
            boxShadow: `0 0 10px ${color}30`,
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? "grey.400" : "grey.600",
              fontWeight: 500,
              mb: 0.5,
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? "white" : "text.primary",
                lineHeight: 1.2,
              }}
            >
              {value}
            </Typography>

            {/* Show trend indicator for scores/percentages */}
            {hasScore && (isPercentage || isHighScore) && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  color:
                    numericValue >= 70
                      ? isDarkMode
                        ? "#4ade80"
                        : "#16a34a"
                      : isDarkMode
                      ? "#f87171"
                      : "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.875rem",
                }}
              >
                {numericValue >= 70 ? "↗" : "↘"}
              </Box>
            )}
          </Box>

          {/* Add description line for context */}
          {hasScore && (
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? "grey.500" : "grey.600",
                mt: 0.5,
                display: "block",
              }}
            >
              {isHighScore
                ? "Your best performance"
                : isPercentage
                ? numericValue >= 70
                  ? "Good progress!"
                  : "Needs improvement"
                : numericValue > 5
                ? "Active test history"
                : "Keep practicing!"}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
