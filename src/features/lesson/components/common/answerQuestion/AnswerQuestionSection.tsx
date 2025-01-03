import { Stack, Typography } from "@mui/material";
import { ListComponent } from "components/list";
import WEQuestion from "./WEQuestion";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useAnswerQuestion from "features/lesson/hooks/useAnswerQuestion";
import { WEConfirmDialog, WEScoreDialog } from "components/display";
import WEActionButtons from "components/input/WEActionButtons";

export default function AnswerQuestion() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const hooks = useAnswerQuestion();

  return (
    <Stack
      justifyContent={"center"}
      sx={{
        mx: 4,
        mb: 2,
        borderBottom: `1px solid ${isDarkMode ? color.gray400 : color.gray600}`,
      }}
    >
      <Typography variant="h5" textAlign={"center"} fontWeight={"bold"} my={2}>
        Answer Question
      </Typography>
      <ListComponent
        data={hooks.listAQ}
        renderItem={(item) => (
          <WEQuestion question={item} isShowExplain={hooks.isShowExplain} />
        )}
      />
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{ pr: 2, pb: 1, mt: 2 }}
      >
        <WEActionButtons
          isSubmit={!!hooks.score}
          onSubmit={hooks.onShowConfirm}
          onReset={hooks.onReset}
          onShowExplain={hooks.onShowExplain}
        />
      </Stack>
      {hooks.isShowConfirm && (
        <WEConfirmDialog
          isShowConfirm={hooks.isShowConfirm}
          onShowConfirm={hooks.onShowConfirm}
          onSubmit={hooks.onSubmit}
          numberAnswered={hooks.getNumberAnswered()}
          numberOfQuestions={hooks.listAQ.length}
        />
      )}
      {hooks.isShowScoreDialog && (
        <WEScoreDialog
          score={hooks.score}
          isShowScoreDialog={hooks.isShowScoreDialog}
          onCloseScoreDialog={hooks.onCloseScoreDialog}
          numberOfQuestions={hooks.listAQ.length}
        />
      )}
    </Stack>
  );
}
