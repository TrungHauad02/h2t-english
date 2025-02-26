import { Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import usePreparationMakeSentences from "./usePreparationMakeSentences";
import Sentences from "./Sentences";
import { WEButton } from "components/input";
import WEActionButtons from "components/input/WEActionButtons";
import { WEConfirmDialog, WEScoreDialog } from "components/display";
import { CircleRounded } from "@mui/icons-material";

export default function PreparationMakeSentencesSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const hooks = usePreparationMakeSentences();

  return (
    <Stack sx={{ mt: 1 }}>
      {/** Classify Items */}
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <Box
          sx={{
            py: 1,
            px: 2,
            bgcolor: isDarkMode ? color.green900 : color.green100,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography>
            {hooks.getItemRemain()}{" "}
            {hooks.getItemRemain() === 1 ? "item" : "items"} remaining
          </Typography>
        </Box>
      </Stack>
      <Stack sx={{ mt: 1 }}>
        <Sentences
          state={hooks.words[hooks.curIndex]}
          onSelectItem={hooks.onSelectItem}
          onSelectSentence={hooks.onSelectSentence}
          selectedItem={hooks.selectedItem}
        />
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"flex-end"}
          spacing={2}
        >
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            {hooks.words.map((item, index) => (
              <Box key={index}>
                <CircleRounded
                  sx={{
                    color:
                      index === hooks.curIndex ? color.teal500 : color.gray500,
                  }}
                />
              </Box>
            ))}
          </Stack>
          <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
            <WEButton
              sx={{
                width: { xs: "50px", md: "100px" },
                bgcolor: color.teal500,
                color: color.white,
              }}
              onClick={hooks.onPrev}
            >
              Prev
            </WEButton>
            <WEButton
              sx={{
                width: { xs: "50px", md: "100px" },
                bgcolor: color.teal500,
                color: color.white,
              }}
              onClick={hooks.onNext}
            >
              Next
            </WEButton>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
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
          numberAnswered={hooks.numberOfQuestions - hooks.getItemRemain()}
          numberOfQuestions={hooks.numberOfQuestions}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={hooks.numberOfQuestions}
        />
      )}
    </Stack>
  );
}
