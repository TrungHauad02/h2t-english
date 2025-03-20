import {
  Box,
  Typography,
  Stack,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import StrengthsAreasToImproveSection from "../StrengthsAreasToImproveSection";
import { SpeakingConversation } from "interfaces";

interface ResultSectionProps {
  score: number;
  strengths: string[];
  areas_to_improve: string[];
  feedback: string;
  transcripts: Record<number, string>;
  data: SpeakingConversation[];
  setSubmitted: (submitted: boolean) => void;
  setResult: (result: any) => void;
  setUserRecordings: (userRecordings: Record<number, string>) => void;
}

export default function ResultSection({
  score,
  strengths,
  areas_to_improve,
  feedback,
  transcripts,
  data,
  setSubmitted,
  setResult,
  setUserRecordings,
}: ResultSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          color: isDarkMode ? color.teal200 : color.teal800,
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Speaking Assessment Results
      </Typography>

      {/* Score Display */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Paper
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: isDarkMode ? color.gray700 : color.white,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={score}
            size={100}
            thickness={5}
            sx={{
              color:
                score >= 80
                  ? color.emerald500
                  : score >= 60
                  ? color.warning
                  : color.red500,
            }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{
              position: "absolute",
              color: isDarkMode ? color.gray100 : color.gray900,
              fontWeight: "bold",
            }}
          >
            {score}
          </Typography>
        </Paper>
      </Box>

      {/* Feedback Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.emerald300 : color.emerald700,
            mb: 2,
            fontWeight: "bold",
          }}
        >
          Feedback
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          {feedback}
        </Typography>
      </Box>

      {/* Strengths and Areas to Improve */}
      <StrengthsAreasToImproveSection
        strengths={strengths}
        areas_to_improve={areas_to_improve}
      />

      {/* Transcripts Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? color.emerald300 : color.emerald700,
            mb: 2,
            fontWeight: "bold",
          }}
        >
          Your Speech Transcripts
        </Typography>
        <Stack spacing={2}>
          {Object.entries(transcripts).map(([id, transcript]) => {
            const line = data.find((item) => item.id === parseInt(id));
            return (
              <Paper
                key={id}
                sx={{
                  p: 2,
                  bgcolor: isDarkMode ? color.gray700 : color.white,
                  borderRadius: 2,
                  borderLeft: `4px solid ${
                    isDarkMode ? color.teal400 : color.teal600
                  }`,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: isDarkMode ? color.teal300 : color.teal700,
                    mb: 1,
                    fontWeight: "bold",
                  }}
                >
                  Line {line?.serial}: {line?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray300 : color.gray700,
                    fontStyle: "italic",
                    mb: 1,
                  }}
                >
                  Original: "{line?.content}"
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray200 : color.gray800,
                  }}
                >
                  Your speech: "{transcript}"
                </Typography>
              </Paper>
            );
          })}
        </Stack>
      </Box>

      {/* Try Again Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: isDarkMode ? color.teal600 : color.teal500,
            color: isDarkMode ? color.teal400 : color.teal600,
            px: 4,
            py: 1,
            fontSize: "1rem",
            "&:hover": {
              borderColor: isDarkMode ? color.teal500 : color.teal600,
              bgcolor: isDarkMode
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(20, 184, 166, 0.05)",
            },
          }}
          onClick={() => {
            setSubmitted(false);
            setResult(null);
            setUserRecordings({});
          }}
        >
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
