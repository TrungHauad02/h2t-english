import { Box } from "@mui/material";

import { Stack, Typography } from "@mui/material";
import { WEDialog } from "components/display";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface ScoreDialogProps {
  score: string | null;
  numberOfQuestions: number;
  isShowScoreDialog: boolean;
  onCloseScoreDialog: () => void;
}

export default function ScoreDialog({
  score,
  numberOfQuestions,
  isShowScoreDialog,
  onCloseScoreDialog,
}: ScoreDialogProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const text = {
    bad: "Don't give up! Practice makes perfect.",
    good: "Great job! Keep it up!",
    perfect: "You're a master! Keep up the good work.",
  };

  return (
    <WEDialog
      title="Your Score"
      open={isShowScoreDialog}
      onCancel={onCloseScoreDialog}
      onOk={onCloseScoreDialog}
    >
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color={isDarkMode ? color.teal400 : color.teal600}
        >
          Congratulations!
        </Typography>
        <Box
          sx={{
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: isDarkMode ? color.teal500 : color.teal700,
            color: isDarkMode ? color.black : color.white,
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {score}
        </Box>
        <Typography variant="body1" textAlign="center" color="text.secondary">
          {Number(score?.split("/")[0]) === numberOfQuestions
            ? text.perfect
            : Number(score?.split("/")[0]) > numberOfQuestions / 2
            ? text.good
            : text.bad}
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          You answered {score} correctly out of {numberOfQuestions} questions.
        </Typography>
      </Stack>
    </WEDialog>
  );
}
