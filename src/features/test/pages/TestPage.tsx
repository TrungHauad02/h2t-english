import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { testService } from "../services/testServices";
import {
  Test,
} from "interfaces";
import {
  ReadingTest,
  SpeakingTest,
  WritingTest,
  ListeningTest,
  MixingTest,
} from "../components";

export default function TestPage() {
  const { type, id } = useParams();
  const test: Test | null = testService.getDataTestByTypeAndId(type ?? "", id ?? "");
  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media",
      title: test?.type
      ? test.type[0].toUpperCase() + test.type.slice(1).toLowerCase()
      : "",
  };
  const renderTest = () => {
    if (!test) {
      return <Box sx={{ textAlign: "center", mt: 4 }}>Test not found.</Box>;
    }

    switch (type?.toLowerCase()) {
      case "mixing":
        return <MixingTest test={test} />;
      case "readings":
        return <ReadingTest test={test} />;
      case "listenings":
        return <ListeningTest test={test} />;
      case "speakings":
        return <SpeakingTest test={test} />;
      case "writings":
        return <WritingTest test={test} />;
      default:
        return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid test type.</Box>;
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={siteInfo} />
      {renderTest()}
    </Box>
  );
}
