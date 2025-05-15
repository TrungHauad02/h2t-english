import { Box, Card, Typography, Stack, Button, Chip } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const tags = [
    "Instant Results",
    "Personalized Feedback",
    "Progress Tracking",
    "24/7 Availability",
    "Multi-skill Coverage",
  ];

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        background: isDarkMode
          ? `linear-gradient(135deg, ${color.gray800} 0%, ${color.gray900} 100%)`
          : `linear-gradient(135deg, ${color.teal50} 0%, ${color.emerald50} 100%)`,
        border: `2px solid ${isDarkMode ? color.teal700 : color.teal200}`,
        boxShadow: `0 0 40px ${isDarkMode ? color.teal600 : color.teal200}30`,
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 30% 50%, ${color.teal500} 0%, transparent 50%),
            radial-gradient(circle at 70% 50%, ${color.emerald500} 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating decorative element */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color.yellow} 0%, ${color.yellow}50 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "float 3s infinite ease-in-out",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
            "50%": { transform: "translateY(-10px) rotate(10deg)" },
          },
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 50, color: color.white }} />
      </Box>

      <Box
        sx={{ position: "relative", p: { xs: 4, md: 6 }, textAlign: "center" }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: isDarkMode ? color.white : color.gray900,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Ready to Transform Your Learning?
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            mb: 4,
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Join thousands of learners who are already experiencing the power of
          AI-driven language improvement
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          mb={4}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                m: 0.5,
                px: 2,
                py: 3,
                fontSize: "0.9rem",
                fontWeight: "medium",
                backgroundColor: isDarkMode ? color.teal800 : color.teal100,
                color: isDarkMode ? color.teal200 : color.teal800,
                border: `1px solid ${
                  isDarkMode ? color.teal600 : color.teal300
                }`,
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "scale(0.9)" },
                  to: { opacity: 1, transform: "scale(1)" },
                },
              }}
            />
          ))}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<SchoolIcon />}
            onClick={() => navigate("/routes")}
            sx={{
              px: 4,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              background: `linear-gradient(135deg, ${color.teal500} 0%, ${color.emerald500} 100%)`,
              color: color.white,
              borderRadius: 3,
              textTransform: "none",
              boxShadow: `0 8px 20px ${color.teal500}30`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: `linear-gradient(135deg, ${color.teal600} 0%, ${color.emerald600} 100%)`,
                transform: "translateY(-2px)",
                boxShadow: `0 12px 30px ${color.teal500}40`,
              },
            }}
          >
            Start Learning
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<QuizIcon />}
            onClick={() => navigate("/test/mixings")}
            sx={{
              px: 4,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderColor: isDarkMode ? color.teal400 : color.teal600,
              color: isDarkMode ? color.teal300 : color.teal700,
              borderRadius: 3,
              textTransform: "none",
              borderWidth: 2,
              "&:hover": {
                borderColor: isDarkMode ? color.teal300 : color.teal700,
                backgroundColor: isDarkMode
                  ? `${color.teal400}10`
                  : `${color.teal600}10`,
                borderWidth: 2,
                transform: "translateY(-2px)",
              },
            }}
          >
            Take a Test
          </Button>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: isDarkMode ? color.gray500 : color.gray600,
          }}
        >
          Experience AI-powered language learning • Get instant feedback •
          Improve your skills
        </Typography>
      </Box>
    </Card>
  );
}
