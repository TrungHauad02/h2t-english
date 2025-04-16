import React from "react";
import {
  Box,
  Typography,
  Card,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  Divider,
  Avatar,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { formatDate } from "utils/format";

interface CompetitionCardProps {
  competition: CompetitionTest;
}

export default function CompetitionCard({
  competition,
}: CompetitionCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getStatusColor = () => {
    if (competition.status) {
      return isDarkMode ? color.successDarkMode : color.success;
    }
    return isDarkMode ? color.errorDarkMode : color.error;
  };

  const getBackgroundColors = () => {
    if (new Date(competition.endTime) < new Date()) {
      // Past
      return {
        gradient: isDarkMode
          ? `linear-gradient(135deg, ${alpha(color.gray800, 0.9)}, ${alpha(
              color.gray900,
              0.9
            )})`
          : `linear-gradient(135deg, ${alpha(color.gray100, 0.9)}, ${alpha(
              color.gray200,
              0.9
            )})`,
        accent: isDarkMode ? color.gray500 : color.gray400,
      };
    } else if (new Date(competition.startTime) > new Date()) {
      // Upcoming
      return {
        gradient: isDarkMode
          ? `linear-gradient(135deg, ${alpha(color.teal900, 0.9)}, ${alpha(
              color.emerald900,
              0.9
            )})`
          : `linear-gradient(135deg, ${alpha(color.teal50, 0.9)}, ${alpha(
              color.emerald50,
              0.9
            )})`,
        accent: isDarkMode ? color.teal400 : color.teal500,
      };
    } else {
      // Active
      return {
        gradient: isDarkMode
          ? `linear-gradient(135deg, ${alpha(color.emerald900, 0.9)}, ${alpha(
              color.teal900,
              0.9
            )})`
          : `linear-gradient(135deg, ${alpha(color.emerald50, 0.9)}, ${alpha(
              color.teal50,
              0.9
            )})`,
        accent: isDarkMode ? color.emerald400 : color.emerald500,
      };
    }
  };

  const { gradient, accent } = getBackgroundColors();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        boxShadow: isDarkMode
          ? "0 8px 16px rgba(0,0,0,0.3)"
          : "0 8px 16px rgba(0,0,0,0.06)",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: isDarkMode
            ? "0 12px 28px rgba(0,0,0,0.4)"
            : "0 12px 28px rgba(0,0,0,0.1)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: gradient,
          zIndex: 0,
        },
      }}
    >
      {/* Competition Avatar & Status */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "flex-start",
          p: 2,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Avatar
          sx={{
            width: 52,
            height: 52,
            backgroundColor: accent,
            boxShadow: isDarkMode
              ? "0 4px 8px rgba(0,0,0,0.4)"
              : "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <EmojiEventsIcon fontSize="large" />
        </Avatar>
        
        <Chip
          label={competition.status ? "Active" : "Inactive"}
          sx={{
            backgroundColor: alpha(getStatusColor(), isDarkMode ? 0.2 : 0.1),
            color: getStatusColor(),
            fontWeight: 600,
            fontSize: "0.75rem",
            height: "26px",
          }}
          size="small"
        />
      </Box>

      {/* Content */}
      <Box sx={{ p: 2, pt: 1, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            mb: 2,
            color: isDarkMode ? color.gray100 : color.gray900,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3.5rem",
          }}
        >
          {competition.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
          <Chip
            size="small"
            icon={<HelpOutlineIcon fontSize="small" />}
            label={`${competition.totalQuestions || 0} Q`}
            sx={{
              backgroundColor: isDarkMode ? alpha(color.teal800, 0.8) : alpha(color.teal100, 0.8),
              color: isDarkMode ? color.teal200 : color.teal800,
              fontWeight: "medium",
            }}
          />
          <Chip
            size="small"
            icon={<ScheduleIcon fontSize="small" />}
            label={`${competition.duration} min`}
            sx={{
              backgroundColor: isDarkMode ? alpha(color.emerald800, 0.8) : alpha(color.emerald100, 0.8),
              color: isDarkMode ? color.emerald200 : color.emerald800,
              fontWeight: "medium",
            }}
          />
        </Stack>

        <Divider sx={{ my: 1, backgroundColor: isDarkMode ? color.gray700 : color.gray200 }} />

        <Box sx={{ mt: 2, mb: 1 }}>
          <Stack spacing={2}>
            <Box 
              display="flex" 
              alignItems="center"
              sx={{
                py: 1,
                px: 1.5,
                borderRadius: "8px",
                backgroundColor: isDarkMode 
                  ? alpha(color.gray700, 0.7) 
                  : alpha(color.gray100, 0.7),
              }}
            >
              <CalendarTodayIcon 
                fontSize="small" 
                sx={{ 
                  mr: 1.5,
                  color: isDarkMode ? color.teal300 : color.teal600,
                }} 
              />
              <Typography 
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                <Box component="span" fontWeight="medium">Start:</Box> {formatDate(competition.startTime)}
              </Typography>
            </Box>
            
            <Box 
              display="flex" 
              alignItems="center"
              sx={{
                py: 1,
                px: 1.5,
                borderRadius: "8px",
                backgroundColor: isDarkMode 
                  ? alpha(color.gray700, 0.7) 
                  : alpha(color.gray100, 0.7),
              }}
            >
              <CalendarTodayIcon 
                fontSize="small" 
                sx={{ 
                  mr: 1.5,
                  color: isDarkMode ? color.emerald300 : color.emerald600,
                }} 
              />
              <Typography 
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                <Box component="span" fontWeight="medium">End:</Box> {formatDate(competition.endTime)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Actions */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-around", 
          p: 1.5,
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          backgroundColor: isDarkMode ? alpha(color.gray900, 0.3) : alpha(color.gray50, 0.5),
        }}
      >
        <Tooltip title="View Details">
          <IconButton
            size="small"
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.info, 0.1)
                : alpha(color.info, 0.05),
              color: isDarkMode ? color.infoDarkMode : color.info,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.info, 0.2)
                  : alpha(color.info, 0.1),
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Edit Competition">
          <IconButton
            size="small"
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.edit, 0.1)
                : alpha(color.edit, 0.05),
              color: color.edit,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.edit, 0.2)
                  : alpha(color.edit, 0.1),
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Delete Competition">
          <IconButton
            size="small"
            sx={{
              backgroundColor: isDarkMode
                ? alpha(color.error, 0.1)
                : alpha(color.error, 0.05),
              color: isDarkMode ? color.errorDarkMode : color.error,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? alpha(color.error, 0.2)
                  : alpha(color.error, 0.1),
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}