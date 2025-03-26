import React, { useState } from "react";
import { Box, Typography, Stack, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { TestPart, TestPartTypeEnum, SubmitTestWriting, TestWriting } from "interfaces";
import { testService } from "features/test/services/testServices";

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

interface HistoryWritingPartProps {
  testParts: TestPart[];
  startSerial: number;
  submitWritings: SubmitTestWriting[];
}

export default function HistoryWritingPart({
  testParts,
  startSerial,
  submitWritings,
}: HistoryWritingPartProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const writingParts = testParts.filter((part) => part.type === TestPartTypeEnum.WRITING);
  const testWritings: TestWriting[] = testService.getTestWritingsByIds(
    writingParts.flatMap((part) => part.questions as number[])
  );

  const currentWriting = testWritings[currentIndex];
  const currentSubmit = submitWritings.find((s) => s.testWriting_id === currentWriting?.id);

  return (
    <Box
      sx={{
        margin: { xs: "3%", sm: "5%" },
        p: { xs: 1.5, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StyledPaper elevation={3}>
        {/* Left: question info */}
        <Box
          sx={{
            width: { xs: "100%", sm: "45%" },
            paddingRight: { xs: 0, sm: "2rem" },
            mb: { xs: 2, sm: 0 },
          }}
        >
          {currentWriting ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Question {startSerial + currentIndex}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {currentWriting.topic}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>
                You should write at least {currentWriting.minWords} words
                {currentWriting.maxWords ? ` and at most ${currentWriting.maxWords} words.` : "."}
              </Typography>
            </>
          ) : (
            <Typography variant="body1">No topic available</Typography>
          )}
        </Box>

        {/* Right: user's answer */}
        <Box
          sx={{
            width: { xs: "100%", sm: "50%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            ✍️ Your essay:
          </Typography>
          <Box
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              bgcolor: "#f5f5f5",
              minHeight: "150px",
              whiteSpace: "pre-line",
              fontSize: { xs: "0.85rem", sm: "1rem" },
            }}
          >
            {currentSubmit?.content || "No submission available."}
          </Box>

          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic" }}>
            Score: <strong>{currentSubmit?.score ?? "N/A"}</strong>
          </Typography>
          {currentSubmit?.comment && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              💬 Comment: {currentSubmit.comment}
            </Typography>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%", mt: 3 }}
          >
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              sx={{
                bgcolor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : color.emerald400,
                color: "white",
                fontWeight: "bold",
                px: 2,
                "&:hover": {
                  bgcolor: currentIndex === 0 ? (isDarkMode ? "#757575" : "#BDBDBD") : color.emerald500,
                },
              }}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() =>
                setCurrentIndex((prev) => Math.min(prev + 1, testWritings.length - 1))
              }
              disabled={currentIndex === testWritings.length - 1}
              sx={{
                bgcolor:
                  currentIndex === testWritings.length - 1
                    ? isDarkMode
                      ? "#757575"
                      : "#BDBDBD"
                    : color.emerald400,
                color: "white",
                fontWeight: "bold",
                px: 2,
                "&:hover": {
                  bgcolor:
                    currentIndex === testWritings.length - 1
                      ? isDarkMode
                        ? "#757575"
                        : "#BDBDBD"
                      : color.emerald500,
                },
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