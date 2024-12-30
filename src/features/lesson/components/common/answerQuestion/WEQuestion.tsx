import { Box, Stack, Typography } from "@mui/material";
import WERadioGroup from "components/input/WERadioGroup";
import { Question } from "interfaces";
import useColor from "theme/useColor";

interface WEQuestionProps {
  question: Question;
}

export default function WEQuestion({ question }: WEQuestionProps) {
  const color = useColor();

  const options = question.answers.map((item) => ({
    value: item.id,
    label: item.content,
  }));

  return (
    <Stack sx={{ mt: 2, bgcolor: "#784242" }}>
      <Typography variant="subtitle1" fontWeight={"bold"}>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            width: 40,
            height: 40,
            mr: 2,
            bgcolor: color.emerald400,
          }}
        >
          {question.serial}
        </Box>{" "}
        {question.content}
      </Typography>
      <Stack direction={"row"}>
        <Stack sx={{ ml: { xs: 4, sm: 6 } }}>
          <WERadioGroup name={question.id} options={options} />
        </Stack>
      </Stack>
    </Stack>
  );
}
