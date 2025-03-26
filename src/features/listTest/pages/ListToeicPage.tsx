import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import ListToeic from "../components/listToeic/ListToeic";
import TestOverviewSection from "../components/TestOverviewSection";

export default function LisToeicPage() {
    const siteInfo = {
        title: "Toeic",
        bgUrl: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
      };
  return (
    <Box sx={{ mt: 8 }}>
        <MainPictureSection siteInfo={siteInfo} />
        <TestOverviewSection type={"toeic"} /> 
        <ListToeic />
    </Box>
  );

}
