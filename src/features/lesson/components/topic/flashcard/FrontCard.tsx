import { Box, Typography } from "@mui/material";
import { Vocabulary } from "interfaces";
import useColor from "theme/useColor";

export default function FrontCard({ vocab }: { vocab: Vocabulary }) {
  const color = useColor();
  return (
    <div style={{ position: "relative" }}>
      <img
        src={vocab.image}
        alt={vocab.word}
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          left: 0,
          py: 2,
          pt: 4,
          width: "250px",
          textAlign: "center",
          bgcolor: color.gray100 + "40",
          transition: "ease-in-out 1s",
          ":hover": {
            bottom: 0,
          },
        }}
      >
        <Typography>{vocab.word}</Typography>
      </Box>
    </div>
  );
}
