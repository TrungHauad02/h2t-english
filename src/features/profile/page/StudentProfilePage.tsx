import { Stack } from "@mui/material";
import StudentProfile from "../components/StudentProfile";

export default function StudentProfilePage() {
  return (
    <Stack justifyContent={"center"} sx={{ p: 2 }}>
      <StudentProfile/>
    </Stack>
  );
}
