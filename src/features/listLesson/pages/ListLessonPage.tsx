import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import useListLessonPage from "../hooks/useListLessonPage";
import MainPicture from "../components/MainPicture";

export default function ListLessonPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "";
  const listLessonPage = useListLessonPage();
  return (
    <Box sx={{ mt: 8 }}>
      <MainPicture siteInfo={listLessonPage.getSiteInfo(type)} />
    </Box>
  );
}
