import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { User, LevelsEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ExpertiseSectionProps {
  teacher: User;
  levelColors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export default function ExpertiseSection({
  teacher,
  levelColors,
}: ExpertiseSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const getExperienceText = () => {
    switch (teacher.level) {
      case LevelsEnum.PROFESSOR:
        return "Experienced professor with expertise in teaching language skills.";
      case LevelsEnum.DOCTOR:
        return "Doctoral educator with advanced teaching methodologies.";
      case LevelsEnum.MASTER:
        return "Master's qualified educator with strong pedagogical foundation.";
      case LevelsEnum.BACHELOR:
        return "Bachelor's qualified instructor dedicated to student success.";
      default:
        return "Qualified instructor dedicated to student success.";
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "85%",
        p: 2,
        borderRadius: 2,
        backgroundColor: isDarkMode
          ? `${levelColors.primary}15`
          : `${levelColors.primary}10`,
        border: `1px solid ${
          isDarkMode ? levelColors.primary : levelColors.secondary
        }`,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <LocalLibraryIcon
          sx={{
            color: levelColors.primary,
            mr: 1,
            fontSize: 20,
          }}
        />
        <Typography
          variant="subtitle2"
          sx={{
            color: isDarkMode ? levelColors.secondary : levelColors.primary,
            fontWeight: "bold",
          }}
        >
          EXPERTISE
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: isDarkMode ? color.gray200 : color.gray800,
          fontStyle: "italic",
          pl: 3.5,
        }}
      >
        {getExperienceText()}
      </Typography>
    </Paper>
  );
}
