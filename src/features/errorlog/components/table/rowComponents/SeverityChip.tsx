import { Chip, alpha } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface SeverityChipProps {
  severity: string;
}

export default function SeverityChip({ severity }: SeverityChipProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getSeverityInfo = (severityValue: string) => {
    switch (severityValue) {
      case "HIGH":
        return {
          bg: isDarkMode ? alpha(color.red800, 0.6) : alpha(color.red100, 0.8),
          text: isDarkMode ? color.red50 : color.red900,
          borderColor: isDarkMode ? color.red700 : color.red400,
          label: "HIGH",
        };
      case "MEDIUM":
        return {
          bg: isDarkMode
            ? alpha(color.warning, 0.6)
            : alpha(color.warning, 0.8),
          text: isDarkMode ? color.warning : color.warning,
          borderColor: isDarkMode ? color.warning : color.warning,
          label: "MEDIUM",
        };
      case "LOW":
        return {
          bg: isDarkMode
            ? alpha(color.teal700, 0.6)
            : alpha(color.teal100, 0.8),
          text: isDarkMode ? color.teal50 : color.teal900,
          borderColor: isDarkMode ? color.teal600 : color.teal300,
          label: "LOW",
        };
      default:
        return {
          bg: isDarkMode
            ? alpha(color.gray700, 0.4)
            : alpha(color.gray200, 0.7),
          text: isDarkMode ? color.gray200 : color.gray800,
          borderColor: isDarkMode ? color.gray600 : color.gray300,
          label: "Unknown",
        };
    }
  };

  const severityInfo = getSeverityInfo(severity);

  return (
    <Chip
      label={severityInfo.label}
      size="small"
      sx={{
        backgroundColor: severityInfo.bg,
        color: severityInfo.text,
        fontWeight: 600,
        minWidth: "80px",
        height: "24px",
        border: `1px solid ${severityInfo.borderColor}`,
        boxShadow: isDarkMode ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
        transition: "all 0.2s",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        },
      }}
    />
  );
}
