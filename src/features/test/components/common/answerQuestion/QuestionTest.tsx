import { Box, Stack, Typography } from "@mui/material";
import { WERadioGroup } from "components/input";
import { useDarkMode } from "hooks/useDarkMode";
import { Question } from "interfaces";
import useColor from "theme/useColor";

interface WEQuestionProps {
  question: Question;
  index: number;
}

export default function WEQuestion({ question, index }: WEQuestionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

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
        bgcolor: isDarkMode ? color.gray800 : color.gray100,
      }}
    >
      <Typography variant="subtitle1" fontWeight={"bold"}>
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
        <WERadioGroup name={question.id} options={options} />
      </Stack>

    </Stack>
  );
}
