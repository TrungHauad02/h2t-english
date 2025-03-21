import { Stack } from "@mui/material";
import { ListComponent } from "components/list";
import { Question } from "interfaces";
import WEQuestion from "./QuestionTest";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface AnswerQuestionProps {
  questions: Question[];
  startSerial?: number; 
}

export default function AnswerQuestion({ questions, startSerial = 1 }: AnswerQuestionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const indexedQuestions = questions.map((item, idx) => ({ 
    question: item, 
    index: startSerial + idx 
  }));

  return (
    <Stack
      justifyContent={"center"}
      sx={{
        mx: 4,
        mb: 2,
        borderBottom: `1px solid ${isDarkMode ? color.gray400 : color.gray600}`,
        fontSize: {xs: "0.6rem", sm: "0.7rem", md: "1rem" },
    p: { xs: 1, sm: 1.5 },

      }}
    >
     <ListComponent
        data={indexedQuestions}
        renderItem={(item) => (
          <WEQuestion question={item.question} index={item.index}
           />
        )}
      />
    </Stack>
  );
}