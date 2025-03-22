import { Test } from "interfaces";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  LinearProgress,
  CardActionArea,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

export default function TestItem({ test }: { test: Test }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Calculate score percentage for progress bar
  const scorePercentage = test?.scoreLastOfTest
    ? (test.scoreLastOfTest / 100) * 100
    : 0;

  // Determine status chip color and text based on score
  const getStatusInfo = () => {
    if (!test?.scoreLastOfTest) {
      return {
        label: "New",
        color: isDarkMode ? color.infoDarkMode : color.info,
        textColor: color.white,
        bgColor: isDarkMode ? `${color.infoDarkMode}20` : `${color.info}15`,
      };
    } else if (test.scoreLastOfTest >= 80) {
      return {
        label: "Excellent",
        color: isDarkMode ? color.successDarkMode : color.success,
        textColor: color.white,
        bgColor: isDarkMode
          ? `${color.successDarkMode}20`
          : `${color.success}15`,
      };
    } else if (test.scoreLastOfTest >= 60) {
      return {
        label: "Good",
        color: isDarkMode ? color.teal700 : color.teal600,
        textColor: color.white,
        bgColor: isDarkMode ? `${color.teal700}20` : `${color.teal600}15`,
      };
    } else if (test.scoreLastOfTest >= 40) {
      return {
        label: "Average",
        color: isDarkMode ? color.warningDarkMode : color.warning,
        textColor: isDarkMode ? color.gray900 : color.gray900,
        bgColor: isDarkMode
          ? `${color.warningDarkMode}20`
          : `${color.warning}15`,
      };
    } else {
      return {
        label: "Need Practice",
        color: isDarkMode ? color.errorDarkMode : color.error,
        textColor: color.white,
        bgColor: isDarkMode ? `${color.errorDarkMode}20` : `${color.error}15`,
      };
    }
  };

  const statusInfo = getStatusInfo();

  // Get icon for test type
  const getTestTypeIcon = () => {
    switch (test?.type) {
      case "READING":
        return "📚";
      case "LISTENING":
        return "🎧";
      case "SPEAKING":
        return "🎤";
      case "WRITING":
        return "✏️";
      case "MIXING":
        return "🔄";
      default:
        return "📝";
    }
  };

  const getTypeGradient = () => {
    switch (test?.type) {
      case "READING":
        return isDarkMode
          ? `linear-gradient(135deg, ${color.teal900}, ${color.teal800})`
          : `linear-gradient(135deg, ${color.teal100}, ${color.teal50})`;
      case "LISTENING":
        return isDarkMode
          ? `linear-gradient(135deg, ${color.emerald900}, ${color.emerald800})`
          : `linear-gradient(135deg, ${color.emerald100}, ${color.emerald50})`;
      case "SPEAKING":
        return isDarkMode
          ? `linear-gradient(135deg, ${color.green900}, ${color.green800})`
          : `linear-gradient(135deg, ${color.green100}, ${color.green50})`;
      case "WRITING":
        return isDarkMode
          ? `linear-gradient(135deg, ${color.gray800}, ${color.gray700})`
          : `linear-gradient(135deg, ${color.gray100}, ${color.gray50})`;
      case "MIXING":
        return isDarkMode
          ? `linear-gradient(135deg, ${color.emerald900}, ${color.teal900})`
          : `linear-gradient(135deg, ${color.emerald100}, ${color.teal100})`;
      default:
        return isDarkMode
          ? `linear-gradient(135deg, ${color.gray800}, ${color.gray700})`
          : `linear-gradient(135deg, ${color.gray100}, ${color.gray50})`;
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
        {/* Card header with decorative background */}
        <Box
          sx={{
            position: "relative",
            padding: "28px 20px 36px",
            background: getTypeGradient(),
            overflow: "hidden",
          }}
        >
          {/* Floating shapes decoration */}
          <Box
            sx={{
              position: "absolute",
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              background: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.5)",
              transform: "rotate(25deg)",
              top: "-20px",
              right: "30px",
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
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.5)",
              transform: "rotate(25deg)",
              bottom: "10px",
              right: "-10px",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "50px",
              height: "50px",
              borderRadius: "15px",
              background: isDarkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.5)",
              transform: "rotate(25deg)",
              bottom: "20px",
              left: "-15px",
              zIndex: 0,
            }}
          />

          {/* Test type indicator with icon */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                bgcolor: isDarkMode
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.8)",
                width: 48,
                height: 48,
                fontSize: "24px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {getTestTypeIcon()}
            </Avatar>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: isDarkMode
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.6)",
                  letterSpacing: "0.5px",
                  display: "block",
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                }}
              >
                {test?.type} TEST
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDarkMode ? color.white : color.gray900,
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                }}
              >
                {test?.title.length > 35
                  ? `${test?.title.substring(0, 32)}...`
                  : test?.title}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Status chip positioned on the edge */}
        <Box
          sx={{
            position: "absolute",
            top: 80,
            right: 8,
            zIndex: 10,
          }}
        >
          <Chip
            label={statusInfo.label}
            size="small"
            sx={{
              backgroundColor: statusInfo.color,
              color: statusInfo.textColor,
              fontWeight: 700,
              padding: "0 2px",
              fontSize: "0.7rem",
              height: "24px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            px: 2.5,
            py: 2,
            pb: 1.5,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Test info cards */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mb: 2,
              mt: 1,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1.5,
                px: 1,
                borderRadius: "12px",
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.02)",
                border: `1px solid ${
                  isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
                }`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: isDarkMode ? color.white : color.gray900,
                  lineHeight: 1,
                }}
              >
                {test?.duration}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: isDarkMode ? color.gray400 : color.gray500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Minutes
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1.5,
                px: 1,
                borderRadius: "12px",
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.02)",
                border: `1px solid ${
                  isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
                }`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: isDarkMode ? color.white : color.gray900,
                  lineHeight: 1,
                }}
              >
                {test?.totalQuestions}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  color: isDarkMode ? color.gray400 : color.gray500,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Questions
              </Typography>
            </Box>
          </Box>

          {/* Score section with background */}
          <Box
            sx={{
              mb: 2.5,
              p: 1.5,
              borderRadius: "12px",
              backgroundColor: statusInfo.bgColor,
              border: `1px solid ${statusInfo.color}30`,
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
                Last Score
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: statusInfo.color,
                  fontWeight: 800,
                  fontSize: "1.15rem",
                }}
              >
                {test?.scoreLastOfTest !== null
                  ? `${test.scoreLastOfTest}/100`
                  : "Not taken"}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={scorePercentage}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: statusInfo.color,
                  borderRadius: 3,
                  transition: "transform 1s ease-in-out",
                },
              }}
            />
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
              sx={{
                backgroundColor: color.btnSubmitBg,
                color: color.white,
                fontWeight: 700,
                textTransform: "none",
                borderRadius: "10px",
                padding: "8px 18px",
                transition: "all 0.3s ease",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: color.btnSubmitHoverBg,
                  boxShadow: `0 4px 12px ${color.btnSubmitBg}50`,
                  transform: "translateY(-2px)",
                },
              }}
              onClick={() => navigate(`${test.id}`)}
            >
              Start Test
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
