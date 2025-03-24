import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { MainPictureSection } from "components/sections";
import useListTestPage from "../hooks/useListTestPage";
import ListTest from "../components/ListTest";
import TestOverviewSection from "../components/TestOverviewSection";

export default function ListTestPage() {
  const { type = "" } = useParams<{ type?: string }>();
  const listTestPage = useListTestPage();

  return (
    <Box sx={{ mt: 8 }}>
      <MainPictureSection siteInfo={listTestPage.getSiteInfo(type)} />
      <TestOverviewSection type={type as any} /> 
      <ListTest type={type} />
    </Box>
  );
}
