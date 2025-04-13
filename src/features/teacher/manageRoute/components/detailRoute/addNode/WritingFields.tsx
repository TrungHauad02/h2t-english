import React from "react";
import { Stack } from "@mui/material";
import { WETextField, WEDocxInput } from "components/input";
import { Writing } from "interfaces";
import TipsInput from "./TipsInput";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface WritingFieldsProps {
  newLesson: Writing;
  tips: string[];
  setNewLesson: React.Dispatch<React.SetStateAction<Writing>>;
  handleTipChange: (index: number, value: string) => void;
  handleFileChange: (base64: string) => void;
  addTip: () => void;
  removeTip: (index: number) => void;
}

export default function WritingFields({
  newLesson,
  tips,
  setNewLesson,
  handleTipChange,
  handleFileChange,
  addTip,
  removeTip,
}: WritingFieldsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack spacing={2}>
      <WETextField
        label="Writing Topic"
        type="text"
        value={newLesson.topic}
        onChange={(e) =>
          setNewLesson((prev) => ({
            ...prev,
            topic: e.target.value,
          }))
        }
        name="topic"
        required
        placeholder="Enter writing topic"
      />
      <WETextField
        label="Writing Paragraph"
        type="text"
        value={newLesson.paragraph}
        onChange={(e) =>
          setNewLesson((prev) => ({
            ...prev,
            paragraph: e.target.value,
          }))
        }
        name="paragraph"
        required
        placeholder="Enter writing paragraphs"
      />
      <Stack
        sx={{
          border: `1px solid ${isDarkMode ? color.gray500 : color.gray300}`,
          borderRadius: 1,
          p: 2,
          bgcolor: isDarkMode ? color.gray600 : color.white,
        }}
      >
        <WEDocxInput
          label="Writing File"
          value={newLesson.file}
          onChange={handleFileChange}
          required
        />
      </Stack>
      <TipsInput
        tips={tips}
        handleTipChange={handleTipChange}
        addTip={addTip}
        removeTip={removeTip}
      />
    </Stack>
  );
}
