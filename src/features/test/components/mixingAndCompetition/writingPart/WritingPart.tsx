import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Paper, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TestPart, TestPartTypeEnum, TestWriting } from "interfaces";
import { testService } from "features/test/services/testServices";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "1rem",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minHeight: "350px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}));

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
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

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
    <Box sx={{ margin: { xs: "3%", sm: "5%" }, p: { xs: 1.5, sm: 3 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <StyledPaper elevation={3}>
        <Box sx={{ width: { xs: "100%", sm: "45%" }, paddingRight: { xs: 0, sm: "2rem" }, mb: { xs: 2, sm: 0 } }}>
          {currentWriting ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" } }}>
                Question {startSerial + currentIndex}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                {currentWriting.topic}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2, fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                You should write <strong>at least {currentWriting.minWords} words</strong>
                {currentWriting.maxWords ? ` and at most ${currentWriting.maxWords} words.` : "."}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">No topic available</Typography>
          )}
        </Box>

        <Box sx={{ width: { xs: "100%", sm: "50%" }, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <TextField fullWidth multiline rows={isMobile ? 6 : 8} value={essay} onChange={handleEssayChange} placeholder="Type your essay here..." variant="outlined" sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }} />
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
            Words Count: <strong>{wordCount}</strong>
          </Typography>
          <Stack direction={isMobile ? "row" : "row"} justifyContent="space-between" alignItems="center" sx={{ width: "100%", maxWidth: "600px", mt: 3, gap: { xs: 1.5, sm: 2 } }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            backgroundColor: "#1B5E20",
            color: "white",
            px: { xs: 2, sm: 3 },
            py: { xs: 0.8, sm: 1 },
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            fontWeight: "bold",
            minWidth: "120px",
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
            px: { xs: 2, sm: 3 },
            py: { xs: 0.8, sm: 1 },
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            fontWeight: "bold",
            minWidth: "120px",
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
