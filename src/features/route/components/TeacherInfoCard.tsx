import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import { User, LevelsEnum } from "interfaces";
import { mockData } from "../services/mockData";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface TeacherInfoCardProps {
  userId: number;
}

export default function TeacherInfoCard({ userId }: TeacherInfoCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const teacher: User = mockData.teacher;

  const cardBackgroundColor = isDarkMode ? color.gray700 : color.white;
  const cardBorderColor = isDarkMode ? color.gray600 : color.gray200;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray700;

  const getLevelColor = (level: LevelsEnum) => {
    switch (level) {
      case LevelsEnum.BACHELOR:
        return {
          bg: color.teal400,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.MASTER:
        return {
          bg: color.emerald500,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.DOCTOR:
        return {
          bg: color.green500,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.PROFESSOR:
        return {
          bg: color.teal600,
          text: isDarkMode ? color.gray900 : color.white,
        };
      case LevelsEnum.STUDENT:
        return {
          bg: color.teal300,
          text: isDarkMode ? color.gray900 : color.white,
        };
      default:
        return {
          bg: color.gray500,
          text: isDarkMode ? color.gray900 : color.white,
        };
    }
  };

  const levelColors = getLevelColor(teacher.levelEnum);

  return (
    <Card
      sx={{
        bgcolor: cardBackgroundColor,
        border: `1px solid ${cardBorderColor}`,
        borderRadius: 4,
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 3,
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: `1px solid ${cardBorderColor}`,
        }}
      >
        <Avatar
          src={teacher.avatar}
          alt={teacher.name}
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: `4px solid ${isDarkMode ? color.teal700 : color.teal100}`,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />

        <Typography
          variant="h5"
          sx={{
            color: textColor,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {teacher.name}
        </Typography>

        <Chip
          label={teacher.levelEnum}
          sx={{
            mt: 1,
            bgcolor: levelColors.bg,
            color: levelColors.text,
            fontWeight: "bold",
            px: 1,
          }}
          icon={<SchoolIcon style={{ color: levelColors.text }} />}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.teal300 : color.teal600,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 1,
            mb: 2,
          }}
        >
          Teacher Information
        </Typography>

        <List dense disablePadding>
          <ListItem disableGutters sx={{ pb: 2 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <EmailIcon
                color={isDarkMode ? "info" : "primary"}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={teacher.email}
              primaryTypographyProps={{
                variant: "body2",
                color: secondaryTextColor,
              }}
              secondaryTypographyProps={{
                variant: "body1",
                color: textColor,
                fontWeight: "medium",
              }}
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PhoneIcon
                color={isDarkMode ? "info" : "primary"}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText
              primary="Phone"
              secondary={teacher.phoneNumber}
              primaryTypographyProps={{
                variant: "body2",
                color: secondaryTextColor,
              }}
              secondaryTypographyProps={{
                variant: "body1",
                color: textColor,
                fontWeight: "medium",
              }}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            {teacher.levelEnum === LevelsEnum.PROFESSOR
              ? "Experienced professor with expertise in teaching language skills."
              : teacher.levelEnum === LevelsEnum.DOCTOR
              ? "Doctoral educator with advanced teaching methodologies."
              : "Qualified instructor dedicated to student success."}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
