import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Fade,
  Tooltip,
  alpha,
  Avatar,
  LinearProgress,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DiamondIcon from "@mui/icons-material/Diamond";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DoneAllIcon from "@mui/icons-material/DoneAll";

// Styled Components
const AchievementCard = styled(Paper)<{ glowcolor: string }>(
  ({ theme, glowcolor }) => ({
    padding: theme.spacing(3),
    borderRadius: "16px",
    border: `1px solid ${alpha(glowcolor, 0.3)}`,
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha("#000000", 0.4)
        : alpha("#ffffff", 0.9),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: `linear-gradient(90deg, ${alpha(
        glowcolor,
        0.6
      )}, ${glowcolor}, ${alpha(glowcolor, 0.6)})`,
    },
    "&:hover": {
      transform: "translateY(-8px) scale(1.02)",
      boxShadow: `0 12px 28px ${alpha(glowcolor, 0.25)}`,
      "& .achievement-icon": {
        transform: "scale(1.05)",
        boxShadow: `0 0 30px ${alpha(glowcolor, 0.5)}`,
      },
      "&:after": {
        opacity: 1,
      },
    },
    "&:after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `radial-gradient(circle at center, ${alpha(
        glowcolor,
        0.08
      )} 0%, transparent 70%)`,
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
  })
);

const AchievementIcon = styled(Avatar)<{ iconcolor: string }>(
  ({ theme, iconcolor }) => ({
    width: 70,
    height: 70,
    backgroundColor: alpha(iconcolor, 0.15),
    color: iconcolor,
    marginBottom: theme.spacing(2),
    border: `2px solid ${alpha(iconcolor, 0.5)}`,
    boxShadow: `0 0 20px ${alpha(iconcolor, 0.3)}`,
    transition: "all 0.3s ease",
    "& .MuiSvgIcon-root": {
      fontSize: 32,
    },
  })
);

const AchievementBadge = styled(Box)<{ color: string; unlocked: boolean }>(
  ({ theme, color, unlocked }) => ({
    position: "absolute",
    top: 10,
    left: 10,
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: unlocked ? color : alpha("#888888", 0.2),
    color: unlocked ? "#ffffff" : alpha("#888888", 0.7),
    fontSize: "0.8rem",
    fontWeight: "bold",
    boxShadow: unlocked ? `0 0 10px ${alpha(color, 0.5)}` : "none",
    transform: unlocked ? "none" : "scale(0.8)",
    zIndex: 2,
    border: `2px solid ${unlocked ? alpha(color, 0.8) : alpha("#888888", 0.3)}`,
    transition: "all 0.3s ease",
  })
);

interface BaseEntity {
  id: number;
  // Other base properties if any
}

export enum RouteNodeEnum {
  VOCABULARY = "VOCABULARY",
  GRAMMAR = "GRAMMAR",
  READING = "READING",
  LISTENING = "LISTENING",
  WRITING = "WRITING",
  SPEAKING = "SPEAKING",
  MIXING_TEST = "MIXING_TEST",
  READING_TEST = "READING_TEST",
  LISTENING_TEST = "LISTENING_TEST",
  SPEAKING_TEST = "SPEAKING_TEST",
  WRITING_TEST = "WRITING_TEST",
}

export interface RouteNode extends BaseEntity {
  serial: number;
  routeId: number;
  nodeId: number;
  type: RouteNodeEnum;
  title?: string;
  description?: string;
  image?: string;
}

interface AchievementsSectionProps {
  progress: number[];
  totalLessons: number;
  routeNodes: RouteNode[];
  grammarCompleted?: number;
  vocabularyCompleted?: number;
  testsPassed?: number;
  totalTests?: number;
}

// Interface for achievement objects
interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  progress: number;
  unlocked: boolean;
  ribbonText: string;
  difficulty: number; // Added for sorting (1: easiest, 10: hardest)
}

export default function AchievementsSection({
  progress,
  totalLessons,
  routeNodes,
  grammarCompleted = 0,
  vocabularyCompleted = 0,
  testsPassed = 0,
  totalTests = 0,
}: AchievementsSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Calculate progress percentage
  const progressPercentage =
    totalLessons > 0 ? Math.round((progress.length / totalLessons) * 100) : 0;

  // Count the number of each type of lesson available in routeNodes
  const grammarLessonsCount = routeNodes.filter(
    (node) => node.type === RouteNodeEnum.GRAMMAR
  ).length;

  const vocabularyLessonsCount = routeNodes.filter(
    (node) => node.type === RouteNodeEnum.VOCABULARY
  ).length;

  const testLessonsCount = routeNodes.filter((node) =>
    node.type.includes("TEST")
  ).length;

  // Generate achievements based on actual data
  const getAchievements = (): Achievement[] => {
    const achievements: Achievement[] = [];

    // First Step Achievement (Always first, easiest to achieve)
    if (progress.length >= 1) {
      achievements.push({
        id: "first-lesson",
        icon: <CheckCircleOutlineIcon />,
        title: "First Step",
        description: "Completed your first lesson",
        color: isDarkMode ? color.teal300 : color.teal500,
        progress: 100,
        unlocked: true,
        ribbonText: "Starter",
        difficulty: 1,
      });
    }

    // Progress-based achievements
    if (progressPercentage >= 25) {
      achievements.push({
        id: "beginner",
        icon: <WorkspacePremiumIcon />,
        title: "Beginner",
        description: "Completed 25% of your learning path",
        color: isDarkMode ? color.teal400 : color.teal600,
        progress: 100,
        unlocked: true,
        ribbonText: "Bronze",
        difficulty: 3,
      });
    } else {
      achievements.push({
        id: "beginner",
        icon: <WorkspacePremiumIcon />,
        title: "Beginner",
        description: "Complete 25% of your learning path",
        color: isDarkMode ? color.gray500 : color.gray500,
        progress: (progressPercentage / 25) * 100,
        unlocked: false,
        ribbonText: "Bronze",
        difficulty: 3,
      });
    }

    if (progressPercentage >= 50) {
      achievements.push({
        id: "intermediate",
        icon: <EmojiEventsIcon />,
        title: "Intermediate",
        description: "Completed 50% of your learning path",
        color: isDarkMode ? color.emerald400 : color.emerald600,
        progress: 100,
        unlocked: true,
        ribbonText: "Silver",
        difficulty: 5,
      });
    } else {
      achievements.push({
        id: "intermediate",
        icon: <EmojiEventsIcon />,
        title: "Intermediate",
        description: "Complete 50% of your learning path",
        color: isDarkMode ? color.gray500 : color.gray500,
        progress: (progressPercentage / 50) * 100,
        unlocked: false,
        ribbonText: "Silver",
        difficulty: 5,
      });
    }

    // Check if there are any grammar lessons before adding grammar achievement
    if (grammarLessonsCount > 0) {
      // Only add if there's at least one grammar lesson in the route
      // Set a reasonable target based on available grammar lessons (either 5 or all of them if fewer)
      const totalGrammarRequired = Math.min(5, grammarLessonsCount);

      if (grammarCompleted >= totalGrammarRequired) {
        achievements.push({
          id: "grammar-expert",
          icon: <AutoFixHighIcon />,
          title: "Grammar Expert",
          description: `Completed ${totalGrammarRequired} grammar lesson${
            totalGrammarRequired !== 1 ? "s" : ""
          }`,
          color: isDarkMode ? color.teal400 : color.teal600,
          progress: 100,
          unlocked: true,
          ribbonText: "Skill",
          difficulty: 4,
        });
      } else if (grammarCompleted > 0) {
        achievements.push({
          id: "grammar-expert",
          icon: <AutoFixHighIcon />,
          title: "Grammar Expert",
          description: `Complete ${totalGrammarRequired} grammar lesson${
            totalGrammarRequired !== 1 ? "s" : ""
          }`,
          color: isDarkMode ? color.gray500 : color.gray500,
          progress: (grammarCompleted / totalGrammarRequired) * 100,
          unlocked: false,
          ribbonText: "Skill",
          difficulty: 4,
        });
      }
    }

    // Check if there are any vocabulary lessons before adding vocabulary achievement
    if (vocabularyLessonsCount > 0) {
      // Only add if there's at least one vocabulary lesson in the route
      // Set a reasonable target based on available vocabulary lessons (either 5 or all of them if fewer)
      const totalVocabRequired = Math.min(5, vocabularyLessonsCount);

      if (vocabularyCompleted >= totalVocabRequired) {
        achievements.push({
          id: "vocab-builder",
          icon: <StarIcon />,
          title: "Vocabulary Builder",
          description: `Learned ${totalVocabRequired} vocabulary set${
            totalVocabRequired !== 1 ? "s" : ""
          }`,
          color: isDarkMode ? color.emerald400 : color.emerald600,
          progress: 100,
          unlocked: true,
          ribbonText: "Skill",
          difficulty: 4,
        });
      } else if (vocabularyCompleted > 0) {
        achievements.push({
          id: "vocab-builder",
          icon: <StarIcon />,
          title: "Vocabulary Builder",
          description: `Learn ${totalVocabRequired} vocabulary set${
            totalVocabRequired !== 1 ? "s" : ""
          }`,
          color: isDarkMode ? color.gray500 : color.gray500,
          progress: (vocabularyCompleted / totalVocabRequired) * 100,
          unlocked: false,
          ribbonText: "Skill",
          difficulty: 4,
        });
      }
    }

    // Advanced achievement (75%)
    if (progressPercentage >= 75) {
      achievements.push({
        id: "advanced",
        icon: <DiamondIcon />,
        title: "Advanced",
        description: "Completed 75% of your learning path",
        color: isDarkMode ? color.green400 : color.green600,
        progress: 100,
        unlocked: true,
        ribbonText: "Gold",
        difficulty: 7,
      });
    } else {
      achievements.push({
        id: "advanced",
        icon: <DiamondIcon />,
        title: "Advanced",
        description: "Complete 75% of your learning path",
        color: isDarkMode ? color.gray500 : color.gray500,
        progress: (progressPercentage / 75) * 100,
        unlocked: false,
        ribbonText: "Gold",
        difficulty: 7,
      });
    }

    // Committed Learner achievement (if there are enough lessons)
    // Only add this achievement if there are at least 3 lessons in total
    if (totalLessons >= 3) {
      // Set a reasonable target based on available lessons
      const committedTarget = Math.min(
        10,
        Math.max(3, Math.floor(totalLessons * 0.7))
      );

      if (progress.length >= committedTarget) {
        achievements.push({
          id: "committed",
          icon: <AssignmentTurnedInIcon />,
          title: "Committed Learner",
          description: `Completed ${committedTarget} lessons total`,
          color: isDarkMode ? color.teal400 : color.teal600,
          progress: 100,
          unlocked: true,
          ribbonText: "Habit",
          difficulty: 6,
        });
      } else if (progress.length > 0) {
        achievements.push({
          id: "committed",
          icon: <AssignmentTurnedInIcon />,
          title: "Committed Learner",
          description: `Complete ${committedTarget} lessons total`,
          color: isDarkMode ? color.gray500 : color.gray500,
          progress: (progress.length / committedTarget) * 100,
          unlocked: false,
          ribbonText: "Habit",
          difficulty: 6,
        });
      }
    }

    // Test-related achievements (only if tests exist in the route)
    if (testLessonsCount > 0) {
      // Set a reasonable target for tests passed
      const testTarget = Math.min(3, testLessonsCount);

      if (testsPassed >= testTarget) {
        achievements.push({
          id: "test-taker",
          icon: <VerifiedIcon />,
          title: "Test Champion",
          description: `Passed ${testTarget} skill test${
            testTarget !== 1 ? "s" : ""
          }`,
          color: isDarkMode ? color.green400 : color.green600,
          progress: 100,
          unlocked: true,
          ribbonText: "Elite",
          difficulty: 8,
        });
      } else if (testsPassed > 0) {
        achievements.push({
          id: "test-taker",
          icon: <VerifiedIcon />,
          title: "Test Champion",
          description: `Pass ${testTarget} skill test${
            testTarget !== 1 ? "s" : ""
          }`,
          color: isDarkMode ? color.gray500 : color.gray500,
          progress: (testsPassed / testTarget) * 100,
          unlocked: false,
          ribbonText: "Elite",
          difficulty: 8,
        });
      }

      // All Tests achievement (only if there are tests in the route)
      if (testsPassed === testLessonsCount && testLessonsCount > 0) {
        achievements.push({
          id: "all-tests",
          icon: <PlaylistAddCheckIcon />,
          title: "Test Master",
          description: "Passed all tests in this path",
          color: isDarkMode ? color.teal300 : color.teal600,
          progress: 100,
          unlocked: true,
          ribbonText: "Elite",
          difficulty: 9,
        });
      } else if (testLessonsCount > 0 && testsPassed > 0) {
        achievements.push({
          id: "all-tests",
          icon: <PlaylistAddCheckIcon />,
          title: "Test Master",
          description: "Pass all tests in this path",
          color: isDarkMode ? color.gray500 : color.gray500,
          progress: (testsPassed / testLessonsCount) * 100,
          unlocked: false,
          ribbonText: "Elite",
          difficulty: 9,
        });
      }
    }

    // Master (100%) achievement - the hardest to achieve
    if (progressPercentage === 100) {
      achievements.push({
        id: "master",
        icon: <DoneAllIcon />,
        title: "Master",
        description: "Completed the entire learning path",
        color: isDarkMode ? color.yellow400 : color.yellow600,
        progress: 100,
        unlocked: true,
        ribbonText: "Diamond",
        difficulty: 10,
      });
    } else {
      achievements.push({
        id: "master",
        icon: <DoneAllIcon />,
        title: "Master",
        description: "Complete the entire learning path",
        color: isDarkMode ? color.gray500 : color.gray500,
        progress: progressPercentage,
        unlocked: false,
        ribbonText: "Diamond",
        difficulty: 10,
      });
    }

    // Sort achievements by difficulty (easiest to hardest)
    return achievements.sort((a, b) => a.difficulty - b.difficulty);
  };

  return (
    <Grid container spacing={3}>
      {getAchievements().map((achievement, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={achievement.id}>
          <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
            <Box>
              <Tooltip
                title={
                  achievement.unlocked
                    ? `Achievement Unlocked: ${achievement.description}`
                    : `Progress: ${Math.round(achievement.progress)}%`
                }
                arrow
                placement="top"
              >
                <AchievementCard
                  elevation={achievement.unlocked ? 4 : 1}
                  glowcolor={achievement.color}
                >
                  {/* Ribbon badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 15,
                      right: -30,
                      transform: "rotate(45deg)",
                      backgroundColor: achievement.unlocked
                        ? achievement.color
                        : isDarkMode
                        ? color.gray600
                        : color.gray300,
                      color: "#fff",
                      padding: "2px 30px",
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                      boxShadow: achievement.unlocked
                        ? "0 2px 5px rgba(0,0,0,0.2)"
                        : "none",
                      letterSpacing: "0.5px",
                      opacity: achievement.unlocked ? 1 : 0.7,
                      zIndex: 1,
                    }}
                  >
                    {achievement.ribbonText}
                  </Box>

                  {/* Achievement status badge */}
                  <AchievementBadge
                    color={achievement.color}
                    unlocked={achievement.unlocked}
                  >
                    {achievement.unlocked ? "✓" : "!"}
                  </AchievementBadge>

                  <AchievementIcon
                    iconcolor={achievement.color}
                    className="achievement-icon"
                  >
                    {achievement.icon}
                  </AchievementIcon>

                  <Typography
                    variant="h6"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray800,
                      fontWeight: "bold",
                      mb: 0.5,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    {achievement.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? color.gray400 : color.gray600,
                      mb: 1.5,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {achievement.description}
                  </Typography>

                  {/* Progress bar for incomplete achievements */}
                  {!achievement.unlocked && (
                    <Box sx={{ width: "100%", mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={achievement.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: isDarkMode
                            ? color.gray700
                            : color.gray200,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: alpha(achievement.color, 0.8),
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDarkMode ? color.gray400 : color.gray600,
                          display: "block",
                          textAlign: "right",
                          mt: 0.5,
                          fontWeight: "medium",
                        }}
                      >
                        {Math.round(achievement.progress)}%
                      </Typography>
                    </Box>
                  )}
                </AchievementCard>
              </Tooltip>
            </Box>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
}
