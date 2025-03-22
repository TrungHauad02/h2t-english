import { CompetitionTest } from "interfaces";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  CardActionArea,
  Avatar,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function CompetitionTestItem({
  test,
}: {
  test: CompetitionTest;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Check if competition is active, upcoming, or ended
  const now = new Date();
  const startTime = new Date(test?.startTime);
  const endTime = new Date(test?.endTime);

  const getCompetitionStatus = () => {
    if (now < startTime) {
      return {
        label: "Upcoming",
        color: isDarkMode ? color.infoDarkMode : color.info,
        textColor: color.white,
        bgColor: isDarkMode ? `${color.infoDarkMode}20` : `${color.info}15`,
      };
    } else if (now >= startTime && now <= endTime) {
      return {
        label: "Active",
        color: isDarkMode ? color.successDarkMode : color.success,
        textColor: color.white,
        bgColor: isDarkMode
          ? `${color.successDarkMode}20`
          : `${color.success}15`,
      };
    } else {
      return {
        label: "Ended",
        color: isDarkMode ? color.errorDarkMode : color.error,
        textColor: color.white,
        bgColor: isDarkMode ? `${color.errorDarkMode}20` : `${color.error}15`,
      };
    }
  };

  const competitionStatus = getCompetitionStatus();

  // Calculate progress of competition timeline
  const calculateTimeProgress = () => {
    if (now < startTime) return 0;
    if (now > endTime) return 100;

    const totalDuration = endTime.getTime() - startTime.getTime();
    const elapsed = now.getTime() - startTime.getTime();
    return Math.round((elapsed / totalDuration) * 100);
  };

  const timeProgress = calculateTimeProgress();

  // Format date function
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Get time remaining or elapsed
  const getTimeInfo = () => {
    if (now < startTime) {
      const diff = startTime.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (days > 0) {
        return `Starts in ${days}d ${hours}h`;
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `Starts in ${hours}h ${minutes}m`;
      }
    } else if (now <= endTime) {
      const diff = endTime.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (days > 0) {
        return `${days}d ${hours}h remaining`;
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m remaining`;
      }
    } else {
      return "Competition ended";
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px) scale(1.02)" : "none",
          boxShadow: hovered
            ? `0 16px 32px ${
                isDarkMode ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.12)"
              }`
            : `0 6px 16px ${
                isDarkMode ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.08)"
              }`,
          bgcolor: isDarkMode ? color.gray800 : color.white,
          overflow: "hidden",
          position: "relative",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Competition header */}
        <Box
          sx={{
            position: "relative",
            padding: "24px 20px 48px",
            background: isDarkMode
              ? `linear-gradient(135deg, ${color.emerald900}, ${color.teal900})`
              : `linear-gradient(135deg, ${color.emerald100}, ${color.teal100})`,
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.5)",
              transform: "rotate(25deg)",
              top: "-30px",
              right: "20px",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "60px",
              height: "60px",
              borderRadius: "15px",
              background: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.5)",
              transform: "rotate(25deg)",
              bottom: "-20px",
              left: "-20px",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: isDarkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(255,255,255,0.6)",
              transform: "rotate(25deg)",
              top: "40px",
              left: "20px",
              zIndex: 0,
            }}
          />

          {/* Competition title and trophy icon */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 56,
                height: 56,
                fontSize: "32px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                marginBottom: 1.5,
              }}
            >
              🏆
            </Avatar>
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 700,
                color: isDarkMode ? color.white : color.gray900,
                fontSize: "1.2rem",
                lineHeight: 1.3,
                textAlign: "center",
              }}
            >
              {test?.title}
            </Typography>
            {/* Status chip positioned at bottom of header */}
            <Box
              sx={{
                mt: 2,
                zIndex: 10,
              }}
            >
              <Chip
                label={competitionStatus.label}
                size="small"
                sx={{
                  backgroundColor: competitionStatus.color,
                  color: competitionStatus.textColor,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "26px",
                  padding: "0 12px",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                }}
              />
            </Box>
          </Box>
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            px: 2.5,
            py: 2.5,
            pt: 3,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Time indicator */}
          <Box
            sx={{
              mb: 2,
              mt: 0.5,
              p: 1.5,
              borderRadius: "12px",
              backgroundColor: competitionStatus.bgColor,
              border: `1px solid ${competitionStatus.color}30`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              >
                Status
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: competitionStatus.color,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {getTimeInfo()}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={timeProgress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: competitionStatus.color,
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* Competition details */}
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "10px",
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                    border: `1px solid ${
                      isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
                    }`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.65rem",
                      color: isDarkMode ? color.gray400 : color.gray500,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 0.5,
                    }}
                  >
                    Duration
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: isDarkMode ? color.white : color.gray900,
                    }}
                  >
                    {test?.duration} min
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "10px",
                    backgroundColor: isDarkMode
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                    border: `1px solid ${
                      isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
                    }`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "0.65rem",
                      color: isDarkMode ? color.gray400 : color.gray500,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: 0.5,
                    }}
                  >
                    Questions
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: isDarkMode ? color.white : color.gray900,
                    }}
                  >
                    {test?.totalQuestions || "N/A"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Time period */}
          <Box
            sx={{
              mb: 2.5,
              p: 1.5,
              borderRadius: "10px",
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.01)",
              border: `1px solid ${
                isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
              }`,
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.65rem",
                    color: isDarkMode ? color.gray400 : color.gray500,
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 0.5,
                  }}
                >
                  START TIME
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? color.white : color.gray900,
                  }}
                >
                  {formatDate(test?.startTime)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.65rem",
                    color: isDarkMode ? color.gray400 : color.gray500,
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 0.5,
                  }}
                >
                  END TIME
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? color.white : color.gray900,
                  }}
                >
                  {formatDate(test?.endTime)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Button
              sx={{
                color: isDarkMode ? color.gray300 : color.gray600,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "10px",
                padding: "6px 12px",
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle history view
              }}
            >
              History
            </Button>
            <Button
              variant="contained"
              disabled={now < startTime || now > endTime}
              sx={{
                backgroundColor: competitionStatus.color,
                color: competitionStatus.textColor,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                padding: "8px 18px",
                transition: "all 0.3s ease",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor:
                    now >= startTime && now <= endTime
                      ? `${competitionStatus.color}e0`
                      : competitionStatus.color,
                  boxShadow:
                    now >= startTime && now <= endTime
                      ? `0 4px 12px ${competitionStatus.color}50`
                      : "none",
                  transform:
                    now >= startTime && now <= endTime
                      ? "translateY(-2px)"
                      : "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: isDarkMode ? color.gray700 : color.gray300,
                  color: isDarkMode ? color.gray500 : color.gray500,
                },
              }}
              onClick={() => navigate(`${test.id}`)}
            >
              {now < startTime
                ? "Coming Soon"
                : now > endTime
                ? "Ended"
                : "Enter Competition"}
            </Button>
          </Box>
        </CardContent>

        {/* Interactive overlay for entire card */}
        <CardActionArea
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            opacity: 0, // Make invisible but clickable
          }}
          onClick={() => navigate(`${test.id}`)}
        />
      </Card>
    </Grid>
  );
}
