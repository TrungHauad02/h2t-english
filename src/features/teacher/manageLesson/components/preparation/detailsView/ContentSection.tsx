import { Box, Typography, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ContentSectionProps {
  title: string;
  tip: string;
  status: boolean;
}

export default function ContentSection({
  title,
  tip,
  status,
}: ContentSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Box>
      {/* Title */}
      <Box
        sx={{
          bgcolor: cardBgColor,
          p: 3,
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          sx={{ color: isDarkMode ? color.teal200 : color.teal700 }}
        >
          {title}
        </Typography>
      </Box>

      {/* Tip */}
      <Box
        sx={{
          bgcolor: cardBgColor,
          p: 3,
          borderRadius: 3,
          mt: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            pb: 1.5,
            borderBottom: `1px solid ${color.gray200}`,
          }}
        >
          <LightbulbIcon sx={{ mr: 1.5, color: accentColor, fontSize: 28 }} />
          <Typography variant="h6" fontWeight="medium">
            Tip
          </Typography>
        </Box>
        <Typography
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.7, color: textColor }}
        >
          {tip}
        </Typography>
      </Box>

      {/* Status */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: cardBgColor,
          p: 3,
          borderRadius: 3,
          mt: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontWeight: "medium",
          }}
        >
          <VerifiedIcon sx={{ color: accentColor }} /> Status
        </Typography>
        <Chip
          icon={status ? <VerifiedIcon /> : <WarningAmberIcon />}
          label={status ? "Active" : "Inactive"}
          color={status ? "success" : "error"}
          sx={{
            bgcolor: status ? color.emerald600 : color.gray500,
            color: color.white,
            px: 1,
            "& .MuiChip-label": {
              fontWeight: "bold",
            },
            "& .MuiChip-icon": {
              color: color.white,
            },
            borderRadius: 2,
          }}
        />
      </Box>
    </Box>
  );
}
