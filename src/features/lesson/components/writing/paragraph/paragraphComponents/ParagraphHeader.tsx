import { Box, Typography, LinearProgress } from "@mui/material";
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
        justifyContent: "space-between",
        mb: 3,
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        color={textColor}
        sx={{
          fontWeight: 600,
          fontSize: { xs: "1.3rem", md: "1.5rem" },
        }}
      >
        Fill in the blanks
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          variant="body2"
          color={isDarkMode ? color.gray400 : color.gray600}
          fontWeight={500}
        >
          {completionPercentage}% complete
        </Typography>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            width: { xs: "100%", sm: "120px" },
            "& .MuiLinearProgress-bar": {
              backgroundColor: accentColor,
              borderRadius: 4,
            },
          }}
        />
      </Box>
    </Box>
  );
}
