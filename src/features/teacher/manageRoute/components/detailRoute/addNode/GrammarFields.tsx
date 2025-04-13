import React from "react";
import { WETextField, WEDocxInput } from "components/input";
import { Grammar } from "interfaces";
import TipsInput from "./TipsInput";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Stack } from "@mui/material";

interface GrammarFieldsProps {
  newLesson: Grammar;
  tips: string[];
  setNewLesson: React.Dispatch<React.SetStateAction<Grammar>>;
  handleTipChange: (index: number, value: string) => void;
  handleFileChange: (base64: string) => void;
  addTip: () => void;
  removeTip: (index: number) => void;
}

export default function GrammarFields({
  newLesson,
  tips,
  setNewLesson,
  handleTipChange,
  handleFileChange,
  addTip,
  removeTip,
}: GrammarFieldsProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Stack spacing={2}>
      <WETextField
        label="Definition"
        type="text"
        value={newLesson.definition}
        onChange={(e) =>
          setNewLesson((prev) => ({
            ...prev,
            definition: e.target.value,
          }))
        }
        name="definition"
        required
        placeholder="Enter grammar definition"
      />
      <WETextField
        label="Example"
        type="text"
        value={newLesson.example}
        onChange={(e) =>
          setNewLesson((prev) => ({
            ...prev,
            example: e.target.value,
          }))
        }
        name="example"
        required
        placeholder="Enter grammar example"
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
          label="Grammar File"
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
