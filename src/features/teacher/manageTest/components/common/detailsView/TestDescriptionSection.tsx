import { Box, Typography, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import { Test } from "interfaces";

interface TestDescriptionSectionProps {
  data: Test;
}

export default function TestDescriptionSection({
  data,
}: TestDescriptionSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const labelColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray700 : color.white,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          pb: 1.5,
          borderBottom: `1px solid ${color.gray200}`,
        }}
      >
        <DescriptionIcon sx={{ mr: 1.5, color: accentColor, fontSize: 28 }} />
        <Typography variant="h6" fontWeight="medium">
          Description
        </Typography>
      </Box>

      {/* Description text */}
      <Typography
        variant="body1"
        paragraph
        sx={{
          lineHeight: 1.7,
          color: textColor,
          px: 1,
        }}
      >
        {data.description}
      </Typography>

      {/* Info fields */}
      <Stack direction="row" spacing={4} sx={{ px: 1, mt: 2 }}>
        {/* Duration */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ mr: 1, color: accentColor }} />
          <Typography variant="body2" sx={{ color: labelColor }}>
            <strong>Duration:</strong>{" "}
            <span style={{ color: textColor }}>{data.duration} minutes</span>
          </Typography>
        </Box>

        {/* Type */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CategoryIcon sx={{ mr: 1, color: accentColor }} />
          <Typography variant="body2" sx={{ color: labelColor }}>
            <strong>Type:</strong>{" "}
            <span style={{ color: textColor }}>{data.type}</span>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
