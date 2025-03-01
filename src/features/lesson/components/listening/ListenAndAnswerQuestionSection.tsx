import { Stack } from "@mui/material";
import { AnswerQuestionSection } from "../common";

export default function ListenAndAnswerQuestionSection() {
  return (
    <Stack>
      <audio src={"/basic_listening.mp3"} controls style={{ width: "100%" }} />
      <AnswerQuestionSection />
    </Stack>
  );
}
