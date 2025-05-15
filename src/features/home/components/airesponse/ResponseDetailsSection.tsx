import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ScoreIcon from "@mui/icons-material/Score";
import FeedbackIcon from "@mui/icons-material/Feedback";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningIcon from "@mui/icons-material/Warning";
import DescriptionIcon from "@mui/icons-material/Description";
import CommentIcon from "@mui/icons-material/Comment";

export default function ResponseDetailsSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const responseDetails = [
    {
      icon: <ScoreIcon fontSize="large" />,
      label: "Score",
      type: "number",
      description: "Precise scoring from 0-100 based on multiple criteria",
      example: "85/100",
    },
    {
      icon: <FeedbackIcon fontSize="large" />,
      label: "Feedback",
      type: "string",
      description:
        "Comprehensive analysis of your submission with actionable insights",
      example: "Well-structured argument with clear examples...",
    },
    {
      icon: <TrendingUpIcon fontSize="large" />,
      label: "Strengths",
      type: "string[]",
      description: "Detailed breakdown of your strong points and achievements",
      example: ["Clear thesis", "Good vocabulary", "Logical flow"],
    },
    {
      icon: <WarningIcon fontSize="large" />,
      label: "Areas to Improve",
      type: "string[]",
      description: "Specific suggestions for enhancement and development",
      example: ["Grammar consistency", "Paragraph transitions"],
    },
    {
      icon: <DescriptionIcon fontSize="large" />,
      label: "Transcript",
      type: "string",
      description:
        "Automatic speech-to-text conversion for speaking assessments",
      example: "Your spoken content transcribed...",
    },
    {
      icon: <CommentIcon fontSize="large" />,
      label: "Test Comments",
      type: "string",
      description: "Overall assessment comments for completed tests",
      example: "Strong performance with room for improvement in...",
    },
  ];

  return (
    <Box mb={10}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: isDarkMode ? color.white : color.gray900,
        }}
      >
        AI Response Components
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          color: isDarkMode ? color.gray400 : color.gray600,
          mb: 6,
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Detailed breakdown of AI feedback structure and data types
      </Typography>

      <Grid container spacing={3}>
        {responseDetails.map((detail, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                height: "100%",
                background: isDarkMode ? color.gray800 : color.white,
                borderRadius: 3,
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
                transition: "all 0.3s ease",
                transform: "translateY(0)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: isDarkMode ? color.emerald400 : color.emerald600,
                  boxShadow: `0 12px 24px ${
                    isDarkMode ? color.emerald400 : color.emerald600
                  }15`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${
                          isDarkMode ? color.emerald500 : color.emerald600
                        } 0%, ${
                          isDarkMode ? color.teal500 : color.teal600
                        } 100%)`,
                        color: color.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {detail.icon}
                    </Box>

                    <Box flex={1}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: isDarkMode ? color.white : color.gray900,
                        }}
                      >
                        {detail.label}
                      </Typography>

                      <Chip
                        label={detail.type}
                        size="small"
                        sx={{
                          mt: 0.5,
                          backgroundColor: isDarkMode
                            ? color.gray700
                            : color.gray200,
                          color: isDarkMode ? color.gray300 : color.gray700,
                          fontSize: "0.75rem",
                          height: 20,
                        }}
                      />
                    </Box>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      lineHeight: 1.6,
                    }}
                  >
                    {detail.description}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: isDarkMode
                        ? color.gray900
                        : color.gray50,
                      border: `1px solid ${
                        isDarkMode ? color.gray700 : color.gray200
                      }`,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDarkMode ? color.gray500 : color.gray500,
                        fontWeight: "medium",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Example:
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? color.emerald400 : color.emerald700,
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                      }}
                    >
                      {Array.isArray(detail.example)
                        ? detail.example.map((item, i) => (
                            <Box key={i} component="span" display="block">
                              • {item}
                            </Box>
                          ))
                        : detail.example}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
