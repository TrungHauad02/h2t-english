import { alpha, Box, Paper, Typography } from "@mui/material";
import { WEExplain } from "components/display";
import { WERadioGroup } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { LessonQuestion } from "interfaces";
import useColor from "theme/useColor";

interface WEQuestionProps {
  question: LessonQuestion;
  isShowExplain?: boolean;
}

export default function WEQuestion({
  question,
  isShowExplain = false,
}: WEQuestionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const options = question.answers.map((item) => ({
    value: item.id,
    label: item.content,
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 3,
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: isDarkMode ? alpha(color.gray800, 0.7) : color.gray50,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 8px 24px ${
            isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"
          }`,
        },
      }}
    >
      {/* Question header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${
            isDarkMode ? color.gray700 : color.gray200
          }`,
          bgcolor: isDarkMode
            ? alpha(color.gray700, 0.5)
            : alpha(color.gray100, 0.7),
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            width: 40,
            height: 40,
            mr: 2,
            bgcolor: isDarkMode ? color.emerald600 : color.emerald400,
            color: isDarkMode ? color.gray100 : color.white,
            fontWeight: "bold",
            flexShrink: 0,
          }}
        >
          {question.serial}
        </Box>

        <Typography
          variant={"h6"}
          fontWeight="600"
          sx={{
            color: isDarkMode ? color.gray100 : color.gray900,
            lineHeight: 1.4,
          }}
        >
          {question.content}
        </Typography>
      </Box>

      {/* Question content */}
      <Box sx={{ p: 3 }}>
        <WERadioGroup name={question.id} options={options} />

        {isShowExplain && (
          <Box sx={{ mt: 2 }}>
            <WEExplain text={question.explanation} />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
