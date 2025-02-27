import { Reading } from "interfaces";
import { Box } from "@mui/material";
import { CollapsibleSection } from "components/sections";
import PreparationSection from "../common/preparation/PreparationSection";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import { AnswerQuestionSection } from "../common";

export default function ReadingLesson({ lesson }: { lesson: Reading }) {
  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Reading Preparation">
        <PreparationSection />
      </CollapsibleSection>
      <CollapsibleSection text="Reading Document">
        <WEDocumentViewer
          fileUrl={"/document.docx"}
          lineHeight="2"
          sx={{ my: 2 }}
        />
      </CollapsibleSection>
      <CollapsibleSection text="Reading Quiz">
        <AnswerQuestionSection />
      </CollapsibleSection>
    </Box>
  );
}
