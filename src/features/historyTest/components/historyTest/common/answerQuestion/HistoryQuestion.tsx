import { Box, Stack, Typography } from "@mui/material";
import { WERadioGroup } from "components/input";
import { WEExplain } from "components/display";
import { useDarkMode } from "hooks/useDarkMode";
import { Question, SubmitTestAnswer } from "interfaces";
import useColor from "theme/useColor";

interface HistoryQuestionProps {
  question: Question;
  index: number;
  isShowExplain?: boolean;
  submitAnswer?: SubmitTestAnswer;
}

export default function HistoryQuestion({
  question,
  index,
  isShowExplain = false,
  submitAnswer,
}: HistoryQuestionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const selectedAnswer = question.answers.find(
    (a) => a.id === submitAnswer?.answer_id
  );
  const isCorrect = selectedAnswer?.correct === true;

  const options = question.answers.map((item) => ({
    value: item.id,
    label: item.content,
  }));

  return (
    <Stack
      sx={{
        mt: 2,
        boxShadow: 3,
        borderRadius: 5,
        bgcolor: !submitAnswer
          ? isDarkMode
            ? color.gray800
            : color.gray100
          : isCorrect
          ? color.emerald100
          : color.red100,
        border: `1px solid ${
          !submitAnswer
            ? isDarkMode
              ? color.gray700
              : color.gray300
            : isCorrect
            ? color.emerald400
            : color.red400
        }`,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50% 0 0 0",
            width: 60,
            height: 40,
            mr: 2,
            bgcolor: color.emerald400,
            color: "white",
          }}
        >
          {index}
        </Box>{" "}
        {question.content}
      </Typography>

        <Stack
          sx={{
            width: "100%",
            my: 1,
            px: { xs: 1, sm: 2 },
            boxSizing: "border-box",
          }}
        >
          <WERadioGroup
            name={question.id}
            options={options}
            disabled={true}
          />
        </Stack>
     


      {isShowExplain && (
        <Box sx={{ px: 2, pb: 2 }}>
          <WEExplain text={question.explanation} />
        </Box>
      )}
    </Stack>
  );
}
