import { Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WordsState } from "./type";
import WordItem from "../WordItem";

interface SentencesProps {
  state: WordsState;
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
  onSelectSentence: (index: number) => void;
}

export default function Sentences({
  state,
  selectedItem,
  onSelectItem,
  onSelectSentence,
}: SentencesProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (!state) return <></>;
  return (
    <Stack direction={"column"}>
      <Stack
        direction={"row"}
        sx={{
          gap: { xs: 1, md: 2 },
          p: 2,
          bgcolor: isDarkMode ? color.gray700 : color.gray300,
          borderRadius: 1,
          flexWrap: "wrap",
          minHeight: "52px",
        }}
      >
        {state.words.map((item, index) => (
          <WordItem
            item={item}
            key={index}
            onClick={() => onSelectItem(item)}
            highlight={item === selectedItem}
          />
        ))}
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          mt: 1,
          gap: { xs: 1, md: 2 },
          p: 2,
          borderRadius: 1,
          flexWrap: "wrap",
          minHeight: "52px",
        }}
      >
        {state.sentences.map((item, index) => (
          <Stack
            key={index}
            sx={{
              p: { xs: 1.5, md: 2 },
              minWidth: "30px",
              minHeight: "20px",
              bgcolor: isDarkMode ? color.gray900 : color.gray100,
              border: `4px solid ${isDarkMode ? color.gray400 : color.gray600}`,
              borderRadius: 2,
              boxShadow: 1,
            }}
            onClick={() => onSelectSentence(index)}
          >
            {item}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
