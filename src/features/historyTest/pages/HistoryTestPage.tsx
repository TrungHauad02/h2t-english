import { Stack } from "@mui/material";
import ListHistoryTest from "../components/ListHistoryTest";
import { MainPictureSection } from "components/sections";

export default function StudentProfilePage() {
  return (
    <Stack justifyContent={"center"} sx={{ p: 0, mt: 6 }}>
      <MainPictureSection siteInfo={{ bgUrl: "/banner_profile.png", title: "History test" }} />
      <ListHistoryTest />
    </Stack>
  );
}