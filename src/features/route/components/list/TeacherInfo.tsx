import SchoolIcon from "@mui/icons-material/School";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { User } from "interfaces";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userService } from "services";
import useColor from "theme/useColor";

export default function TeacherInfo({ teacherId }: { teacherId: number }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [teacher, setTeacher] = useState<User | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const resData = await userService.findOwnerById(teacherId);
        setTeacher(resData.data);
      } catch (error) {
        toast.error("Failed to fetch teacher data");
      }
    };
    fetchTeacher();
  }, []);

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Avatar
        src={teacher?.avatar}
        alt={teacher?.name}
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
          {teacher?.name}
        </Typography>
      </Box>
    </Stack>
  );
}
