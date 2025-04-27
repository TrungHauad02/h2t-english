import { CollapsibleSection } from "components/sections";
import { Writing, WritingAnswer } from "interfaces";
import PreparationSection from "../common/preparation/PreparationSection";
import { Box } from "@mui/material";
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
import WritingTips from "./WritingTips";
import WritingParagraph from "./paragraph/WritingParagraph";
import WritingTopicSection from "./WritingTopicSection";
import { writingAnswerService } from "services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WritingLesson({ lesson }: { lesson: Writing }) {
  const [writingAnswer, setWritingAnswer] = useState<WritingAnswer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await writingAnswerService.findByWritingId(lesson.id);
        setWritingAnswer(resData.data);
      } catch (error) {
        console.error("Error fetching writing answer data");
        toast.error("Error fetching writing answer data");
      }
    };
    fetchData();
  }, [lesson.id]);

  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Writing Preparation">
        <PreparationSection preparationId={lesson.preparationId} />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Document">
        <WEDocumentViewer fileUrl={lesson.file} lineHeight="2" sx={{ my: 2 }} />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Tips">
        <WritingTips tips={lesson.tips} />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Paragraph">
        <WritingParagraph
          paragraph={lesson.paragraph}
          writingAnswers={writingAnswer}
        />
      </CollapsibleSection>
      <CollapsibleSection text="Writing Topic">
        <WritingTopicSection topic={lesson.topic} />
      </CollapsibleSection>
    </Box>
  );
}
