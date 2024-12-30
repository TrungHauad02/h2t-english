import { Stack, Typography } from "@mui/material";
import { ListComponent } from "components/list";
import { aqService } from "features/lesson/services/aqService";
import { useParams } from "react-router-dom";
import WEQuestion from "./WEQuestion";

export default function AnswerQuestion() {
  const { id, type } = useParams();
  const listAQ = aqService.getQuestionByLessonId(id ?? "", type ?? "");
  return (
    <Stack justifyContent={"center"} sx={{ mx: 4, mb: 2 }}>
      <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
        Answer Question
      </Typography>
      <ListComponent
        data={listAQ}
        renderItem={(item) => <WEQuestion question={item} />}
      />
    </Stack>
  );
}
