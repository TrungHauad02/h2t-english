import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import useListLessonPage from "../hooks/useListLessonPage";
import { MainPictureSection } from "components/sections";
import QuoteSection from "../components/QuoteSection";
import ListLesson from "../components/ListLesson";

export default function ListLessonPage() {
  const { type } = useParams();
  const listLessonPage = useListLessonPage();

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={listLessonPage.getSiteInfo(type ?? "")} />
      <QuoteSection quote={listLessonPage.quote} />
      <ListLesson type={type ?? ""} />
    </Box>
  );
}
