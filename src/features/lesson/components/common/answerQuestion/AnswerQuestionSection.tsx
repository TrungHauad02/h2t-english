import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { ListComponent } from "components/list";
import WEQuestion from "./WEQuestion";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useAnswerQuestion from "features/lesson/hooks/useAnswerQuestion";
import { WEConfirmDialog, WEScoreDialog } from "components/display";
import WEActionButtons from "components/input/WEActionButtons";
import QuizInstructions from "./QuizInstructions";
import QuestionProgress from "./QuestionProgress";
import ScoreDisplay from "./ScoreDisplay";

export default function AnswerQuestion() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hooks = useAnswerQuestion();

  return (
    <Stack
      justifyContent="center"
      sx={{
        mx: { xs: 1, sm: 2, md: 4 },
        mb: 4,
        pb: 4,
        borderBottom: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
      }}
    >
      {/* Instructions */}
      <QuizInstructions />
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          mb: 3,
          position: "relative",
          pb: 2,
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            borderRadius: "2px",
            bgcolor: isDarkMode ? color.emerald500 : color.emerald400,
          },
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          sx={{ color: isDarkMode ? color.gray100 : color.gray900 }}
        >
          Answer Questions
        </Typography>
      </Box>

      {/* Progress and Score Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <QuestionProgress
            answeredCount={hooks.getNumberAnswered()}
            totalQuestions={hooks.listAQ.length}
          />
        </Box>

        {hooks.score !== null && (
          <Box sx={{ flex: 1 }}>
            <ScoreDisplay
              score={hooks.calculateScore()}
              totalQuestions={hooks.listAQ.length}
            />
          </Box>
        )}
      </Box>

      {/* Questions List */}
      <ListComponent
        data={hooks.listAQ}
        renderItem={(item, index) => (
          <WEQuestion
            question={item}
            isShowExplain={hooks.isShowExplain}
            index={index ? index : 0}
          />
        )}
      />

      {/* Action Buttons */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          pr: { xs: 1, sm: 2 },
          pt: 2,
          mt: 3,
          borderTop: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
        }}
      >
        <WEActionButtons
          isSubmit={!!hooks.score}
          onSubmit={hooks.onShowConfirm}
          onReset={hooks.onReset}
          onShowExplain={hooks.onShowExplain}
        />
      </Stack>

      {/* Dialogs */}
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
