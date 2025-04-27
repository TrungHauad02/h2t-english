import { Box, Typography, LinearProgress, Zoom } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ParagraphHeaderProps {
  completionPercentage: number;
}

export default function ParagraphHeader({
  completionPercentage,
}: ParagraphHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        mb: 3,
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        color={textColor}
        sx={{
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Zoom in timeout={500}>
          <Box
            component="span"
            sx={{
              color: isDarkMode ? color.teal200 : color.teal800,
              bgcolor: isDarkMode ? color.teal900 : color.teal100,
              px: 2,
              py: 0.7,
              borderRadius: "0.8rem",
              fontSize: "0.9rem",
              fontWeight: 700,
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(94,234,212,0.2)"
                : "0 2px 8px rgba(15,118,110,0.15)",
              border: `1px solid ${isDarkMode ? color.teal800 : color.teal200}`,
            }}
          >
            Writing Exercise
          </Box>
        </Zoom>
        <Box sx={{ mt: { xs: 1, sm: 0 } }}>Fill in the blanks</Box>
      </Typography>

      <Box
        sx={{
          ml: "auto",
          alignSelf: { xs: "stretch", sm: "center" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography
            variant="body2"
            color={isDarkMode ? color.gray300 : color.gray600}
            fontWeight={500}
          >
            Progress
          </Typography>
          <Typography variant="body2" fontWeight="bold" color={accentColor}>
            {completionPercentage}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{
            mt: 0.5,
            height: 6,
            borderRadius: 3,
            backgroundColor: isDarkMode ? color.gray600 : color.gray200,
            width: { xs: "100%", sm: "160px" },
            "& .MuiLinearProgress-bar": {
              backgroundColor: isDarkMode ? color.teal400 : color.teal500,
              borderRadius: 3,
            },
          }}
        />
      </Box>
    </Box>
  );
}
