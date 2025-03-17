import { HistoryRecord } from "features/historyTest/type";
import useColor from "theme/useColor";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HeadsetIcon from "@mui/icons-material/Headset";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CreateIcon from "@mui/icons-material/Create";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export function calculateAverageScore(history: HistoryRecord[]): string {
  const validScores = history.filter((item) => item.score !== null);
  if (validScores.length === 0) return "N/A";

  const totalPercentage = validScores.reduce((sum, item) => {
    if (item.score === null) return sum;
    return sum + (item.score / item.maxScore) * 100;
  }, 0);

  return `${(totalPercentage / validScores.length).toFixed(1)}%`;
}

// Helper function to calculate highest score
export function calculateHighestScore(history: HistoryRecord[]): string {
  const validScores = history.filter((item) => item.score !== null);
  if (validScores.length === 0) return "N/A";

  const highestPercentage = Math.max(
    ...validScores.map((item) =>
      item.score !== null ? (item.score / item.maxScore) * 100 : 0
    )
  );

  return `${highestPercentage.toFixed(1)}%`;
}

// Helper function to get chip color by test type
export function getChipColorByType(
  type: string,
  isDarkMode: boolean,
  color: ReturnType<typeof useColor>
): string {
  switch (type) {
    case "READING":
      return isDarkMode ? color.teal800 : color.teal600;
    case "LISTENING":
      return isDarkMode ? color.emerald800 : color.emerald600;
    case "WRITING":
      return isDarkMode ? color.green800 : color.green600;
    case "SPEAKING":
      return isDarkMode ? color.green700 : color.green500;
    case "MIXING":
      return isDarkMode ? color.teal700 : color.teal500;
    case "TOEIC":
      return isDarkMode ? color.info : color.infoDarkMode;
    case "COMPETITION":
      return isDarkMode ? color.warning : color.warningDarkMode;
    default:
      return isDarkMode ? color.gray700 : color.gray500;
  }
}

export function getTestTypeIcon(type: string) {
  switch (type?.toUpperCase()) {
    case "READING":
      return <MenuBookIcon />;
    case "LISTENING":
      return <HeadsetIcon />;
    case "WRITING":
      return <CreateIcon />;
    case "SPEAKING":
      return <RecordVoiceOverIcon />;
    case "MIXING":
      return <ShuffleIcon />;
    case "TOEIC":
      return <SchoolIcon />;
    case "COMPETITION":
      return <EmojiEventsIcon />;
    default:
      return <AssignmentIcon />;
  }
}

export function getIconColorByType(
  type: string,
  isDarkMode: boolean,
  color: any
) {
  switch (type?.toUpperCase()) {
    case "READING":
      return isDarkMode ? color.teal300 : color.teal700;
    case "LISTENING":
      return isDarkMode ? color.emerald300 : color.emerald700;
    case "WRITING":
      return isDarkMode ? color.green300 : color.green700;
    case "SPEAKING":
      return isDarkMode ? color.emerald300 : color.emerald700;
    case "MIXING":
      return isDarkMode ? color.teal300 : color.teal700;
    case "TOEIC":
      return isDarkMode ? color.green300 : color.green700;
    case "COMPETITION":
      return isDarkMode ? color.emerald300 : color.emerald700;
    default:
      return isDarkMode ? color.gray300 : color.gray700;
  }
}

export function getScoreColor(
  score: number | null,
  maxScore: number,
  isDarkMode: boolean,
  color: any
) {
  if (score === null) return isDarkMode ? color.gray600 : color.gray500;

  const percentage = (score / maxScore) * 100;

  if (percentage >= 90) return isDarkMode ? color.green500 : color.green600;
  if (percentage >= 80) return isDarkMode ? color.emerald500 : color.emerald600;
  if (percentage >= 70) return isDarkMode ? color.teal500 : color.teal600;
  if (percentage >= 60) return isDarkMode ? color.teal600 : color.teal700;
  if (percentage >= 50) return isDarkMode ? color.emerald600 : color.emerald700;
  return isDarkMode ? color.red600 : color.red700;
}
