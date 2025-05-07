import { Chip, alpha } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface StatusChipProps {
  status: boolean;
}

export default function StatusChip({ status }: StatusChipProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getStatusInfo = (status: boolean) => {
    return {
      bg: status
        ? isDarkMode
          ? alpha(color.green700, 0.4)
          : alpha(color.green100, 0.7)
        : isDarkMode
        ? alpha(color.gray700, 0.4)
        : alpha(color.gray200, 0.7),
      text: status
        ? isDarkMode
          ? color.green100
          : color.green800
        : isDarkMode
        ? color.gray300
        : color.gray700,
      borderColor: status
        ? isDarkMode
          ? color.green600
          : color.green300
        : isDarkMode
        ? color.gray600
        : color.gray300,
      label: status ? "Active" : "Resolved",
    };
  };

  const statusInfo = getStatusInfo(status);

  return (
    <Chip
      label={statusInfo.label}
      size="small"
      sx={{
        backgroundColor: statusInfo.bg,
        color: statusInfo.text,
        fontWeight: 600,
        minWidth: "80px",
        height: "24px",
        border: `1px solid ${statusInfo.borderColor}`,
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
