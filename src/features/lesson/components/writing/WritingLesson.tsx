import { CollapsibleSection } from "components/sections";
import { Writing, WritingAnswer } from "interfaces";
import PreparationSection from "../common/preparation/PreparationSection";
import { Box } from "@mui/material";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import WritingTips from "./WritingTips";
import WritingParagraph from "./writingParagraph/WritingParagraph";
import { mockData } from "features/listLesson/services/mockData";

export default function WritingLesson({ lesson }: { lesson: Writing }) {
  const writingAnswer: WritingAnswer[] = mockData.writingAnswers;

  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Writing Preparation">
        <PreparationSection />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Document">
        <WEDocumentViewer fileUrl={lesson.file} lineHeight="2" sx={{ my: 2 }} />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Tips">
        <WritingTips tips={lesson.tips} />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Paragraph">
        <WritingParagraph
          paragraph={lesson.paragraphs}
          writingAnswer={writingAnswer.filter(
            (answer) => answer.writingId === 1
          )}
        />
      </CollapsibleSection>
    </Box>
  );
}
