import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User, LevelsEnum } from "interfaces";
import { mockData } from "../services/mockData";

interface TeacherInfoCardProps {
  userId: number;
}

export default function TeacherInfoCard({ userId }: TeacherInfoCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const teacher: User = mockData.teacher;

  const cardBackgroundColor = isDarkMode ? color.gray700 : color.white;
  const cardBorderColor = isDarkMode ? color.gray600 : color.gray300;
  const textColor = isDarkMode ? color.gray100 : color.gray900;

  const getLevelColor = (level: LevelsEnum) => {
    switch (level) {
      case LevelsEnum.BACHELOR:
        return color.teal500;
      case LevelsEnum.MASTER:
        return color.emerald500;
      case LevelsEnum.DOCTOR:
        return color.green500;
      case LevelsEnum.PROFESSOR:
        return color.teal400;
      case LevelsEnum.STUDENT:
        return color.teal600;
      default:
        return color.gray500;
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: cardBackgroundColor,
        border: `1px solid ${cardBorderColor}`,
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Avatar
            src={teacher.avatar}
            alt={teacher.name}
            sx={{ width: 64, height: 64 }}
          />
          <Stack spacing={1}>
            <Typography
              variant="h6"
              sx={{ color: textColor, fontWeight: "bold" }}
            >
              {teacher.name}
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              Email: {teacher.email}
            </Typography>
            <Typography variant="body2" sx={{ color: textColor }}>
              Phone: {teacher.phoneNumber}
            </Typography>
            <Chip
              label={teacher.levelEnum}
              sx={{
                mt: 1,
                bgcolor: getLevelColor(teacher.levelEnum),
                color: isDarkMode ? color.gray900 : color.white,
                fontWeight: "bold",
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
