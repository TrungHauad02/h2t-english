import {
  Box,
  Chip,
  Typography,
  Paper,
  Zoom,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ShieldIcon from "@mui/icons-material/Shield";

interface StatusSectionProps {
  status: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export default function StatusSection({
  status,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
}: StatusSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Màu sắc dựa trên status và isDarkMode
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const cardBgColor = isDarkMode ? color.gray800 : color.white;

  const statusColor = status
    ? isDarkMode
      ? color.emerald600
      : color.emerald500
    : isDarkMode
    ? color.red600
    : color.red500;

  const statusBgLight = status
    ? isDarkMode
      ? color.emerald900
      : "rgba(16, 185, 129, 0.12)"
    : isDarkMode
    ? color.red900
    : "rgba(239, 68, 68, 0.12)";

  return (
    <Zoom in={true} style={{ transitionDelay: "150ms" }}>
      <Box
        component={Paper}
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: cardBgColor,
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          boxShadow: isDarkMode
            ? "0 2px 5px rgba(0,0,0,0.15)"
            : "0 1px 3px rgba(0,0,0,0.05)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",

          "&:hover": {
            boxShadow: isDarkMode
              ? "0 6px 12px rgba(0,0,0,0.25)"
              : "0 4px 10px rgba(0,0,0,0.15)",
            transform: "translateY(-2px)",
          },

          // Border effect
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "4px",
            background: `linear-gradient(to bottom, ${statusColor} 0%, ${
              status ? color.teal400 : color.gray500
            } 100%)`,
            opacity: 0.8,
            transition: "all 0.3s ease",
          },

          "&:hover::before": {
            opacity: 1,
            width: "8px",
          },

          // Background glow effect matching status
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "30%",
            height: "100%",
            background: `radial-gradient(circle at right, ${statusBgLight}, transparent 70%)`,
            opacity: 0.5,
            zIndex: 0,
            transition: "opacity 0.3s ease",
          },

          "&:hover::after": {
            opacity: 0.7,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isDarkMode
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(20, 184, 166, 0.1)",
              borderRadius: "50%",
              p: 1,
              width: { xs: 36, sm: 42 },
              height: { xs: 36, sm: 42 },
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <ShieldIcon
              sx={{
                color: accentColor,
                fontSize: isMobile ? 20 : 24,
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "medium",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
            }}
          >
            Status
          </Typography>
        </Box>

        <Tooltip
          title={
            status
              ? "This item is currently active"
              : "This item is currently inactive"
          }
          arrow
          placement="top"
        >
          <Chip
            icon={status ? <CheckCircleIcon /> : <CancelIcon />}
            label={status ? activeLabel : inactiveLabel}
            sx={{
              bgcolor: status
                ? isDarkMode
                  ? color.emerald700
                  : color.emerald600
                : isDarkMode
                ? color.red700
                : color.red600,
              color: color.white,
              px: 1,
              height: { xs: 28, sm: 32 },
              borderRadius: "16px",
              fontWeight: "bold",
              transition: "all 0.2s ease",
              position: "relative",
              zIndex: 1,

              "& .MuiChip-label": {
                paddingLeft: 0.5,
                paddingRight: 1,
                fontWeight: "bold",
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                letterSpacing: "0.5px",
              },

              "& .MuiChip-icon": {
                color: color.white,
                marginLeft: 1,
              },

              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: status
                  ? isDarkMode
                    ? "0 0 8px rgba(16, 185, 129, 0.6)"
                    : "0 0 8px rgba(16, 185, 129, 0.4)"
                  : isDarkMode
                  ? "0 0 8px rgba(239, 68, 68, 0.6)"
                  : "0 0 8px rgba(239, 68, 68, 0.4)",
              },
            }}
          />
        </Tooltip>
      </Box>
    </Zoom>
  );
}
