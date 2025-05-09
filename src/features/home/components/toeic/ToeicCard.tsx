import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Toeic } from "interfaces";
import useColor from "theme/useColor";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LaunchIcon from "@mui/icons-material/Launch";
import { useNavigate } from "react-router-dom";

interface ToeicCardProps {
  toeic: Toeic;
}

export default function ToeicCard({ toeic }: ToeicCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/toeic/${toeic.id}`);
  };

  // Calculate total questions across all parts
  const totalQuestions =
    (toeic.questionsPart1?.length || 0) +
    (toeic.questionsPart2?.length || 0) +
    (toeic.questionsPart3?.length || 0) +
    (toeic.questionsPart4?.length || 0) +
    (toeic.questionsPart5?.length || 0) +
    (toeic.questionsPart6?.length || 0) +
    (toeic.questionsPart7?.length || 0);

  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes > 0 ? remainingMinutes + "m" : ""}`;
    }
    return `${minutes}m`;
  };

  // Get random background image for card (in real app would be from toeic object)
  const getCardBackground = () => {
    const backgrounds = [
      `linear-gradient(135deg, ${
        isDarkMode ? colors.teal900 : colors.teal50
      }, ${isDarkMode ? colors.gray900 : colors.gray100})`,
      `linear-gradient(135deg, ${
        isDarkMode ? colors.emerald900 : colors.emerald50
      }, ${isDarkMode ? colors.gray900 : colors.gray100})`,
      `linear-gradient(135deg, ${
        isDarkMode ? colors.gray900 : colors.gray50
      }, ${isDarkMode ? colors.teal900 : colors.teal100})`,
      `linear-gradient(135deg, ${
        isDarkMode ? colors.emerald900 : colors.emerald50
      }, ${isDarkMode ? colors.teal900 : colors.teal100})`,
    ];

    // Use toeic.id to select a consistent background
    return backgrounds[toeic.id % backgrounds.length];
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        background: getCardBackground(),
        boxShadow: isDarkMode
          ? "0 8px 20px rgba(0,0,0,0.3)"
          : "0 8px 20px rgba(0,0,0,0.1)",
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: isDarkMode
            ? "0 12px 28px rgba(0,0,0,0.4)"
            : "0 12px 28px rgba(0,0,0,0.15)",
        },
        border: `1px solid ${isDarkMode ? colors.gray800 : colors.gray200}`,
      }}
    >
      {/* Card decoration */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: isDarkMode
            ? `linear-gradient(135deg, ${colors.teal700}20, transparent)`
            : `linear-gradient(135deg, ${colors.teal300}30, transparent)`,
          borderRadius: "0 0 0 100%",
          zIndex: 1,
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Chip
            label="TOEIC TEST"
            size="small"
            sx={{
              backgroundColor: isDarkMode ? colors.teal800 : colors.teal100,
              color: isDarkMode ? colors.teal200 : colors.teal800,
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 24,
            }}
          />

          {toeic.status && (
            <Tooltip title="Active Test">
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: isDarkMode
                    ? colors.green400
                    : colors.green500,
                  boxShadow: `0 0 8px ${
                    isDarkMode ? colors.green400 + "80" : colors.green500 + "80"
                  }`,
                }}
              />
            </Tooltip>
          )}
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            color: isDarkMode ? colors.white : colors.gray900,
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "2.6em",
          }}
        >
          {toeic.title}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 2,
              flexWrap: "wrap",
              "& > div": {
                mb: 1,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeIcon
                fontSize="small"
                sx={{
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  fontSize: "1.1rem",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? colors.gray300 : colors.gray700,
                  fontWeight: 500,
                }}
              >
                {formatDuration(toeic.duration)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AssignmentIcon
                fontSize="small"
                sx={{
                  color: isDarkMode ? colors.teal400 : colors.teal600,
                  fontSize: "1.1rem",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? colors.gray300 : colors.gray700,
                  fontWeight: 500,
                }}
              >
                {totalQuestions || toeic.totalQuestions || 200} Questions
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Button
          variant="contained"
          endIcon={<LaunchIcon fontSize="small" />}
          onClick={handleClick}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            background: isDarkMode
              ? `linear-gradient(90deg, ${colors.teal600}, ${colors.teal700})`
              : `linear-gradient(90deg, ${colors.teal500}, ${colors.teal600})`,
            "&:hover": {
              background: isDarkMode
                ? `linear-gradient(90deg, ${colors.teal500}, ${colors.teal600})`
                : `linear-gradient(90deg, ${colors.teal600}, ${colors.teal700})`,
            },
            boxShadow: isDarkMode
              ? "0 4px 12px rgba(20,184,166,0.3)"
              : "0 4px 12px rgba(20,184,166,0.2)",
          }}
        >
          Start Test
        </Button>
      </CardContent>
    </Card>
  );
}
