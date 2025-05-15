import { Grid, Typography, Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import CreateIcon from "@mui/icons-material/Create";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import QuizIcon from "@mui/icons-material/Quiz";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 45 }} />,
      title: "Writing Skills",
      description:
        "AI analyzes and evaluates your writing based on the given topic",
      details: [
        "Accurate automated scoring",
        "Detailed content feedback",
        "Strength analysis",
        "Improvement suggestions",
        "Grammar and style checking",
        "Vocabulary enhancement tips",
      ],
      gradientColors: [color.teal400, color.teal600],
      accentColor: isDarkMode ? color.teal400 : color.teal600,
    },
    {
      icon: <RecordVoiceOverIcon sx={{ fontSize: 45 }} />,
      title: "Speaking Skills",
      description: "AI evaluates pronunciation and speech content alignment",
      details: [
        "Pronunciation accuracy analysis",
        "Topic relevance assessment",
        "Automatic transcription",
        "Detailed feedback",
        "Fluency evaluation",
        "Intonation guidance",
      ],
      gradientColors: [color.emerald400, color.emerald600],
      accentColor: isDarkMode ? color.emerald400 : color.emerald600,
    },
    {
      icon: <QuizIcon sx={{ fontSize: 45 }} />,
      title: "Test Assessment",
      description: "Comprehensive evaluation after test completion",
      details: [
        "Overall performance review",
        "Result analysis",
        "Learning recommendations",
        "Progress tracking",
        "Weakness identification",
        "Personalized study plan",
      ],
      gradientColors: [color.green400, color.green600],
      accentColor: isDarkMode ? color.green400 : color.green600,
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
        Core Features
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
        Experience the power of AI-driven language learning across multiple
        skill areas
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <FeatureCard feature={feature} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
