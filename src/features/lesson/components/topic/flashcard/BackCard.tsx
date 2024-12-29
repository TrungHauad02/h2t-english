import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Vocabulary, WordType } from "interfaces";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import useColor from "theme/useColor";

export default function BackCard({ vocab }: { vocab: Vocabulary }) {
  const color = useColor();

  const handleSpeakerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    speechSynthesis.speak(utterance);
  };

  const getColorByWordType = (wordType: WordType) => {
    switch (wordType) {
      case WordType.NOUN:
        return color.emerald400;
      case WordType.VERB:
        return color.teal400;
      case WordType.ADJECTIVE:
        return color.green400;
      case WordType.ADVERB:
        return color.teal600;
      default:
        return color.gray400;
    }
  };

  return (
    <Stack
      justifyContent={"center"}
      sx={{ height: "100%", textAlign: "center", mx: 2 }}
      spacing={1}
    >
      <Typography variant="h6" textTransform={"capitalize"}>
        {vocab.word}
      </Typography>
      <Typography variant="subtitle1">{vocab.phonetic}</Typography>
      <Typography variant="subtitle1" textTransform={"capitalize"}>
        {vocab.meaning}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "left" }}>
        Example: {vocab.example}
      </Typography>
      <IconButton
        onClick={handleSpeakerClick}
        sx={{
          borderRadius: "0.5rem",
          p: 1,
          position: "absolute",
          top: 0,
          right: 2,
        }}
      >
        <VolumeUpIcon />
      </IconButton>
      <Box
        sx={{
          borderRadius: "0.5rem",
          p: "0.35rem",
          position: "absolute",
          top: 0,
          left: 8,
          bgcolor: getColorByWordType(vocab.wordType),
        }}
      >
        <Typography>{vocab.wordType}</Typography>
      </Box>
    </Stack>
  );
}
