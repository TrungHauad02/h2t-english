import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TestPart, TestPartTypeEnum, TestWriting } from "interfaces";
import { testService } from "features/test/services/testServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledPaper = styled(Paper)({
  padding: "2rem",
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minHeight: "350px",
  width: "100%",
});

interface WritingPartProps {
  testParts: TestPart[];
  startSerial: number;
}

export default function WritingPart({ testParts, startSerial }: WritingPartProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [essay, setEssay] = useState<string>("");

  const writingParts = testParts.filter((part) => part.type === TestPartTypeEnum.WRITING);
  const testWritings: TestWriting[] = testService.getTestWritingsByIds(
    writingParts.flatMap((part) => part.questions as number[])
  );

  const wordCount = essay.trim().split(/\s+/).filter((word) => word !== "").length;

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  const handleNext = () => {
    if (currentIndex < testWritings.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setEssay("");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setEssay("");
    }
  };

  const currentWriting = testWritings[currentIndex];

  return (
    <Box sx={{ margin: "5%", p: 3, display: "flex", justifyContent: "center" }}>
      <StyledPaper elevation={3}>
        <Box sx={{ width: "45%", paddingRight: "2rem" }}>
          {currentWriting ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Question {startSerial}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{currentWriting.topic}</Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
                You should write <strong>at least {currentWriting.minWords} words</strong>
                {currentWriting.maxWords ? ` and at most ${currentWriting.maxWords} words.` : "."}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">No topic available</Typography>
          )}
        </Box>

        <Box sx={{ width: "50%" }}>
          <TextField
            fullWidth
            multiline
            rows={8}
            value={essay}
            onChange={handleEssayChange}
            placeholder="Type your essay here..."
            variant="outlined"
          />
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
            Words Count: <strong>{wordCount}</strong>
          </Typography>

          <Stack direction="row" justifyContent="space-between" sx={{ width: "100%", mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              sx={{
                backgroundColor: "#1B5E20",
                color: "white",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={currentIndex === testWritings.length - 1}
              sx={{
                backgroundColor: "#1B5E20",
                color: "white",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </StyledPaper>
    </Box>
  );
}
