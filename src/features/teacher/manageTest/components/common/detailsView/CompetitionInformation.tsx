import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Changed from EventIcon
import UpdateIcon from "@mui/icons-material/Update"; // Changed from EventIcon for end time
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate } from "utils/format";
import { CompetitionTest } from "interfaces";

interface CompetitionInformationProps {
  data: CompetitionTest;
}

export default function CompetitionInformation({ data }: CompetitionInformationProps) {
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
        {/* Questions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: isDarkMode ? color.gray800 : color.teal50,
            borderRadius: 2,
          }}
        >
          <HelpOutlineIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            <strong>{data.totalQuestions || "Multiple"}</strong> Questions
          </Typography>
        </Box>

        {/* Start Time */}
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
            Start: {data.startTime ? formatDate(data.startTime) : "Not set"}
          </Typography>
        </Box>

        {/* End Time */}
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
            End: {data.endTime ? formatDate(data.endTime) : "Not set"}
          </Typography>
        </Box>

      </Stack>
    </Card>
  );
}