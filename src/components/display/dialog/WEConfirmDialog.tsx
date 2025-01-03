import { HelpOutline } from "@mui/icons-material";
import { Box, Typography, Stack } from "@mui/material";
import { WEDialog } from "components/display";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WEConfirmDialogProps {
  isShowConfirm: boolean;
  onShowConfirm: () => void;
  onSubmit: () => void;
  numberAnswered: number;
  numberOfQuestions: number;
}

export default function WEConfirmDialog({
  numberAnswered,
  numberOfQuestions,
  isShowConfirm,
  onShowConfirm,
  onSubmit,
}: WEConfirmDialogProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const text = {
    bad: "You have answered only a few questions. Consider reviewing them before submitting.",
    good: "You’ve done well! Most questions are answered. Ready to submit?",
    perfect:
      "Great job! You’ve answered all the questions. Submit your answers now.",
  };

  const getFeedbackText = () => {
    const ratio = numberAnswered / numberOfQuestions;
    if (ratio === 1) {
      return text.perfect;
    } else if (ratio >= 0.5) {
      return text.good;
    } else {
      return text.bad;
    }
  };

  return (
    <WEDialog
      title="Confirmation"
      open={isShowConfirm}
      onCancel={onShowConfirm}
      onOk={onSubmit}
    >
      <Stack spacing={2} alignItems="center" sx={{ textAlign: "center" }}>
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: isDarkMode ? color.warningDarkMode : color.warning,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HelpOutline sx={{ fontSize: "2.5rem", color: color.gray600 }} />
        </Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          color={isDarkMode ? color.warningDarkMode : color.warning}
        >
          Are you sure?
        </Typography>
        <Typography variant="body1" color="text.primary">
          {getFeedbackText()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You have answered {numberAnswered} out of {numberOfQuestions}{" "}
          questions.
        </Typography>
      </Stack>
    </WEDialog>
  );
}
