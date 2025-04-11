import { Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import usePreparationMatchWordSentencesSection from "./usePreparationMatchWordSentencesSection";
import WordItem from "../WordItem";
import WEActionButtons from "components/input/WEActionButtons";
import { WEConfirmDialog, WEScoreDialog } from "components/display";

export default function PreparationMatchWordSentencesSection({
  questions,
}: {
  questions: number[];
}) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = usePreparationMatchWordSentencesSection(questions);

  return (
    <Stack sx={{ mt: 1 }}>
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Box
          sx={{
            py: 1,
            px: 2,
            bgcolor: isDarkMode ? color.green900 : color.green100,
            borderRadius: 2,
            boxShadow: 1,
            visibility: hooks.words.length === 0 ? "hidden" : "visible",
          }}
        >
          <Typography>
            {hooks.words.length} {hooks.words.length === 1 ? "item" : "items"}{" "}
            remaining
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        sx={{
          mt: 1,
          gap: { xs: 1, md: 2 },
          p: 2,
          bgcolor: isDarkMode ? color.gray700 : color.gray300,
          borderRadius: 1,
          flexWrap: "wrap",
          minHeight: "52px",
        }}
      >
        {hooks.words.map((item, index) => (
          <WordItem
            item={item}
            key={index}
            highlight={hooks.selectedItem === item}
            onClick={() => hooks.onSelectItem(item)}
          />
        ))}
      </Stack>
      <Stack spacing={2} sx={{ mt: 2, py: 1, px: 1.5 }}>
        {hooks.sentences.map((item, index) => (
          <Stack
            direction={{ xs: "column", md: "row" }}
            key={index}
            justifyContent={"space-between"}
            spacing={2}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography>{item.sentence}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                minWidth: "100px",
                height: "52px",
                overflowY: "hidden",
                border: `4px solid ${color.gray500}`,
                borderRadius: 3,
              }}
              onClick={() => hooks.onSelectSentence(item)}
            >
              {item.word && (
                <WordItem key={index} item={item.word} highlight={false} />
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
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
          numberOfQuestions={hooks.numberOfItems}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={hooks.numberOfItems}
        />
      )}
    </Stack>
  );
}
