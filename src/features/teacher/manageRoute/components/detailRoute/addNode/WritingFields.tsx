import { WETextField, WEDocxInput } from "components/input";
import { Writing } from "interfaces";
import TipsInput from "./TipsInput";

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
  return (
    <>
      <WETextField
        label="Writing Topic"
        type="text"
        value={(newLesson as Writing).topic}
        onChange={(e) =>
          setNewLesson((prev) => ({
            ...(prev as Writing),
            topic: e.target.value,
          }))
        }
        name="topic"
        required
        placeholder="Enter writing topic"
        sx={{ mb: 2 }}
      />
      <WETextField
        label="Writing Paragraph"
        type="text"
        value={(newLesson as Writing).paragraph}
        onChange={(e) =>
          setNewLesson((prev) => ({
            ...(prev as Writing),
            paragraph: e.target.value,
          }))
        }
        name="paragraph"
        required
        placeholder="Enter writing paragraphs"
        sx={{ mb: 2 }}
      />
      <WEDocxInput
        label="Writing File"
        value={(newLesson as Writing).file}
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
