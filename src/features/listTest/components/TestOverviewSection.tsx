import { Box, Typography, Stack } from "@mui/material";
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
}

export default function TestOverviewSection({ type }: TestOverviewSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const allTests: Record<string, TestItem> = {
    vocabularies: {
      title: "Vocabulary",
      icon: <SpellcheckIcon sx={{ fontSize: 32 }} />,
      description: "Enhance your vocabulary and understanding of words.",
    },
    grammars: {
      title: "Grammar",
      icon: <SchoolIcon sx={{ fontSize: 32 }} />,
      description: "Practice grammatical structures and sentence patterns.",
    },
    readings: {
      title: "Reading",
      icon: <BookIcon sx={{ fontSize: 32 }} />,
      description: "Understand written texts and answer questions.",
    },
    listenings: {
      title: "Listening",
      icon: <HeadphonesIcon sx={{ fontSize: 32 }} />,
      description: "Listen to conversations and respond correctly.",
    },
    speakings: {
      title: "Speaking",
      icon: <ForumIcon sx={{ fontSize: 32 }} />,
      description: "Practice responding to prompts verbally.",
    },
    writings: {
      title: "Writing",
      icon: <CreateIcon sx={{ fontSize: 32 }} />,
      description: "Write structured and well-argued essays.",
    },
    toeic: {
      title: "TOEIC",
      icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
      description: "Complete the TOEIC test to assess your English proficiency.",
    },
  };

  const displayTests =
    type === "mixings" ? Object.values(allTests) : [allTests[type]];

  const headerText =
    type === "mixings"
      ? "Overview of All Test Types"
      : `Overview of ${allTests[type]?.title} Test`;

  const subText =
    type === "mixings"
      ? "This test includes a mixture of vocabulary, grammar, reading, listening, speaking, writing, and TOEIC questions."
      : allTests[type]?.description;

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.emerald50,
        padding: "2rem",
        borderRadius: "1rem",
        margin: "2rem 5%",
        border: `1px solid ${color.emerald300}`,
        boxShadow: `0 4px 12px ${color.emerald900}20`,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          color: color.emerald800,
          fontWeight: "bold",
          mb: 1,
        }}
      >
        {headerText}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: color.gray700,
          mb: 3,
          fontStyle: "italic",
        }}
      >
        {subText}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        useFlexGap
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {displayTests.map((test, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: isDarkMode ? color.gray800 : "#fff",
              p: 2,
              borderRadius: "12px",
              border: `1px solid ${isDarkMode ? color.gray600 : "#ddd"}`,
              minWidth: 180,
              maxWidth: 240,
              flex: "1 1 200px",
              textAlign: "center",
              boxShadow: `0 2px 6px ${color.gray700}22`,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <Box sx={{ mb: 1 }}>{test.icon}</Box>
            <Typography fontWeight="bold" sx={{ mb: 0.5 }}>
              {test.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {test.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}