import { Box, Typography, Stack, Paper } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import SchoolIcon from "@mui/icons-material/School";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CreateIcon from "@mui/icons-material/Create";
import ForumIcon from "@mui/icons-material/Forum";
import BookIcon from "@mui/icons-material/Book";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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

interface TestHeaderProps {
  type: TestTypeKey;
}

interface TestTypeInfo {
  title: string;
  icon: ReactNode;
  description: string;
  color: string;
}

export default function TestHeader({ type }: TestHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const testTypes: Record<string, TestTypeInfo> = {
    vocabularies: {
      title: "Vocabulary Tests",
      icon: <SpellcheckIcon sx={{ fontSize: 28 }} />,
      description: "Enhance your vocabulary skills",
      color: color.teal500,
    },
    grammars: {
      title: "Grammar Tests",
      icon: <SchoolIcon sx={{ fontSize: 28 }} />,
      description: "Practice grammatical structures",
      color: color.emerald500,
    },
    readings: {
      title: "Reading Tests",
      icon: <BookIcon sx={{ fontSize: 28 }} />,
      description: "Improve reading comprehension",
      color: color.green500,
    },
    listenings: {
      title: "Listening Tests",
      icon: <HeadphonesIcon sx={{ fontSize: 28 }} />,
      description: "Sharpen your listening skills",
      color: color.info,
    },
    speakings: {
      title: "Speaking Tests",
      icon: <ForumIcon sx={{ fontSize: 28 }} />,
      description: "Enhance verbal communication",
      color: color.warning,
    },
    writings: {
      title: "Writing Tests",
      icon: <CreateIcon sx={{ fontSize: 28 }} />,
      description: "Develop writing proficiency",
      color: color.teal600,
    },
    toeic: {
      title: "TOEIC Practice Tests",
      icon: <AssignmentIcon sx={{ fontSize: 28 }} />,
      description: "Prepare for TOEIC examination",
      color: color.emerald600,
    },
    mixings: {
      title: "Mixed Skill Tests",
      icon: <MenuBookIcon sx={{ fontSize: 28 }} />,
      description: "Comprehensive English practice",
      color: color.emerald500,
    },
  };

  const currentTest = testTypes[type] || testTypes.mixings;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        borderRadius: "1rem",
        overflow: "hidden",
        border: "none",
        margin: { xs: "1rem", md: "1rem 5% 2rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: { xs: 2, md: 3 },
          borderRadius: "1rem",
          background: isDarkMode 
            ? `linear-gradient(90deg, ${color.gray800} 0%, ${color.gray900} 100%)`
            : `linear-gradient(90deg, ${color.emerald50} 0%, ${color.teal50} 100%)`,
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 8px 24px ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)"}`,
          border: `1px solid ${isDarkMode ? color.gray700 : color.emerald100}`,
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${currentTest.color}20 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            left: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${currentTest.color}15 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: "1rem",
            backgroundColor: isDarkMode ? color.gray700 : color.white,
            boxShadow: `0 4px 12px ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
            mr: 3,
            color: currentTest.color,
            flexShrink: 0,
            zIndex: 1,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: `0 6px 16px ${isDarkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)"}`,
            },
          }}
        >
          {currentTest.icon}
        </Box>

        <Box sx={{ zIndex: 1, flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: isDarkMode ? color.emerald300 : color.emerald700,
              lineHeight: 1.3,
            }}
          >
            {currentTest.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
          >
            {currentTest.description}
          </Typography>
        </Box>

        {/* Right side icons */}
        <Stack 
          direction="column" 
          spacing={2} 
          sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            ml: 2
          }}
        >
          <Box 
            sx={{ 
              color: isDarkMode ? color.emerald400 : color.emerald600,
              opacity: 0.8
            }}
          >
            <BookIcon />
          </Box>
          <Box 
            sx={{ 
              color: isDarkMode ? color.emerald300 : color.emerald500,
              opacity: 0.8
            }}
          >
            <SchoolIcon />
          </Box>
          <Box 
            sx={{ 
              color: isDarkMode ? color.teal400 : color.teal600,
              opacity: 0.8
            }}
          >
            <HeadphonesIcon />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}