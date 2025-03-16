import { Stack } from "@mui/material";
import StudentProfile from "../components/StudentProfile";
import { MainPictureSection } from "components/sections";

export default function StudentProfilePage() {
  return (
    <Stack justifyContent={"center"} sx={{ p: 2, mt: 6 }}>
      <MainPictureSection siteInfo={{ bgUrl: "/banner_profile.png", title: "Student Profile" }} />
      <StudentProfile />
    </Stack>
  );
}
