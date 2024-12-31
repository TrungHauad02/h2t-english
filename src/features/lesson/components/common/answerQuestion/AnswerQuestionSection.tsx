import { Stack, Typography } from "@mui/material";
import { ListComponent } from "components/list";
import { aqService } from "features/lesson/services/aqService";
import { useParams } from "react-router-dom";
import WEQuestion from "./WEQuestion";
import { useState } from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import ActionButtons from "./ActionButtons";

export default function AnswerQuestion() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const { id, type } = useParams();
  const listAQ = aqService.getQuestionByLessonId(id ?? "", type ?? "");
  const [score, setScore] = useState<number | null>(null);

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
        data={listAQ}
        renderItem={(item) => <WEQuestion question={item} />}
      />
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        sx={{ pr: 2, pb: 1, mt: 2 }}
      >
        <ActionButtons
          isSubmit={!!score}
          onSubmit={() => setScore(10)}
          onReset={() => setScore(null)}
          onShowExplain={() => {
            alert("Show explain");
          }}
        />
      </Stack>
    </Stack>
  );
}
