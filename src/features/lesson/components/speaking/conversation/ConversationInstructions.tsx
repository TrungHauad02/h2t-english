import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonIcon from "@mui/icons-material/Person";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function ConversationInstructions({
  selectedCharacter,
}: {
  selectedCharacter: string;
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Define colors based on theme
  const borderGradient = isDarkMode
    ? `linear-gradient(90deg, ${color.teal600} 0%, ${color.emerald600} 100%)`
    : `linear-gradient(90deg, ${color.teal500} 0%, ${color.emerald500} 100%)`;

  const backgroundGradient = isDarkMode
    ? `linear-gradient(145deg, ${color.gray800} 0%, ${color.teal900} 100%)`
    : `linear-gradient(145deg, ${color.white} 0%, ${color.teal50} 100%)`;

  const chipBgColor = isDarkMode ? color.teal900 : color.teal50;
  const chipTextColor = isDarkMode ? color.teal300 : color.teal700;
  const textColor = isDarkMode ? color.gray200 : color.gray800;
  const subtleTextColor = isDarkMode ? color.gray400 : color.gray600;
  const highlightColor = isDarkMode ? color.emerald300 : color.emerald600;
  const dividerColor = isDarkMode ? color.gray700 : color.gray200;
  const avatarBgColor = isDarkMode ? color.teal700 : color.teal100;

  // Define steps for the instructional process
  const steps = [
    {
      title: "Record your lines",
      icon: <MicIcon />,
      description: `Click on the microphone icon to start recording yourself speaking as ${selectedCharacter}.`,
      color: isDarkMode ? color.teal400 : color.teal600,
    },
    {
      title: "Review & stop",
      icon: <StopIcon />,
      description:
        "When finished, click the stop button to end your recording.",
      color: isDarkMode ? color.red700 : color.red600,
    },
    {
      title: "Listen to others",
      icon: <PlayArrowIcon />,
      description: "Click the play button to hear the other character's lines.",
      color: isDarkMode ? color.green700 : color.green600,
    },
    {
      title: "Retry if needed",
      icon: <DeleteOutlineIcon />,
      description:
        "You can delete and re-record any line until you're satisfied.",
      color: isDarkMode ? color.gray500 : color.gray600,
    },
  ];

  return (
    <Box sx={{ mb: 6, maxWidth: "100%" }}>
      {/* Section header with character highlight */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography
          variant="h5"
          sx={{
            color: textColor,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Conversation Practice
        </Typography>

        <Chip
          avatar={
            <Avatar sx={{ bgcolor: avatarBgColor }}>
              <PersonIcon fontSize="small" />
            </Avatar>
          }
          label={selectedCharacter}
          variant="filled"
          sx={{
            bgcolor: chipBgColor,
            color: chipTextColor,
            fontWeight: 600,
            px: 0.5,
            border: `1px solid ${isDarkMode ? color.teal700 : color.teal200}`,
          }}
        />
      </Stack>

      {/* Modern card with gradient background */}
      <Paper
        elevation={isDarkMode ? 0 : 2}
        sx={{
          position: "relative",
          background: backgroundGradient,
          borderRadius: 3,
          overflow: "hidden",
          mb: 4,
          border: isDarkMode ? `1px solid ${color.gray700}` : "none",
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
        {/* Card header with tip */}
        <Box sx={{ p: 3, pl: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <LightbulbOutlinedIcon
              sx={{ color: highlightColor, fontSize: 28 }}
            />
            <Typography
              variant="h6"
              sx={{
                color: highlightColor,
                fontWeight: 600,
              }}
            >
              How to participate
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: subtleTextColor,
              mt: 1,
              pl: 5,
            }}
          >
            Follow these steps to practice speaking as {selectedCharacter}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: dividerColor }} />

        {/* Step-by-step instructions */}
        <Box sx={{ p: 3 }}>
          <Stack spacing={3}>
            {steps.map((step, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2.5}
                alignItems="flex-start"
              >
                <Avatar
                  sx={{
                    bgcolor: step.color,
                    color: color.white,
                    width: 36,
                    height: 36,
                  }}
                >
                  {step.icon}
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: textColor,
                      mb: 0.5,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: subtleTextColor,
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Bottom tip */}
        <Box
          sx={{
            p: 3,
            bgcolor: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.6)",
            borderTop: `1px solid ${dividerColor}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: highlightColor, fontWeight: 500 }}
          >
            Pro tip: Try to match the emotion and pace of the conversation for a
            more authentic practice experience.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
