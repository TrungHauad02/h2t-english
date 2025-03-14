import { Box, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import { PreparationType } from "interfaces";
import useColor from "theme/useColor";
import { formatDate } from "utils/format";
import { useDarkMode } from "hooks/useDarkMode";

interface PreparationInfoSectionProps {
  type: PreparationType;
  questionCount: number;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export default function PreparationInfoSection({
  type,
  questionCount,
  createdAt,
  updatedAt,
}: PreparationInfoSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const backgroundColor = isDarkMode ? color.gray700 : color.white;
  const chipBgColor = isDarkMode ? color.gray800 : color.teal50;

  const getFormattedType = (type: PreparationType) => {
    switch (type) {
      case PreparationType.MATCH_WORD_WITH_SENTENCES:
        return "Match Word with Sentences";
      case PreparationType.CLASSIFY:
        return "Classify";
      case PreparationType.WORDS_MAKE_SENTENCES:
        return "Words Make Sentences";
      default:
        return type;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        p: 3,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0,0,0,0.3)"
          : "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Type */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1.5,
          bgcolor: chipBgColor,
          borderRadius: 2,
        }}
      >
        <CategoryIcon sx={{ mr: 1.5, color: accentColor }} />
        <Typography
          variant="body2"
          sx={{ fontWeight: "medium", color: secondaryTextColor }}
        >
          Type: <strong>{getFormattedType(type)}</strong>
        </Typography>
      </Box>

      {/* Questions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1.5,
          bgcolor: chipBgColor,
          borderRadius: 2,
          mt: 2,
        }}
      >
        <HelpOutlineIcon sx={{ mr: 1.5, color: accentColor }} />
        <Typography
          variant="body2"
          sx={{ fontWeight: "medium", color: secondaryTextColor }}
        >
          <strong>{questionCount}</strong> Questions
        </Typography>
      </Box>

      {/* Created At */}
      {createdAt && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: chipBgColor,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <CalendarTodayIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: secondaryTextColor }}
          >
            Created: {formatDate(createdAt)}
          </Typography>
        </Box>
      )}

      {/* Updated At */}
      {updatedAt && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: chipBgColor,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <UpdateIcon sx={{ mr: 1.5, color: accentColor }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "medium", color: secondaryTextColor }}
          >
            Updated: {formatDate(updatedAt)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
