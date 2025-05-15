import {
  Box,
  Card,
  Typography,
  Grid,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

export default function BenefitsSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const benefits = [
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: "Real-time Feedback",
      subtitle: "Instant Analysis",
      description:
        "Get immediate, detailed feedback on your submissions without waiting",
      features: [
        "Results within seconds",
        "No human intervention required",
        "24/7 availability",
        "Consistent evaluation standards",
      ],
      color: color.teal500,
    },
    {
      icon: <PersonalVideoIcon sx={{ fontSize: 40 }} />,
      title: "Personalized Learning",
      subtitle: "Tailored to You",
      description:
        "AI adapts to your learning style and pace for optimal results",
      features: [
        "Custom difficulty levels",
        "Targeted improvement areas",
        "Learning pattern recognition",
        "Adaptive content suggestions",
      ],
      color: color.emerald500,
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: "Deep Analysis",
      subtitle: "Beyond Surface Level",
      description:
        "Comprehensive evaluation covering multiple aspects of language proficiency",
      features: [
        "Grammar and syntax analysis",
        "Contextual understanding",
        "Style and tone assessment",
        "Cultural appropriateness",
      ],
      color: color.green500,
    },
    {
      icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
      title: "Progress Tracking",
      subtitle: "Measure Growth",
      description: "Monitor your improvement journey with detailed analytics",
      features: [
        "Historical performance data",
        "Trend visualization",
        "Milestone achievements",
        "Comparative analysis",
      ],
      color: color.teal600,
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
        Why Choose AI Response?
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
        Experience the advantages of cutting-edge AI technology in language
        learning
      </Typography>

      <Grid container spacing={4}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                height: "100%",
                background: isDarkMode ? color.gray800 : color.white,
                borderRadius: 4,
                overflow: "hidden",
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray200
                }`,
                transition: "all 0.3s ease",
                transform: "translateY(0)",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 20px 40px ${benefit.color}20`,
                  borderColor: benefit.color,

                  "& .gradient-strip": {
                    width: "8px",
                  },
                },
              }}
            >
              <Box
                className="gradient-strip"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "6px",
                  background: `linear-gradient(180deg, ${benefit.color} 0%, ${benefit.color}CC 100%)`,
                  transition: "width 0.3s ease",
                }}
              />

              <Box sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        background: `${benefit.color}15`,
                        border: `1px solid ${benefit.color}30`,
                        color: benefit.color,
                      }}
                    >
                      {benefit.icon}
                    </Paper>

                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: isDarkMode ? color.white : color.gray900,
                        }}
                      >
                        {benefit.title}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: benefit.color,
                          fontWeight: "medium",
                        }}
                      >
                        {benefit.subtitle}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      lineHeight: 1.7,
                    }}
                  >
                    {benefit.description}
                  </Typography>

                  <List sx={{ py: 0 }}>
                    {benefit.features.map((feature, idx) => (
                      <ListItem
                        key={idx}
                        sx={{
                          py: 1,
                          px: 0,
                          animation: `slideIn 0.5s ease-out ${
                            index * 0.1 + idx * 0.05
                          }s both`,
                          "@keyframes slideIn": {
                            from: {
                              opacity: 0,
                              transform: "translateX(-20px)",
                            },
                            to: { opacity: 1, transform: "translateX(0)" },
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 35 }}>
                          <CheckCircleIcon
                            sx={{
                              color: benefit.color,
                              fontSize: 20,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: isDarkMode ? color.gray300 : color.gray700,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
