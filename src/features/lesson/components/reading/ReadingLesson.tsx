import { Reading } from "interfaces";
import { Box, Container } from "@mui/material";
import { CollapsibleSection } from "components/sections";
import PreparationSection from "../common/preparation/PreparationSection";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import { AnswerQuestionSection } from "../common";

export default function ReadingLesson({ lesson }: { lesson: Reading }) {
  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Reading Preparation">
        <PreparationSection preparationId={lesson.preparationId} />
      </CollapsibleSection>
      <CollapsibleSection text="Reading Document">
        <Container maxWidth="lg">
          <WEDocumentViewer
            fileUrl={lesson.file}
            lineHeight="2"
            sx={{ my: 2 }}
          />
        </Container>
      </CollapsibleSection>
      <CollapsibleSection text="Reading Quiz">
        <AnswerQuestionSection />
      </CollapsibleSection>
    </Box>
  );
}
