import React from "react";
import { WETextField, WEDocxInput } from "components/input";
import { Grammar } from "interfaces";
import TipsInput from "./TipsInput";

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
  return (
    <>
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
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
      />
      <WEDocxInput
        label="Grammar File"
        value={newLesson.file}
        onChange={handleFileChange}
        required
      />

      <TipsInput
        tips={tips}
        handleTipChange={handleTipChange}
        addTip={addTip}
        removeTip={removeTip}
      />
    </>
  );
}
