import { Box } from "@mui/material";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import { Grammar } from "interfaces";
import { AnswerQuestionSection } from "../common";
import { CollapsibleSection } from "components/sections";

export default function GrammarLesson({ lesson }: { lesson: Grammar }) {
  return (
    <Box sx={{ mx: 8 }}>
      <CollapsibleSection text="Grammar Document">
        <WEDocumentViewer
          fileUrl={"/document.docx"}
          lineHeight="2"
          sx={{ my: 2 }}
        />
      </CollapsibleSection>
      <CollapsibleSection text="Grammar Quiz">
        <AnswerQuestionSection />
      </CollapsibleSection>
    </Box>
  );
}
