import { Typography } from "@mui/material";
import { Vocabulary } from "interfaces";

export default function BackCard({ vocab }: { vocab: Vocabulary }) {
  return (
    <div>
      <Typography>{vocab.word}</Typography>
    </div>
  );
}
