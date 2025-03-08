import { Box, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { ListVocabulary, VocabularyHeader } from "./vocabulary";
import { Vocabulary } from "interfaces";
import { useEffect, useState } from "react";
import { vocabService } from "../../services/vocabService";
import { useParams } from "react-router-dom";

export default function VocabularySection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();

  const [data, setData] = useState<Vocabulary[]>([]);

  useEffect(() => {
    const vocabularyData = vocabService.getVocabByTopicId(
      id ? parseInt(id) : 0
    );
    setData(vocabularyData);
  }, [id]);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        my: 4,
      }}
    >
      <VocabularyHeader numberOfVocab={2} />
      <ListVocabulary data={data} setData={setData} />
    </Box>
  );
}
