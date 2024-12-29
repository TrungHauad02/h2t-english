import { Vocabulary } from "interfaces";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

export const VocabCard = styled(Card)(({ theme }) => ({
  width: "250px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#f1f1f1",
  position: "relative",
  margin: "1rem auto",
  marginTop: "1rem",
}));

export default function VocabularyCard({ vocab }: { vocab: Vocabulary }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const onFlipClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <VocabCard onClick={onFlipClick}>
        <FrontCard vocab={vocab} />
      </VocabCard>
      <VocabCard onClick={onFlipClick}>
        <BackCard vocab={vocab} />
      </VocabCard>
    </ReactCardFlip>
  );
}
