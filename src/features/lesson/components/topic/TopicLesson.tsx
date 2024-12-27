import { Topic } from "interfaces";
import MatchImageWordSection from "./MatchImageWordSection";
import FlashcardSection from "./flashcard/FlashcardSection";
import { CollapsibleSection } from "components/sections";
import { Stack } from "@mui/material";

export default function TopicLesson({ lesson }: { lesson: Topic }) {
  return (
    <Stack sx={{ width: "100%" }}>
      <CollapsibleSection text="Match Image With Word">
        <MatchImageWordSection />
      </CollapsibleSection>

      <CollapsibleSection text="Flashcard">
        <FlashcardSection />
      </CollapsibleSection>
    </Stack>
  );
}
