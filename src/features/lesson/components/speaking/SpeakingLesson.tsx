import { Box } from "@mui/material";
import { CollapsibleSection } from "components/sections";
import { Speaking } from "interfaces";
import PreparationSection from "../common/preparation/PreparationSection";
import ConversationSection from "./conversation/ConversationSection";
import SpeakingTopicSection from "./SpeakingTopicSection";

export default function SpeakingLesson({ lesson }: { lesson: Speaking }) {
  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Speaking Preparation">
        <PreparationSection />
      </CollapsibleSection>
      <CollapsibleSection text="Speaking Conversation">
        <ConversationSection />
      </CollapsibleSection>
      <CollapsibleSection text="Speaking Topic">
        <SpeakingTopicSection />
      </CollapsibleSection>
    </Box>
  );
}
