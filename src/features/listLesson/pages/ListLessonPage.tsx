import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import useListLessonPage from "../hooks/useListLessonPage";
import { MainPictureSection } from "components/sections";
import QuoteSection from "../components/QuoteSection";
import ListLesson from "../components/ListLesson";

export default function ListLessonPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "";
  const listLessonPage = useListLessonPage();

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={listLessonPage.getSiteInfo(type)} />
      <QuoteSection quote={listLessonPage.quote} />
      <ListLesson type={type} />
    </Box>
  );
}
