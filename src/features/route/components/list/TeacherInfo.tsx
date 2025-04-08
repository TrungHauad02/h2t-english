import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { LevelsEnum, RolesEnum, User } from "interfaces";
import useColor from "theme/useColor";

export default function TeacherInfo() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const mockTeacher: User = {
    id: 1,
    avatar: "/image.jpg",
    email: "teacher@example.com",
    levelEnum: LevelsEnum.BACHELOR,
    name: "John Doe",
    password: "",
    roleEnum: RolesEnum.TEACHER,
    status: true,
    phoneNumber: "123456789",
    dateOfBirth: new Date(),
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Avatar
        src={mockTeacher.avatar}
        alt={mockTeacher.name}
        sx={{
          width: 36,
          height: 36,
          border: `2px solid ${isDarkMode ? color.teal600 : color.teal400}`,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray400 : color.gray500,
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <SchoolIcon fontSize="inherit" /> Instructor
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: isDarkMode ? color.gray200 : color.gray800,
          }}
        >
          {mockTeacher.name}
        </Typography>
      </Box>
    </Stack>
  );
}
