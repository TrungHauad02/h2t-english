import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

import { User, LevelsEnum } from "interfaces";
import { mockData } from "../services/mockData";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  AvatarSection,
  ContactInfoSection,
  ExpertiseSection,
  LevelBadge,
} from "./teacherInfo";

interface TeacherInfoCardProps {
  userId: number;
}

export default function TeacherInfoCard({ userId }: TeacherInfoCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const teacher: User = mockData.teacher;

  const getLevelColor = (level: LevelsEnum) => {
    switch (level) {
      case LevelsEnum.BACHELOR:
        return {
          primary: color.teal400,
          secondary: color.teal200,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.MASTER:
        return {
          primary: color.emerald500,
          secondary: color.emerald200,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.DOCTOR:
        return {
          primary: color.green500,
          secondary: color.green200,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.PROFESSOR:
        return {
          primary: color.teal600,
          secondary: color.teal300,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.STUDENT:
        return {
          primary: color.teal300,
          secondary: color.teal100,
          text: isDarkMode ? color.gray900 : color.white,
        };
      default:
        return {
          primary: color.gray500,
          secondary: color.gray300,
          text: isDarkMode ? color.gray900 : color.white,
        };
    }
  };

  const levelColors = getLevelColor(teacher.levelEnum);

  return (
    <Card
      elevation={8}
      sx={{
        position: "relative",
        overflow: "visible",
        borderRadius: 4,
        height: "100%",
        bgcolor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 16,
        },
      }}
    >
      <AvatarSection teacher={teacher} levelColors={levelColors} />

      <CardContent
        sx={{
          pt: 8,
          px: 3,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            fontWeight: "bold",
            mb: 1,
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          {teacher.name}
        </Typography>

        <LevelBadge levelEnum={teacher.levelEnum} levelColors={levelColors} />

        <Divider
          sx={{
            width: "80%",
            my: 2,
            "&::before, &::after": {
              borderColor: isDarkMode ? color.gray600 : color.gray300,
            },
          }}
        >
          <Chip
            label="CONTACT"
            size="small"
            sx={{
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
              color: isDarkMode ? color.gray200 : color.gray800,
              border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
              fontSize: "0.7rem",
              height: 24,
            }}
          />
        </Divider>

        <ContactInfoSection teacher={teacher} isMobile={isMobile} />

        <ExpertiseSection teacher={teacher} levelColors={levelColors} />

        <Tooltip title="Teacher ID" placement="bottom">
          <Chip
            icon={<BadgeIcon />}
            label={`ID: TCH-${userId.toString().padStart(5, "0")}`}
            size="small"
            sx={{
              mt: 1,
              bgcolor: isDarkMode ? color.gray700 : color.gray100,
              color: isDarkMode ? color.gray300 : color.gray700,
              border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
              "& .MuiChip-icon": {
                color: isDarkMode ? color.gray400 : color.gray500,
              },
            }}
          />
        </Tooltip>
      </CardContent>
    </Card>
  );
}
