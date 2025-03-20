import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TestWriting } from "interfaces";
import NavigationControls from "../common/NavigationControls";
import TimeRemaining from "../common/TimeRemaining";

const StyledPaper = styled(Paper)({
  padding: "2rem",
  borderRadius: "1rem",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

interface WritingTestProps {
  testWritings: TestWriting[];
}

export default function WritingTest({ testWritings }: WritingTestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [essay, setEssay] = useState<string>("");

  const wordCount = essay.trim().split(/\s+/).filter((word) => word !== "").length;

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted essay:", essay);
  };

  const handleNext = () => {
    if (currentIndex < testWritings.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setEssay(""); // Reset bài viết khi chuyển câu hỏi
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setEssay(""); // Reset bài viết khi chuyển câu hỏi
    }
  };

  const currentWriting = testWritings[currentIndex];

  return (
    <Box sx={{ margin: "5%", p: 3 }}>
      <TimeRemaining />
      <NavigationControls
        currentIndex={currentIndex}
        totalItems={testWritings.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      
      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <StyledPaper elevation={3}>
            {currentWriting ? (
              <>
                <Typography variant="body1" sx={{ mb: 2 , fontWeight: "bold"}}>
                  TASK {currentIndex + 1}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {currentWriting.topic}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  You should write <strong>at least {currentWriting.minWords} words</strong>
                  {currentWriting.maxWords ? ` and at most ${currentWriting.maxWords} words.` : "."}
                </Typography>
              </>
            ) : (
              <Typography variant="body1">No topic available</Typography>
            )}
          </StyledPaper>
        </Grid>

        {/* Cột nhập bài viết */}
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <StyledPaper elevation={3} sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={essay}
              onChange={handleEssayChange}
              placeholder="Type your essay here..."
              variant="outlined"
            />
            <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
              Word Count: {wordCount}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "8px",
                backgroundColor: "#00796B",
                color: "white",
                alignSelf: "flex-end",
                padding: "10px 20px",
              }}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}
