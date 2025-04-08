import { Box, Typography, Stack, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CompetitionTest } from "interfaces";
import format from "date-fns/format";

interface CompetitionScheduleSectionProps {
  data: CompetitionTest;
}

export default function CompetitionScheduleSection({
  data,
}: CompetitionScheduleSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  const formatDateTime = (date: Date | string | undefined) => {
    if (!date) return "Not scheduled";
    return format(new Date(date), "MMM dd, yyyy HH:mm");
  };

  return (
    <Card
      sx={{
        bgcolor: cardBgColor,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        border: `1px solid ${borderColor}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 3,
          pb: 2,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <CalendarTodayIcon sx={{ mr: 1.5, color: accentColor }} />
        <Typography variant="h6" fontWeight="medium" color={isDarkMode ? color.white : color.gray900}>
          Competition Schedule
        </Typography>
      </Box>

      {/* Schedule details */}
      <Stack spacing={2} sx={{ p: 3 }}>
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
          <EventIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            Start Time: <strong>{formatDateTime(data.startTime)}</strong>
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
          <EventIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            End Time: <strong>{formatDateTime(data.endTime)}</strong>
          </Typography>
        </Box>

        {/* Duration */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: isDarkMode ? color.gray800 : color.teal50,
            borderRadius: 2,
          }}
        >
          <AccessTimeIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: "medium",
            }}
          >
            Duration: <strong>{data.duration} minutes</strong>
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}