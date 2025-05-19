import React from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AchievementsSection from "./AchievementsSection";

interface AchievementsTabProps {
  route: Route;
  process: number[];
}

export default function AchievementsTab({
  route,
  process,
}: AchievementsTabProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Count completed grammar and vocabulary lessons for achievements
  const grammarCompleted = route.routeNodes.filter(
    (node) => node.type === "GRAMMAR" && process.includes(node.id)
  ).length;

  const vocabularyCompleted = route.routeNodes.filter(
    (node) => node.type === "VOCABULARY" && process.includes(node.id)
  ).length;

  // Count total tests and completed tests
  const totalTests = route.routeNodes.filter((node) =>
    node.type.includes("TEST")
  ).length;

  const testsPassed = route.routeNodes.filter(
    (node) => node.type.includes("TEST") && process.includes(node.id)
  ).length;

  return (
    <Paper
      elevation={isDarkMode ? 2 : 1}
      sx={{
        overflow: "hidden",
        borderRadius: "16px",
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        position: "relative",
      }}
    >
      {/* Decorative top gradient line */}
      <Box
        sx={{
          height: "4px",
          background: `linear-gradient(90deg, 
            ${isDarkMode ? color.teal500 : color.teal400}, 
            ${isDarkMode ? color.emerald400 : color.emerald500}
          )`,
        }}
      />

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <EmojiEventsIcon
            sx={{ color: isDarkMode ? color.teal300 : color.teal500 }}
          />
          Your Achievements
        </Typography>

        <Divider
          sx={{
            mb: 3,
            borderColor: isDarkMode ? color.gray700 : color.gray200,
          }}
        />

        {/* Pass all required props to the AchievementsSection */}
        <AchievementsSection
          progress={process}
          totalLessons={route.routeNodes.length}
          routeNodes={route.routeNodes}
          grammarCompleted={grammarCompleted}
          vocabularyCompleted={vocabularyCompleted}
          testsPassed={testsPassed}
          totalTests={totalTests}
        />
      </Box>
    </Paper>
  );
}
