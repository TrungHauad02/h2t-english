import React from "react";
import { Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { LevelsEnum } from "interfaces";

interface LevelBadgeProps {
  levelEnum?: LevelsEnum;
  levelColors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export default function LevelBadge({
  levelEnum,
  levelColors,
}: LevelBadgeProps) {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        color: levelColors.primary,
        fontWeight: "medium",
        textAlign: "center",
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      <FaceIcon
        sx={{
          fontSize: 16,
          verticalAlign: "text-top",
        }}
      />
      {levelEnum} Educator
    </Typography>
  );
}
