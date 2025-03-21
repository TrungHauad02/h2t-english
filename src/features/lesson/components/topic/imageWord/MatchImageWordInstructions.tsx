import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Tooltip,
  Avatar,
  Stack,
} from "@mui/material";
import { useState } from "react";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import RepeatIcon from "@mui/icons-material/Repeat";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function MatchImageWordInstructions() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Define gradient backgrounds based on theme
  const borderGradient = isDarkMode
    ? `linear-gradient(90deg, ${color.teal600} 0%, ${color.emerald600} 100%)`
    : `linear-gradient(90deg, ${color.teal500} 0%, ${color.emerald500} 100%)`;

  const backgroundGradient = isDarkMode
    ? `linear-gradient(145deg, ${color.gray800} 0%, ${color.teal900} 100%)`
    : `linear-gradient(145deg, ${color.white} 0%, ${color.teal50} 100%)`;

  const steps = [
    {
      id: 1,
      title: "Select a Word",
      icon: <TouchAppIcon />,
      description: "Select a word from the left panel.",
      color: isDarkMode ? color.teal400 : color.teal600,
      bgColor: isDarkMode ? `${color.teal900}80` : `${color.teal50}`,
      borderColor: isDarkMode ? color.teal700 : color.teal300,
      tip: "Take your time to read each word carefully.",
    },
    {
      id: 2,
      title: "Find Matching Image",
      icon: <ImageSearchIcon />,
      description: "Click on the matching image from the right panel.",
      color: isDarkMode ? color.emerald400 : color.emerald600,
      bgColor: isDarkMode ? `${color.emerald900}80` : `${color.emerald50}`,
      borderColor: isDarkMode ? color.emerald700 : color.emerald300,
      tip: "Look for visual clues that connect to the word's meaning.",
    },
    {
      id: 3,
      title: "Complete All Matches",
      icon: <RepeatIcon />,
      description:
        "Continue matching all words with their corresponding images.",
      color: isDarkMode ? color.green400 : color.green600,
      bgColor: isDarkMode ? `${color.green900}80` : `${color.green50}`,
      borderColor: isDarkMode ? color.green700 : color.green300,
      tip: "Work through systematically - match the words you're most confident about first.",
    },
    {
      id: 4,
      title: "Submit Your Answers",
      icon: <CheckCircleOutlineIcon />,
      description: "Click the Submit button when you're finished.",
      color: isDarkMode ? color.teal400 : color.teal600,
      bgColor: isDarkMode ? `${color.teal900}80` : `${color.teal50}`,
      borderColor: isDarkMode ? color.teal700 : color.teal300,
      tip: "Double-check your matches before submitting.",
    },
  ];

  const helperTools = [
    {
      title: "Show Answers",
      icon: <HelpOutlineIcon />,
      description:
        "Use this button to see the correct matches if you're stuck.",
      color: isDarkMode ? color.emerald400 : color.emerald600,
    },
    {
      title: "Reset",
      icon: <RestartAltIcon />,
      description: "Start over with a clean slate if you want to try again.",
      color: isDarkMode ? color.teal400 : color.emerald600,
    },
  ];

  return (
    <Paper
      elevation={isDarkMode ? 2 : 1}
      sx={{
        width: "100%",
        mb: 3,
        borderRadius: 2.5,
        position: "relative",
        background: backgroundGradient,
        overflow: "hidden",
        border: isDarkMode ? `1px solid ${color.gray700}` : "none",
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
          : "0 2px 8px rgba(0, 0, 0, 0.05)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "6px",
          height: "100%",
          background: borderGradient,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: { xs: 2.5, md: 3.5 },
          pl: { xs: 3.5, md: 4.5 },
          borderBottom: `1px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            mr: 2.5,
            background: `linear-gradient(135deg, ${
              isDarkMode ? color.emerald700 : color.emerald500
            }, ${isDarkMode ? color.teal700 : color.teal500})`,
            boxShadow: isDarkMode
              ? "0 3px 8px rgba(5, 150, 105, 0.3)"
              : "0 2px 6px rgba(5, 150, 105, 0.2)",
          }}
        >
          <InfoOutlinedIcon
            sx={{ color: isDarkMode ? color.gray100 : color.white }}
          />
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              fontWeight: 600,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: 0,
                width: 48,
                height: 3.5,
                borderRadius: 2,
                background: `linear-gradient(to right, ${
                  isDarkMode ? color.emerald500 : color.emerald600
                }, ${isDarkMode ? color.teal400 : color.teal500})`,
              },
            }}
          >
            How to do it
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              mt: 1,
            }}
          >
            Match each word with its corresponding image to complete the
            exercise
          </Typography>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={3}>
          {steps.map((step) => (
            <Grid item xs={12} sm={6} key={step.id}>
              <Box
                sx={{
                  p: 2.5,
                  height: "100%",
                  borderRadius: 2,
                  bgcolor: step.bgColor,
                  border: `1px solid ${step.borderColor}`,
                  boxShadow:
                    activeStep === step.id
                      ? isDarkMode
                        ? "0 0 12px rgba(94, 234, 212, 0.25)"
                        : "0 0 8px rgba(20, 184, 166, 0.15)"
                      : "none",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  transform:
                    activeStep === step.id
                      ? "translateY(-3px)"
                      : "translateY(0)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    boxShadow: isDarkMode
                      ? "0 0 12px rgba(94, 234, 212, 0.25)"
                      : "0 0 8px rgba(20, 184, 166, 0.15)",
                    transform: "translateY(-3px)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    background: step.color,
                    opacity: activeStep === step.id ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  },
                }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <Avatar
                  sx={{
                    bgcolor: step.color,
                    color: isDarkMode ? color.gray900 : color.white,
                    width: 40,
                    height: 40,
                    mr: 2,
                    transition: "transform 0.3s ease",
                    transform:
                      activeStep === step.id ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {step.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Chip
                      label={`Step ${step.id}`}
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        mr: 1.5,
                        bgcolor: step.color,
                        color: isDarkMode ? color.gray900 : color.white,
                        fontSize: "0.7rem",
                        height: 22,
                        px: 0.5,
                      }}
                    />
                    <Tooltip title={step.tip}>
                      <InfoOutlinedIcon
                        fontSize="small"
                        sx={{
                          color: isDarkMode ? color.gray400 : color.gray500,
                          cursor: "pointer",
                          fontSize: 16,
                        }}
                      />
                    </Tooltip>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: isDarkMode ? color.white : color.gray900,
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray700,
                      fontWeight: activeStep === step.id ? 500 : 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Helper tools section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)",
            border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <LightbulbOutlinedIcon
              sx={{
                color: isDarkMode ? color.emerald300 : color.emerald600,
                fontSize: 24,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? color.emerald300 : color.emerald600,
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Helpful Tools
            </Typography>
          </Stack>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {helperTools.map((tool, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: tool.color,
                      color: isDarkMode ? color.gray900 : color.white,
                      width: 36,
                      height: 36,
                    }}
                  >
                    {tool.icon}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: isDarkMode ? color.gray200 : color.gray800,
                        mb: 0.5,
                      }}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.gray400 : color.gray600,
                      }}
                    >
                      {tool.description}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Success criteria */}
        <Box
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${
              isDarkMode ? color.teal800 : color.teal100
            }, ${isDarkMode ? color.emerald800 : color.emerald100})`,
            border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              color: isDarkMode ? color.emerald300 : color.emerald600,
              mr: 2,
              fontSize: 28,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.teal100 : color.teal900,
              fontWeight: 500,
            }}
          >
            Match all words correctly to achieve a perfect score. Your score
            will be displayed at the end of the exercise.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
