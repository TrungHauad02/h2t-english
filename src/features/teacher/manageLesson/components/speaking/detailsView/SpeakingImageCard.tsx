import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import { formatDate } from "utils/format";
import { Speaking } from "interfaces";

export default function SpeakingImageCard({ data }: { data: Speaking }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Card
      sx={{
        bgcolor: cardBgColor,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${borderColor}`,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            height: "220px",
            backgroundColor: isDarkMode ? color.gray800 : color.gray200,
            overflow: "hidden",
          }}
        >
          <img
            src={data.image}
            alt={data.title}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            m: 1.5,
          }}
        >
          <Chip
            size="small"
            label={data.status ? "Active" : "Inactive"}
            icon={
              data.status ? (
                <VerifiedIcon fontSize="small" />
              ) : (
                <WarningAmberIcon fontSize="small" />
              )
            }
            color={data.status ? "success" : "error"}
            sx={{
              bgcolor: data.status
                ? isDarkMode
                  ? `${color.emerald700}CC`
                  : `${color.emerald600}CC`
                : `${color.gray500}CC`,
              color: color.white,
              fontWeight: "bold",
              backdropFilter: "blur(4px)",
              "& .MuiChip-icon": {
                color: color.white,
              },
            }}
          />
        </Box>
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* Views */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: isDarkMode ? color.gray800 : color.teal50,
            borderRadius: 2,
          }}
        >
          <RemoveRedEyeIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            <strong>{data.views.toLocaleString()}</strong> Views
          </Typography>
        </Box>

        {/* Created At */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: isDarkMode ? color.gray800 : color.teal50,
            borderRadius: 2,
          }}
        >
          <CalendarTodayIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            Created: {formatDate(data.createdAt)}
          </Typography>
        </Box>

        {/* Updated At */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: isDarkMode ? color.gray800 : color.teal50,
            borderRadius: 2,
          }}
        >
          <UpdateIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            Updated: {formatDate(data.updatedAt)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
