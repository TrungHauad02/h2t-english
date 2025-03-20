import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import ListCompetitionTest from "../components/listCompetitionTest/ListCompetitionTest";
export default function ListTestPage() {
    const siteInfo = {
        title: "Competition",
        bgUrl: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
      };
  return (
    <Box sx={{ mt: 8 }}>
        <MainPictureSection siteInfo={siteInfo} />
        <ListCompetitionTest />
    </Box>
  );

}
