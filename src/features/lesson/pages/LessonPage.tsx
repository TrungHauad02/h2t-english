import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { lessonService } from "../services/lessonService";
import {
  Grammar,
  Listening,
  Reading,
  Speaking,
  Topic,
  Writing,
} from "interfaces";
import {
  TopicLesson,
  GrammarLesson,
  ReadingLesson,
  SpeakingLesson,
  ListeningLesson,
  WritingLesson,
  Introduction,
} from "../components";

export default function LessonPage() {
  const { type, id } = useParams();
  const lesson:
    | Topic
    | Grammar
    | Reading
    | Speaking
    | Listening
    | Writing
    | undefined = lessonService.getLessonById(type ?? "", Number(id) || 0);
  const siteInfo: SiteInfo = {
    bgUrl:
      "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_vocabulary.png?alt=media",
    title: lesson?.title || "",
  };
  const renderLesson = () => {
    if (!lesson) return null;

    switch (type) {
      case "topics":
        return <TopicLesson />;
      case "grammars":
        return <GrammarLesson lesson={lesson as Grammar} />;
      case "readings":
        return <ReadingLesson lesson={lesson as Reading} />;
      case "speakings":
        return <SpeakingLesson lesson={lesson as Speaking} />;
      case "listenings":
        return <ListeningLesson lesson={lesson as Listening} />;
      case "writings":
        return <WritingLesson lesson={lesson as Writing} />;
      default:
        return null;
    }
  };
  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={siteInfo} />
      <Introduction />
      {renderLesson()}
    </Box>
  );
}
