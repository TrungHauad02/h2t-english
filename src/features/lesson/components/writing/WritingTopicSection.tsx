import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import SendIcon from "@mui/icons-material/Send";
import { scoreWritingService } from "services";
import { AssessmentResultsCard } from "../speaking/topic";
import LoadingWritingSubmit from "./LoadingWritingSubmit";
import { useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { completeRouteNode } from "utils/updateProcess";
import { RouteNodeEnum } from "interfaces";

interface WritingTopicSectionProps {
  topic: string;
}

interface AssessmentResult {
  score: string;
  strengths: string[];
  areas_to_improve: string[];
  feedback: string;
}

const PASSING_SCORE = 50;

export default function WritingTopicSection({
  topic,
}: WritingTopicSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [essay, setEssay] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const { id } = useParams();
  const { userId } = useAuth();

  const wordCount = essay
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEssay(e.target.value);
  };

  const handleSubmit = async () => {
    if (!essay.trim()) return;

    setShowLoading(true);
    setIsSubmitting(true);
    try {
      const response = await scoreWritingService.scoreWriting(essay, topic);
      if (response.status === "SUCCESS") {
        setResult(response.data);
        if (Number(response.data.score) >= PASSING_SCORE) {
          onCompleteRouteNode();
        }
      }
    } catch (error) {
      console.error("Error submitting essay:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetEssay = () => {
    setEssay("");
    setResult(null);
  };

  const onCompleteRouteNode = async () => {
    if (!id || !userId) return;

    try {
      completeRouteNode(Number(id), Number(userId), RouteNodeEnum.WRITING);
    } catch (error) {
      console.error("Error completing route node:", error);
    }
  };

  const backgroundColor = isDarkMode ? color.gray800 : color.gray50;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isDarkMode ? color.gray700 : color.gray300;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "auto",
        p: { xs: 2, md: 4 },
        backgroundColor: backgroundColor,
        borderRadius: 3,
        boxShadow: isDarkMode
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 8px 24px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      {/* Tiêu đề */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: accentColor,
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "3px",
            backgroundColor: accentColor,
            borderRadius: "2px",
          },
        }}
      >
        Writing Exercise
      </Typography>

      {/* Đề bài */}
      <Box
        sx={{
          mt: 4,
          mb: 3,
          p: 2.5,
          backgroundColor: isDarkMode ? color.gray700 : color.white,
          borderRadius: 2,
          borderLeft: `4px solid ${isDarkMode ? color.teal400 : color.teal500}`,
        }}
      >
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray600,
            mb: 1,
            fontWeight: 500,
          }}
        >
          Write a paragraph about the following topic:
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: isDarkMode ? color.teal200 : color.teal700,
            fontWeight: "bold",
          }}
        >
          {topic}
        </Typography>
      </Box>

      {!result ? (
        <>
          {/* Ô nhập bài viết */}
          <TextField
            fullWidth
            multiline
            rows={8}
            value={essay}
            onChange={handleEssayChange}
            placeholder="Write your paragraph here..."
            variant="outlined"
            sx={{
              backgroundColor: isDarkMode ? color.gray700 : color.white,
              borderRadius: "12px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: borderColor,
                },
                "&:hover fieldset": {
                  borderColor: isDarkMode ? color.teal300 : color.teal500,
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDarkMode ? color.teal300 : color.teal500,
                  borderWidth: "2px",
                },
              },
              "& .MuiInputBase-input": {
                color: textColor,
                lineHeight: 1.7,
                fontSize: "1.05rem",
              },
            }}
          />

          {/* Đếm số lượng từ và nút Submit */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                fontStyle: "italic",
              }}
            >
              Word count: {wordCount}
            </Typography>

            <Button
              variant="contained"
              disabled={isSubmitting || essay.trim() === ""}
              onClick={handleSubmit}
              endIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              sx={{
                bgcolor: isDarkMode ? color.teal600 : color.btnSubmitBg,
                color: color.white,
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: isDarkMode ? color.teal500 : color.btnSubmitHoverBg,
                },
                "&:disabled": {
                  bgcolor: isDarkMode ? color.gray600 : color.gray300,
                  color: isDarkMode ? color.gray400 : color.gray500,
                },
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <AssessmentResultsCard
          score={parseInt(result.score)}
          feedback={result.feedback}
          strengths={result.strengths}
          areas_to_improve={result.areas_to_improve}
          transcript={essay}
          resetRecording={resetEssay}
        />
      )}
      {showLoading && (
        <LoadingWritingSubmit
          isLoading={isSubmitting}
          onComplete={() => setShowLoading(false)}
        />
      )}
    </Box>
  );
}
