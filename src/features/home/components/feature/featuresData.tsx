import SchoolIcon from "@mui/icons-material/School";
import RouteIcon from "@mui/icons-material/Route";
import QuizIcon from "@mui/icons-material/Quiz";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export const features = [
  {
    title: "Interactive Lessons",
    description:
      "Engaging multimedia lessons covering all aspects of English language learning.",
    icon: <SchoolIcon fontSize="inherit" />,
    path: "/lesson/topics",
  },
  {
    title: "Learning Paths",
    description:
      "Structured learning routes tailored to your goals and current proficiency level.",
    icon: <RouteIcon fontSize="inherit" />,
    path: "/routes",
  },
  {
    title: "Practice Tests",
    description:
      "Comprehensive tests to assess your skills and track your progress over time.",
    icon: <QuizIcon fontSize="inherit" />,
    path: "/test/mixings",
  },
  {
    title: "Competitions",
    description:
      "Regular competitions to challenge yourself and compete with other learners.",
    icon: <EmojiEventsIcon fontSize="inherit" />,
    path: "/competition-test",
  },
  {
    title: "TOEIC Preparation",
    description:
      "Specialized courses and practice tests designed for TOEIC exam success.",
    icon: <GTranslateIcon fontSize="inherit" />,
    path: "/toeic",
  },
  {
    title: "AI Scoring & Feedback",
    description:
      "Get instant evaluations and personalized insights on your speaking and writing from our advanced AI.",
    icon: <SmartToyIcon fontSize="inherit" />,
    path: "/",
  },
];
