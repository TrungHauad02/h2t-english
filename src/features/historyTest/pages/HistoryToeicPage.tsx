import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ToeicTest from "../components/historyTest/toeic/HistoryToeic";
import { testService } from "../../test/services/testServices";
import { historyTestService } from "../services/historyTestService";
import {
  Toeic,
  SubmitToeic,
  SubmitToeicAnswer,
  SubmitToeicPart1,
  SubmitToeicPart2
} from "interfaces";

export default function HistoryTestPage() {
  const { id } = useParams();
  const submitToeicId = Number(id);

  if (isNaN(submitToeicId)) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>Invalid Submit ID</Box>;
  }

  const submitToeic: SubmitToeic | undefined = historyTestService.getSubmitToeicById(submitToeicId);
  if (!submitToeic) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>No submit data found.</Box>;
  }

  const toeic: Toeic | null = testService.getToeicById(submitToeic.toeic_id);
  if (!toeic) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>No TOEIC test found.</Box>;
  }

  const submitToeicPart1: SubmitToeicPart1[] = historyTestService.getSubmitToeicPart1BySubmitId(submitToeicId);
  const submitToeicPart2: SubmitToeicPart2[] = historyTestService.getSubmitToeicPart2BySubmitId(submitToeicId);
  const submitToeicAnswers: SubmitToeicAnswer[] = historyTestService.getSubmitToeicAnswersBySubmitId(submitToeicId);

  return (
    <Box sx={{ width: "100vw" }}>
      <ToeicTest
        toeic={toeic}
        submitToeic={submitToeic}
        submitToeicPart1={submitToeicPart1}
        submitToeicPart2={submitToeicPart2}
        submitToeicAnswers={submitToeicAnswers}
      />
    </Box>
  );
}
