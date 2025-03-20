import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CompetitionTest from "../components/mixingAndCompetition/CompetitionTest";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { testService } from "../services/testServices";
import { CompetitionTest as CompetitionTestInterface } from "interfaces";

export default function CompetitionTestPage() {
  const { id } = useParams();
  const competitionTestId = Number(id);
 
  if (isNaN(competitionTestId)) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid Competition Test ID</Box>;
  }


  const competitionTest: CompetitionTestInterface | null = testService.getCompetitionTestById(competitionTestId);
  if (!competitionTest) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Competition Test not found.</Box>;
  }
  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
    title: competitionTest?.title || "Competition",
  };

  const competitionTestParts = testService.getTestPartsByIds(competitionTest.parts);

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={siteInfo} />
      <CompetitionTest competitionTestParts={competitionTestParts} />
    </Box>
  );
}
