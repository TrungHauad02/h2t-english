import { Stack } from "@mui/material";
import ListStudents from "../components/ListStudents";

export default function ManageStudentPage() {
  return (
    <Stack justifyContent={"center"} sx={{ p: 2 }}>
      <ListStudents/>
    </Stack>
  );
}
