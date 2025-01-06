import { Box, Typography } from "@mui/material";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import { Grammar } from "interfaces";

export default function GrammarLesson({ lesson }: { lesson: Grammar }) {
  return (
    <Box sx={{ mx: 6 }}>
      <Typography>{lesson.title}</Typography>
      <WEDocumentViewer fileUrl={"/document.docx"} lineHeight="2" />
    </Box>
  );
}
