import { Box, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Writing } from "interfaces";
import useColor from "theme/useColor";
import {
  AnswersList,
  ParagraphEditor,
  ParagraphPreview,
  useWritingParagraphSection,
} from "./paragraph";
import DescriptionIcon from "@mui/icons-material/Description";
import SectionHeader from "../common/SectionHeader";

interface WritingParagraphSectionProps {
  editData: Writing | null;
}

export default function WritingParagraphSection({
  editData,
}: WritingParagraphSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  const hooks = useWritingParagraphSection({
    editData,
  });

  const preview = hooks.renderParagraphPreview();

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        border: `1px solid ${borderColor}`,
      }}
    >
      <SectionHeader
        title="Writing Paragraphs"
        editText="Edit Paragraph"
        icon={<DescriptionIcon />}
        isEditMode={hooks.isEditMode}
        handleSaveChanges={hooks.handleSaveChanges}
        handleEditMode={hooks.handleEditMode}
        handleCancelEdit={hooks.handleCancelEdit}
      />

      {hooks.isEditMode ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          <ParagraphEditor
            paragraph={hooks.paragraph}
            setParagraph={hooks.setParagraph}
          />
          <ParagraphPreview isEditMode={hooks.isEditMode} preview={preview} />
          <AnswersList
            answers={hooks.answers}
            handleAddAnswer={hooks.handleAddAnswer}
            handleAnswerChange={hooks.handleAnswerChange}
            handleDeleteAnswer={hooks.handleDeleteAnswer}
          />
        </Box>
      ) : (
        <ParagraphPreview isEditMode={hooks.isEditMode} preview={preview} />
      )}
    </Box>
  );
}
