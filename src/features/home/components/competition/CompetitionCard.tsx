import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  alpha,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { CompetitionTest } from "interfaces";
import useColor from "theme/useColor";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import useCompetitionCard from "./useCompetitionCard";
import { useNavigate } from "react-router-dom";

interface CompetitionCardProps {
  competition: CompetitionTest;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const hooks = useCompetitionCard(competition);

  const handleClick = () => {
    navigate(`/competition-test/${competition.id}`);
  };

  // Determine status color
  const statusColors = {
    active: {
      bg: isDarkMode ? color.green700 : color.green500,
      text: color.white,
    },
    upcoming: {
      bg: isDarkMode ? color.warningDarkMode : color.warning,
      text: isDarkMode ? color.gray900 : color.white,
    },
    completed: {
      bg: isDarkMode ? color.gray700 : color.gray500,
      text: color.white,
    },
  };

  const buttonColors = {
    active: {
      bg: color.teal600,
      hover: color.teal700,
      text: color.white,
    },
    upcoming: {
      bg: isDarkMode ? color.warningDarkMode : color.warning,
      hover: isDarkMode
        ? alpha(color.warningDarkMode, 0.8)
        : alpha(color.warning, 0.8),
      text: isDarkMode ? color.gray900 : color.white,
    },
    completed: {
      bg: isDarkMode ? color.gray600 : color.gray500,
      hover: isDarkMode ? color.gray700 : color.gray600,
      text: color.white,
    },
  };

  const currentStatus = hooks.isActive
    ? "active"
    : hooks.isUpcoming
    ? "upcoming"
    : "completed";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        color: isDarkMode ? color.gray100 : color.gray900,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        boxShadow: isDarkMode
          ? `0 10px 20px ${alpha(color.black, 0.3)}`
          : `0 10px 20px ${alpha(color.gray400, 0.2)}`,
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDarkMode
            ? `0 15px 30px ${alpha(color.black, 0.4)}`
            : `0 15px 30px ${alpha(color.gray400, 0.3)}`,
        },
      }}
    >
      {/* Status banner */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: -30,
          transform: "rotate(45deg)",
          width: 120,
          textAlign: "center",
          backgroundColor: statusColors[currentStatus].bg,
          color: statusColors[currentStatus].text,
          py: 0.5,
          zIndex: 2,
          boxShadow: `0 2px 4px ${alpha(color.black, 0.2)}`,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Typography variant="caption" fontWeight="bold">
          {hooks.isActive
            ? "ACTIVE"
            : hooks.isUpcoming
            ? "UPCOMING"
            : "COMPLETED"}
        </Typography>
      </Box>

      {/* Mobile status chip */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 2,
        }}
      >
        <Chip
          label={
            hooks.isActive
              ? "Active"
              : hooks.isUpcoming
              ? "Upcoming"
              : "Completed"
          }
          size="small"
          sx={{
            backgroundColor: statusColors[currentStatus].bg,
            color: statusColors[currentStatus].text,
            fontWeight: "bold",
          }}
        />
      </Box>

      {/* Header with accent color */}
      <Box
        sx={{
          height: 12,
          backgroundColor: hooks.isActive
            ? color.teal600
            : hooks.isUpcoming
            ? statusColors.upcoming.bg
            : statusColors.completed.bg,
        }}
      />

      <CardContent
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box sx={{ position: "relative", mb: 3, mt: 1 }}>
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            sx={{
              mb: 1.5,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              color: isDarkMode ? color.teal300 : color.teal700,
              lineHeight: 1.3,
              minHeight: { xs: "auto", sm: "3.5rem" },
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {competition.title}
          </Typography>
        </Box>

        <Divider
          sx={{
            my: 2,
            borderColor: isDarkMode
              ? alpha(color.gray700, 0.7)
              : alpha(color.gray200, 0.7),
          }}
        />

        <Box sx={{ mb: 3, flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              backgroundColor: isDarkMode
                ? alpha(color.gray700, 0.4)
                : alpha(color.gray100, 0.7),
              borderRadius: 1.5,
              p: 1,
              px: 1.5,
            }}
          >
            <EventIcon
              fontSize="small"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal600,
                mr: 1.5,
              }}
            />
            <Typography
              variant="body2"
              color={isDarkMode ? color.gray200 : color.gray800}
              sx={{ fontSize: "0.9rem" }}
            >
              <Box component="span" sx={{ fontWeight: "medium" }}>
                {hooks.formatDate(competition.startTime)}
              </Box>
              <Box
                component="span"
                sx={{
                  mx: 0.5,
                  color: isDarkMode ? color.gray400 : color.gray500,
                }}
              >
                •
              </Box>
              <Box component="span">
                {hooks.formatTime(competition.startTime)} -{" "}
                {hooks.formatTime(competition.endTime)}
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isDarkMode
                  ? alpha(color.gray700, 0.3)
                  : alpha(color.gray100, 0.5),
                borderRadius: 1.5,
                p: 1,
                px: 1.5,
                flex: "1 0 45%",
                minWidth: "120px",
              }}
            >
              <AccessTimeIcon
                fontSize="small"
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  mr: 1,
                }}
              />
              <Typography
                variant="body2"
                color={isDarkMode ? color.gray300 : color.gray700}
                sx={{ fontSize: "0.875rem" }}
              >
                {competition.duration} min
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isDarkMode
                  ? alpha(color.gray700, 0.3)
                  : alpha(color.gray100, 0.5),
                borderRadius: 1.5,
                p: 1,
                px: 1.5,
                flex: "1 0 45%",
                minWidth: "120px",
              }}
            >
              <HelpOutlineIcon
                fontSize="small"
                sx={{
                  color: isDarkMode ? color.teal300 : color.teal600,
                  mr: 1,
                }}
              />
              <Typography
                variant="body2"
                color={isDarkMode ? color.gray300 : color.gray700}
                sx={{ fontSize: "0.875rem" }}
              >
                {competition.totalQuestions} questions
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={!hooks.isActive && hooks.isUpcoming}
          onClick={handleClick}
          startIcon={<EmojiEventsIcon />}
          sx={{
            mt: "auto",
            py: 1.25,
            backgroundColor: buttonColors[currentStatus].bg,
            color: buttonColors[currentStatus].text,
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: buttonColors[currentStatus].hover,
            },
            "&.Mui-disabled": {
              backgroundColor: isDarkMode
                ? alpha(color.gray600, 0.3)
                : alpha(color.gray400, 0.3),
              color: isDarkMode ? color.gray400 : color.gray500,
            },
          }}
        >
          {hooks.isActive
            ? "Join now"
            : hooks.isUpcoming
            ? "Register now"
            : "See result"}
        </Button>
      </CardContent>
    </Card>
  );
}
