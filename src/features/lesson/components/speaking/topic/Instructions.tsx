import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useState } from "react";
import { formatTime } from "utils/format";

export default function Instructions({ duration }: { duration: number }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const instructions = [
    {
      id: 1,
      text: `You have ${formatTime(duration)} to speak about this topic.`,
      icon: <TimerOutlinedIcon />,
      color: isDarkMode ? color.teal300 : color.teal600,
      bgColor: isDarkMode ? `${color.teal900}80` : `${color.teal50}`,
      borderColor: isDarkMode ? color.teal700 : color.teal300,
      tip: "Manage your time wisely to cover all main points.",
    },
    {
      id: 2,
      text: "Try to organize your thoughts with an introduction, body, and conclusion.",
      icon: <FormatListNumberedIcon />,
      color: isDarkMode ? color.emerald300 : color.emerald600,
      bgColor: isDarkMode ? `${color.emerald900}80` : `${color.emerald50}`,
      borderColor: isDarkMode ? color.emerald700 : color.emerald300,
      tip: "A good structure helps listeners follow your ideas clearly.",
    },
    {
      id: 3,
      text: "Speak clearly and at a natural pace.",
      icon: <RecordVoiceOverIcon />,
      color: isDarkMode ? color.green300 : color.green600,
      bgColor: isDarkMode ? `${color.green900}80` : `${color.green50}`,
      borderColor: isDarkMode ? color.green700 : color.green300,
      tip: "Clarity is more important than speed. Take a deep breath before starting.",
    },
    {
      id: 4,
      text: "You can pause and resume your recording if needed.",
      icon: <PauseCircleOutlineIcon />,
      color: isDarkMode ? color.teal300 : color.teal600,
      bgColor: isDarkMode ? `${color.teal900}80` : `${color.teal50}`,
      borderColor: isDarkMode ? color.teal700 : color.teal300,
      tip: "Use pauses strategically if you need to gather your thoughts.",
    },
  ];

  return (
    <Paper
      elevation={isDarkMode ? 2 : 1}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
        borderRadius: 2.5,
        transition: "box-shadow 0.3s ease",
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        boxShadow: isDarkMode
          ? "0 4px 12px rgba(0, 0, 0, 0.2)"
          : "0 2px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          pb: 2.5,
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
          Speaking Instructions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {instructions.map((instruction) => (
          <Grid item xs={12} sm={6} key={instruction.id}>
            <Box
              sx={{
                p: 2.5,
                height: "100%",
                borderRadius: 2,
                bgcolor: instruction.bgColor,
                border: `1px solid ${instruction.borderColor}`,
                boxShadow:
                  activeStep === instruction.id
                    ? isDarkMode
                      ? "0 0 12px rgba(94, 234, 212, 0.25)"
                      : "0 0 8px rgba(20, 184, 166, 0.15)"
                    : "none",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                transform:
                  activeStep === instruction.id
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
                  background: instruction.color,
                  opacity: activeStep === instruction.id ? 1 : 0,
                  transition: "opacity 0.3s ease",
                },
              }}
              onMouseEnter={() => setActiveStep(instruction.id)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <Box
                sx={{
                  mr: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: instruction.color,
                  transition: "transform 0.3s ease",
                  transform:
                    activeStep === instruction.id ? "scale(1.1)" : "scale(1)",
                }}
              >
                {instruction.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Chip
                    label={`Step ${instruction.id}`}
                    size="small"
                    sx={{
                      fontWeight: "bold",
                      mr: 1.5,
                      bgcolor: instruction.color,
                      color: isDarkMode ? color.gray900 : color.white,
                      fontSize: "0.7rem",
                      height: 22,
                      px: 0.5,
                    }}
                  />
                  <Tooltip title={instruction.tip}>
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
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                    fontWeight: activeStep === instruction.id ? 500 : 400,
                    lineHeight: 1.5,
                  }}
                >
                  {instruction.text}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider
        sx={{
          my: 3,
          borderColor: isDarkMode ? color.gray700 : color.gray200,
          borderWidth: "1px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray500,
            fontStyle: "italic",
            ml: 0.5,
          }}
        >
          Follow these guidelines for the best results
        </Typography>
      </Box>
    </Paper>
  );
}
