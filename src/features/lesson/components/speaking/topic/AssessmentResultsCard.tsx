import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RefreshIcon from "@mui/icons-material/Refresh";
import ScoreSection from "./ScoreSection";
import StrengthsAreasToImproveSection from "./StrengthsAreasToImproveSection";

interface AssessmentResultsCardProps {
  score: number;
  feedback: string;
  strengths?: string[];
  areas_to_improve?: string[];
  transcript: string;
  resetRecording: () => void;
}

export default function AssessmentResultsCard({
  score,
  feedback,
  strengths,
  areas_to_improve,
  transcript,
  resetRecording,
}: AssessmentResultsCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Card
      sx={{
        mb: 3,
        bgcolor: isDarkMode ? color.gray700 : color.white,
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          {/** Score Section */}
          <Grid item xs={12} sm={12} md={3}>
            <ScoreSection score={score} />
          </Grid>

          {/* Feedback */}
          <Grid item xs={12} sm={12} md={9} sx={{ mt: { xs: 2, md: 0 } }}>
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

            {/* Strengths and Areas to Improve */}
            <StrengthsAreasToImproveSection
              strengths={strengths}
              areas_to_improve={areas_to_improve}
            />

            <Divider sx={{ my: 3 }} />

            {/* Transcript Section */}
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? color.teal300 : color.teal700,
                mb: 2,
                fontWeight: "bold",
              }}
            >
              Your Transcript
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: isDarkMode ? color.gray600 : color.gray100,
                borderRadius: 2,
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  lineHeight: 1.6,
                }}
              >
                {transcript}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={resetRecording}
            sx={{
              borderColor: isDarkMode ? color.gray400 : color.gray500,
              color: isDarkMode ? color.gray300 : color.gray700,
              "&:hover": {
                borderColor: isDarkMode ? color.gray300 : color.gray600,
                bgcolor: isDarkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Try Again
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
