import { Box, Typography, Stack, Paper, Divider, alpha } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import SchoolIcon from "@mui/icons-material/School";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CreateIcon from "@mui/icons-material/Create";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/Book";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ReactNode } from "react";

export type TestTypeKey =
  | "vocabularies"
  | "grammars"
  | "readings"
  | "listenings"
  | "speakings"
  | "writings"
  | "mixings"
  | "toeic";

interface TestOverviewSectionProps {
  type: TestTypeKey;
}

interface TestItem {
  title: string;
  icon: ReactNode;
  description: string;
  color: string;
}

export  function TestOverviewSection({ type }: TestOverviewSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const allTests: Record<string, TestItem> = {
    vocabularies: {
      title: "Vocabulary",
      icon: <SpellcheckIcon sx={{ fontSize: 36 }} />,
      description: "Enhance your vocabulary and understanding of words.",
      color: color.teal600,
    },
    grammars: {
      title: "Grammar",
      icon: <SchoolIcon sx={{ fontSize: 36 }} />,
      description: "Practice grammatical structures and sentence patterns.",
      color: color.emerald600,
    },
    readings: {
      title: "Reading",
      icon: <BookIcon sx={{ fontSize: 36 }} />,
      description: "Understand written texts and answer questions.",
      color: color.green600,
    },
    listenings: {
      title: "Listening",
      icon: <HeadphonesIcon sx={{ fontSize: 36 }} />,
      description: "Listen to conversations and respond correctly.",
      color: color.info,
    },
    speakings: {
      title: "Speaking",
      icon: <ForumIcon sx={{ fontSize: 36 }} />,
      description: "Practice responding to prompts verbally.",
      color: color.warning,
    },
    writings: {
      title: "Writing",
      icon: <CreateIcon sx={{ fontSize: 36 }} />,
      description: "Write structured and well-argued essays.",
      color: color.teal700,
    },
    toeic: {
      title: "TOEIC",
      icon: <AssignmentIcon sx={{ fontSize: 36 }} />,
      description: "Complete the TOEIC test to assess your English proficiency.",
      color: color.emerald700,
    },
  };

  const displayTests =
    type === "mixings" ? Object.values(allTests) : [allTests[type]];

  const headerText =
    type === "mixings"
      ? "Overview of All Test Types"
      : `Overview of ${allTests[type]?.title} Tests`;

  const subText =
    type === "mixings"
      ? "This section includes a comprehensive collection of tests covering vocabulary, grammar, reading, listening, speaking, writing, and TOEIC preparation. Select your preferred test type to begin."
      : allTests[type]?.description;

  return (
    <Box
      sx={{
        margin: { xs: "1rem", md: "2rem 5%" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Gradient Element */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? `linear-gradient(135deg, ${alpha(color.gray900, 0.95)} 0%, ${alpha(
                color.gray800,
                0.95
              )} 100%)`
            : `linear-gradient(135deg, ${alpha(color.emerald50, 0.95)} 0%, ${alpha(
                color.teal50,
                0.95
              )} 100%)`,
          borderRadius: "1rem",
          zIndex: -1,
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: isDarkMode
            ? `radial-gradient(circle, ${alpha(color.teal700, 0.15)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(color.emerald500, 0.15)} 0%, transparent 70%)`,
          zIndex: -1,
        }}
      />
      
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: isDarkMode
            ? `radial-gradient(circle, ${alpha(color.emerald700, 0.15)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha(color.teal500, 0.15)} 0%, transparent 70%)`,
          zIndex: -1,
        }}
      />

      {/* Content */}
      <Paper
        elevation={0}
        sx={{
          padding: { xs: "1.5rem", md: "2.5rem" },
          borderRadius: "1rem",
          backgroundColor: "transparent",
          border: `1px solid ${
            isDarkMode ? alpha(color.emerald700, 0.3) : color.emerald200
          }`,
          boxShadow: `0 8px 32px ${
            isDarkMode ? color.gray900 + "40" : color.emerald900 + "10"
          }`,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? color.emerald300 : color.emerald800,
              mb: 1.5,
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "3px",
                backgroundColor: isDarkMode ? color.emerald500 : color.emerald400,
                borderRadius: "2px",
              },
            }}
          >
            {headerText}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray700,
              mt: 3,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {subText}
          </Typography>
        </Box>

        <Divider
          sx={{
            my: 3,
            borderColor: isDarkMode ? alpha(color.gray600, 0.5) : alpha(color.emerald200, 0.7),
          }}
        />

        {/* Test Type Cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          {displayTests.map((test, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                bgcolor: isDarkMode ? alpha(color.gray800, 0.7) : alpha(color.white, 0.85),
                p: 3,
                borderRadius: "16px",
                border: `1px solid ${
                  isDarkMode ? alpha(color.gray600, 0.5) : alpha(color.emerald100, 0.8)
                }`,
                minWidth: 200,
                maxWidth: 270,
                flex: "1 1 240px",
                textAlign: "center",
                boxShadow: `0 6px 20px ${
                  isDarkMode ? color.gray900 + "30" : color.emerald900 + "10"
                }`,
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 12px 28px ${
                    isDarkMode ? color.gray900 + "40" : color.emerald900 + "15"
                  }`,
                  "& .icon-container": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              {/* Background subtle pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.04,
                  backgroundImage: `radial-gradient(${test.color} 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                  zIndex: 0,
                }}
              />

              {/* Accent color circle */}
              <Box
                sx={{
                  position: "absolute",
                  top: -65,
                  right: -65,
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  background: alpha(test.color, isDarkMode ? 0.15 : 0.1),
                  zIndex: 0,
                }}
              />

              {/* Icon Container */}
              <Box
                className="icon-container"
                sx={{
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 70,
                  mx: "auto",
                  borderRadius: "50%",
                  color: isDarkMode ? alpha(test.color, 0.9) : test.color,
                  backgroundColor: isDarkMode 
                    ? alpha(test.color, 0.15) 
                    : alpha(test.color, 0.1),
                  transition: "transform 0.3s ease",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {test.icon}
              </Box>

              {/* Content */}
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1.5,
                    color: isDarkMode ? alpha(test.color, 0.9) : test.color,
                  }}
                >
                  {test.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: isDarkMode ? color.gray400 : color.gray700,
                    lineHeight: 1.6
                  }}
                >
                  {test.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}