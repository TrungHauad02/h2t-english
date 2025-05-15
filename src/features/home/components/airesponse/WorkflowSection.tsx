import { Box, Card, Typography, Grid, Stack, Avatar } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function WorkflowSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const steps = [
    {
      icon: <UploadFileIcon />,
      title: "Submit Your Work",
      description: "Upload your writing or record your speech",
      color: color.teal500,
    },
    {
      icon: <AutoFixHighIcon />,
      title: "AI Analysis",
      description: "Advanced AI processes your submission",
      color: color.emerald500,
    },
    {
      icon: <AssessmentIcon />,
      title: "Instant Feedback",
      description: "Receive detailed evaluation and scores",
      color: color.green500,
    },
    {
      icon: <TrendingUpIcon />,
      title: "Track Progress",
      description: "Monitor your improvement over time",
      color: color.emerald600,
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
        How It Works
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
        Simple, efficient workflow designed for optimal learning experience
      </Typography>

      <Card
        sx={{
          background: isDarkMode
            ? `linear-gradient(145deg, ${color.gray800} 0%, ${color.gray900} 100%)`
            : `linear-gradient(145deg, ${color.gray50} 0%, ${color.white} 100%)`,
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {steps.map((step, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Stack alignItems="center" spacing={3}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: `${step.color}15`,
                    color: step.color,
                    fontSize: "2rem",
                    border: `3px solid ${step.color}30`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1) rotate(5deg)",
                      bgcolor: `${step.color}25`,
                    },
                  }}
                >
                  {step.icon}
                </Avatar>

                <Box textAlign="center">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: isDarkMode ? color.white : color.gray900,
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>

                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: "none", md: "block" },
                      position: "absolute",
                      top: "50%",
                      right: { md: "-24px" },
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ArrowForwardIcon
                      sx={{
                        color: isDarkMode ? color.gray600 : color.gray400,
                        fontSize: 30,
                      }}
                    />
                  </Box>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
