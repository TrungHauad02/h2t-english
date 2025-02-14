import { Reading } from "interfaces";
import { Box } from "@mui/material";
import { CollapsibleSection } from "components/sections";
import PreparationSection from "../common/preparation/PreparationSection";

export default function ReadingLesson({ lesson }: { lesson: Reading }) {
  return (
    <Box sx={{ mx: 8, my: 4 }}>
      <CollapsibleSection text="Reading Preparation">
        <PreparationSection />
      </CollapsibleSection>
    </Box>
  );
}
