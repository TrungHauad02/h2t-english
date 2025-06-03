import { Stack } from "@mui/material";
import { AnswerQuestionSection } from "../common";

export default function ListenAndAnswerQuestionSection({
  audio,
}: {
  audio: string;
}) {
  return (
    <Stack>
      <audio src={audio} controls style={{ width: "100%" }} />
      <AnswerQuestionSection />
    </Stack>
  );
}
