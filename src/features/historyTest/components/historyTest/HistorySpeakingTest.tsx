import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Chip,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import useHistorySpeakingTest from "../../hooks/useHistorySpeakingTest";
import TestQuestionGridHistory from "./common/TestQuestionGridHistory";
import { TestPartTypeEnum } from "interfaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import InfoIcon from "@mui/icons-material/Info";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { SpeakingSection } from "./historyMixingAndCompetitionTest";
interface HistorySpeakingTestProps {
  testSpeakingIds: number[];
  submitTestId: number;
}

export default function HistorySpeakingTest({
  testSpeakingIds,
  submitTestId,
}: HistorySpeakingTestProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const [expandedAccordions, setExpandedAccordions] = useState<
    Record<string, boolean>
  >({});
  const [expandedExplanation, setExpandedExplanation] = useState<
    Record<number, boolean>
  >({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<
    Record<string, HTMLAudioElement>
  >({});

  const { loading, error, questions, recordings, speakingTests } =
    useHistorySpeakingTest(testSpeakingIds, submitTestId);

  useEffect(() => {
    if (selectedQuestionId) {
      setExpandedAccordions({
        [`panel-${selectedQuestionId}`]: true,
      });

      // Scroll to question
      const element = document.getElementById(`question-${selectedQuestionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedQuestionId]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioElements).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [audioElements]);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordions((prev) => ({
        ...prev,
        [panel]: isExpanded,
      }));

      // Pause any playing audio when closing the accordion
      if (
        !isExpanded &&
        playingAudio &&
        playingAudio.startsWith(`audio-${panel.replace("panel-", "")}`)
      ) {
        const audio = audioElements[playingAudio];
        if (audio) {
          audio.pause();
        }
        setPlayingAudio(null);
      }
    };

  const toggleExplanation = (questionId: number) => {
    setExpandedExplanation((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const playAudio = (audioUrl: string, questionId: number) => {
    // Pause any currently playing audio
    if (playingAudio && playingAudio !== `audio-${questionId}`) {
      const currentAudio = audioElements[playingAudio];
      if (currentAudio) {
        currentAudio.pause();
      }
    }

    // Create or get audio element
    let audioElement = audioElements[`audio-${questionId}`];

    if (!audioElement) {
      audioElement = new Audio(audioUrl);
      audioElement.addEventListener("ended", () => {
        setPlayingAudio(null);
      });

      setAudioElements((prev) => ({
        ...prev,
        [`audio-${questionId}`]: audioElement,
      }));
    }

    // Play or pause based on current state
    if (playingAudio === `audio-${questionId}`) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      audioElement.play();
      setPlayingAudio(`audio-${questionId}`);
    }
  };

  if (loading) {
    return (
      <Box
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: 2,
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.white,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
        }}
      >
        <CircularProgress
          size={40}
          thickness={4}
          sx={{ color: isDarkMode ? color.teal400 : color.teal600 }}
        />
      </Box>
    );
  }

  if (error || questions.length === 0) {
    return (
      <Box
        component={Paper}
        elevation={2}
        sx={{
          borderRadius: "1rem",
          p: 4,
          bgcolor: isDarkMode ? color.gray800 : color.white,
          textAlign: "center",
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          Cannot load speaking test history.
        </Alert>
        <Typography
          variant="body1"
          sx={{ color: isDarkMode ? color.gray300 : color.gray600 }}
        >
          Please check the test or submission ID.
        </Typography>
      </Box>
    );
  }

  // Group questions by speaking test
  const questionsByTest: Record<number, any[]> = {};
  questions.forEach((question) => {
    if (!questionsByTest[question.parentTestId]) {
      questionsByTest[question.parentTestId] = [];
    }
    questionsByTest[question.parentTestId].push(question);
  });

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? color.gray900 : color.gray50,
        borderRadius: "1rem",
        width: "100%",
        p: { xs: 2, sm: 3 },
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={9} lg={8}>
        <SpeakingSection 
            partId={0}
            testItemIds={testSpeakingIds}
            submitTestId={submitTestId}
            selectedQuestionId={selectedQuestionId}
            startSerial={1}
          />
        </Grid>

        <Grid item md={3} lg={4} sx={{ display: { xs: "none", md: "block" } }}>
          <TestQuestionGridHistory
            questionItems={questions.map((q) => ({
              serialNumber: q.serialNumber,
              questionId: q.id,
              partType: TestPartTypeEnum.SPEAKING,
              isAnswered: !!recordings[questions.indexOf(q)],
              isCorrect: true,
            }))}
            onQuestionSelect={(item) => setSelectedQuestionId(item.questionId)}
            isTitle
          />
        </Grid>

        {isSmallScreen && (
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TestQuestionGridHistory
              questionItems={questions.map((q) => ({
                serialNumber: q.serialNumber,
                questionId: q.id,
                partType: TestPartTypeEnum.SPEAKING,
                isAnswered: !!recordings[questions.indexOf(q)],
                isCorrect: true,
              }))}
              onQuestionSelect={(item) =>
                setSelectedQuestionId(item.questionId)
              }
              isTitle
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
