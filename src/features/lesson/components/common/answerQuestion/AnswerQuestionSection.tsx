import { Stack, Typography } from "@mui/material";

export default function AnswerQuestion() {
  return (
    <Stack justifyContent={"center"} sx={{ mx: 4, mb: 2 }}>
      <Typography variant="h5" textAlign={"center"} fontWeight={"bold"}>
        Answer Question
      </Typography>
    </Stack>
  );
}
