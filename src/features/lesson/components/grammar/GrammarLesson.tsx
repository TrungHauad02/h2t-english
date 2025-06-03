import { Box, Container } from "@mui/material";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import { Grammar } from "interfaces";
import { AnswerQuestionSection } from "../common";
import { CollapsibleSection } from "components/sections";
import GrammarDefinition from "./GrammarDefinition";

export default function GrammarLesson({ lesson }: { lesson: Grammar }) {
  return (
    <Box sx={{ mx: 8 }}>
      <CollapsibleSection text="Grammar Definition">
        <GrammarDefinition lesson={lesson} />
      </CollapsibleSection>
      <CollapsibleSection text="Grammar Document">
        <Container maxWidth="lg">
          <WEDocumentViewer
            fileUrl={lesson.file}
            lineHeight="2"
            sx={{ my: 2 }}
          />
        </Container>
      </CollapsibleSection>
      <CollapsibleSection text="Grammar Quiz">
        <AnswerQuestionSection />
      </CollapsibleSection>
    </Box>
  );
}
