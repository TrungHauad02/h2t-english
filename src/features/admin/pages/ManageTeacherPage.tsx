import { Stack } from "@mui/material";
import ListTeachers from "../components/ListTeachers";
export default function ManageTeacherPage() {
  return (
    <Stack justifyContent={"center"} sx={{ p: 2 }}>
      <ListTeachers/>
    </Stack>
  );
}
