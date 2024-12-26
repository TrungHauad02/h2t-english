import { Box } from "@mui/material";

import {  useParams } from "react-router-dom";
import { MainPictureSection } from "components/sections";
import useListTestPage from "../hooks/useListTestPage"
import ListTest from "../components/ListTest";
export default function ListTestPage() {
  const type = useParams<{ type?: string }>().type || "";

  const listTestPage = useListTestPage();
  return (
    <Box sx={{ mt: 8 }}>
        <MainPictureSection siteInfo={listTestPage.getSiteInfo(type)} />
        <ListTest type={type} />
    </Box>
  );

}
