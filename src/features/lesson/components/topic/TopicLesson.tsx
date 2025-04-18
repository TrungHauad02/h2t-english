import MatchImageWordSection from "./imageWord/MatchImageWordSection";
import FlashcardSection from "./flashcard/FlashcardSection";
import { CollapsibleSection } from "components/sections";
import { Stack } from "@mui/material";
import { AnswerQuestionSection } from "../common";

export default function TopicLesson() {
  return (
    <Stack sx={{ width: "100%" }}>
      <CollapsibleSection text="Match Image With Word">
        <MatchImageWordSection />
      </CollapsibleSection>

      <CollapsibleSection text="Flashcard">
        <FlashcardSection />
      </CollapsibleSection>
      <CollapsibleSection text="Answer Question">
        <AnswerQuestionSection />
      </CollapsibleSection>
    </Stack>
  );
}
