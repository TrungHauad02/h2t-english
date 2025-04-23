import { Box } from "@mui/material";
import { MainPictureSection } from "components/sections";
import { SiteInfo } from "components/sections/types";
import { useParams } from "react-router-dom";
import { lessonService } from "../services/lessonService";
import {
  Grammar,
  Lesson,
  Listening,
  Reading,
  Speaking,
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LessonPage() {
  const { type, id } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>();
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    bgUrl: "",
    title: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id && type) {
        try {
          const resData = await lessonService.findLessonById(
            parseInt(id),
            type
          );
          setLesson(resData.data);
          setSiteInfo({
            bgUrl: resData.data.image,
            title: resData.data.title,
          });
        } catch (error) {
          console.log(error);
          toast.error("Fail to fetch data");
        }
      }
    };
    fetchData();
  }, [id, type]);

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
