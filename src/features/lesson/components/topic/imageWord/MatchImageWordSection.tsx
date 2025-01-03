import { Box, Stack } from "@mui/material";
import useMatchImageWord from "./useMatchImageWord";
import WEActionButtons from "components/input/WEActionButtons";
import { WEConfirmDialog, WEScoreDialog } from "components/display";
import WordGrid from "./WordGrid";
import ImageGrid from "./ImageGrid";

export default function MatchImageWordSection() {
  const hooks = useMatchImageWord();

  return (
    <Stack direction={"column"}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mx: { xs: 2, sm: 4, md: 6, lg: 8 }, my: 2 }}
      >
        <WordGrid
          words={hooks.displayWord}
          selectedWord={hooks.selectedWord}
          onSelectWord={hooks.onSelectWord}
        />
        <ImageGrid
          vocabList={hooks.listVocab}
          onSelectImage={hooks.onSelectImage}
          isShowExplain={hooks.isShowExplain}
          getWordWithImage={hooks.getWordWithImage}
        />
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 8 }}>
        <WEActionButtons
          isSubmit={!!hooks.score}
          onSubmit={hooks.onShowConfirm}
          onReset={hooks.onReset}
          onShowExplain={hooks.onShowExplain}
          size="large"
        />
      </Box>
      {hooks.isShowConfirm && (
        <WEConfirmDialog
          isShowConfirm={hooks.isShowConfirm}
          onShowConfirm={hooks.onShowConfirm}
          onSubmit={hooks.onSubmit}
          numberAnswered={hooks.getNumberAnswered()}
          numberOfQuestions={hooks.listVocab.length}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={hooks.listVocab.length}
        />
      )}
    </Stack>
  );
}
