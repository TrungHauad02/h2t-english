import { Box } from "@mui/material";
import { Vocabulary } from "interfaces";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

interface VocabularyCardProps {
  vocab: Vocabulary;
}

export default function VocabularyCard({ vocab }: VocabularyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Box
      sx={{
        p: 1.5,
        height: 320,
        perspective: 1000,
      }}
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={0.8}
        flipSpeedFrontToBack={0.8}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          onClick={handleFlip}
          sx={{
            height: "100%",
            width: "100%",
            transform: "rotateY(0deg)",
          }}
        >
          <FrontCard vocab={vocab} />
        </Box>
        <Box
          onClick={handleFlip}
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <BackCard vocab={vocab} />
        </Box>
      </ReactCardFlip>
    </Box>
  );
}
