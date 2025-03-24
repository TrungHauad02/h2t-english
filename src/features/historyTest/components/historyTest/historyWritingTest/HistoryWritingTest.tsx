import React, { useState } from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TestWriting, SubmitTestWriting } from "interfaces";
import NavigationControls from "../common/NavigationControls";
import CommentTest from "../common/CommentTest";
import ScoreDisplay from "../common/ScoreDisplay";
const StyledPaper = styled(Paper)({
  padding: "2rem",
  borderRadius: "1rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

interface HistoryWritingTestProps {
  testWritings: TestWriting[];
  submitWritings: SubmitTestWriting[];
}

export default function HistoryWritingTest({
  testWritings,
  submitWritings,
}: HistoryWritingTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWriting = testWritings[currentIndex];
  const submitted = submitWritings[currentIndex];

  const handleNext = () => {
    if (currentIndex < testWritings.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box sx={{ margin: "5%", p: 3 }}>
        <ScoreDisplay score={42} total={50} />
     
      <CommentTest
        text={
          "Please review your answer carefully and consider improving your grammar, structure, or coherence where needed."
        }
      />
      <NavigationControls
        currentIndex={currentIndex}
        totalItems={testWritings.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledPaper elevation={3}>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
              TASK {currentIndex + 1}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {currentWriting?.topic || "No topic available"}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              You should write{" "}
              <strong>at least {currentWriting?.minWords} words</strong>
              {currentWriting?.maxWords
                ? ` and at most ${currentWriting.maxWords} words.`
                : "."}
            </Typography>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <StyledPaper elevation={3}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
              Your Answer:
            </Typography>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                minHeight: 150,
                whiteSpace: "pre-wrap",
                backgroundColor: "#f9f9f9",
              }}
            >
              {submitted?.content || "No answer submitted."}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
            Score: <strong>{submitted?.score ?? "Not graded yet"}</strong>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
            <Typography sx={{ fontSize: "1.2rem", mr: 1 }}>💬</Typography>
            <Typography variant="body2">
              <strong>Comment:</strong>{" "}
              {submitted?.comment || "No comment available."}
            </Typography>
          </Box>

          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}
