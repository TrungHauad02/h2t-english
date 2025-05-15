import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Slide,
  Grid,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { TestPartTypeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  LoadingSubmit,
  DialogHeader,
  OverallScore,
  SectionPerformance,
  CompetitionSummary,
  DialogFooter,
} from "./dialogComponents";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PartResult {
  type: TestPartTypeEnum;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  weightedScore?: number;
}

interface CompetitionResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  parts?: PartResult[];
}

interface SubmitCompetitionDialogProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  result: CompetitionResult | null;
  submitCompetitionId?: number;
  competitionId?: number;
}

export default function SubmitCompetitionDialog({
  open,
  onClose,
  isLoading,
  result,
  submitCompetitionId,
  competitionId,
}: SubmitCompetitionDialogProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={isLoading ? undefined : onClose}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          overflow: "hidden",
        },
      }}
    >
      {isLoading ? (
        <LoadingSubmit />
      ) : result ? (
        <>
          <DialogHeader score={result.score} />

          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 4 }}>
              <Grid container spacing={3}>
                {/* Overall Score */}
                <Grid item xs={12} md={5}>
                  <OverallScore
                    score={result.score}
                    correctAnswers={result.correctAnswers}
                    totalQuestions={result.totalQuestions}
                  />
                </Grid>

                {/* Section Details */}
                <Grid item xs={12} md={7}>
                  {result.parts && result.parts.length > 0 ? (
                    <SectionPerformance parts={result.parts} />
                  ) : (
                    <CompetitionSummary
                      totalQuestions={result.totalQuestions}
                      correctAnswers={result.correctAnswers}
                      score={result.score}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogFooter
            submitCompetitionId={submitCompetitionId}
            onClose={onClose}
          />
        </>
      ) : (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No result data available</Typography>
        </Box>
      )}
    </Dialog>
  );
}
