import { Box, Chip, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Route } from "interfaces";

export default function RouteStatusSection({ data }: { data: Route }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: isDarkMode ? color.gray700 : color.white,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 8px rgba(0,0,0,0.2)"
          : "0 1px 3px rgba(0,0,0,0.1)",
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
        icon={data.status ? <VerifiedIcon /> : <WarningAmberIcon />}
        label={data.status ? "Active" : "Inactive"}
        color={data.status ? "success" : "error"}
        sx={{
          bgcolor: data.status
            ? isDarkMode
              ? color.emerald700
              : color.emerald600
            : `${color.gray500}`,
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
  );
}
