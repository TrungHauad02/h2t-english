import { Box } from "@mui/material";
import { CollapsibleSection } from "components/sections";
import { Listening } from "interfaces";
import PreparationSection from "../common/preparation/PreparationSection";
import ListenAndWriteAWordSection from "./listenAndWriteAWord/ListenAndWriteAWordSection";
import ListenAndAnswerQuestionSection from "./ListenAndAnswerQuestionSection";

export default function ListeningLesson({ lesson }: { lesson: Listening }) {
  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Listening Preparation">
        <PreparationSection preparationId={lesson.preparationId} />
      </CollapsibleSection>
      <CollapsibleSection text="Listen And Write">
        <ListenAndWriteAWordSection />
      </CollapsibleSection>
      <CollapsibleSection text="Listen And Answer Question">
        <ListenAndAnswerQuestionSection />
      </CollapsibleSection>
    </Box>
  );
}
