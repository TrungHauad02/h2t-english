import { useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { mockData } from "./conversation/mockData";
import PersonIcon from "@mui/icons-material/Person";
import {
  CharacterSelection,
  ConversationInstructions,
  ConversationTimeline,
  ResultSection,
} from "./conversation";

export default function ConversationSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [userRecordings, setUserRecordings] = useState<Record<number, string>>(
    {}
  );
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    transcripts: Record<number, string>;
    feedback: string;
    strengths: string[];
    areas_to_improve: string[];
  } | null>(null);
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});
  // Thêm các ref mới cho chức năng ghi âm
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { initialData, mockEvaluationData } = mockData;

  const characters = Array.from(new Set(initialData.map((item) => item.name)));

  const characterLines = selectedCharacter
    ? initialData.filter((item) => item.name === selectedCharacter)
    : [];

  const canSubmit =
    selectedCharacter &&
    characterLines.every((line) => userRecordings[line.id]);

  const handleSubmit = () => {
    setSubmitted(true);
    // In a real app, this would send recordings to the server for evaluation
    // For now, we'll just use our mock data
    setResult(mockEvaluationData);
  };

  const mainBgColor = isDarkMode ? color.gray800 : color.gray200;

  return (
    <Box
      sx={{
        mx: { xs: 0, md: 2 },
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 3 },
        bgcolor: mainBgColor,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Character Selection Section */}
      <CharacterSelection
        characters={characters}
        data={initialData}
        selectedCharacter={selectedCharacter || ""}
        setSelectedCharacter={setSelectedCharacter}
      />

      {/* Main Conversation Section */}
      {selectedCharacter && !submitted && (
        <Box>
          <ConversationInstructions selectedCharacter={selectedCharacter} />

          {/* Conversation Timeline */}
          <ConversationTimeline
            initialData={initialData}
            selectedCharacter={selectedCharacter}
            isRecording={isRecording}
            playingAudio={playingAudio}
            userRecordings={userRecordings}
            audioRefs={audioRefs}
            setIsRecording={setIsRecording}
            setPlayingAudio={setPlayingAudio}
            setUserRecordings={setUserRecordings}
            mediaRecorderRef={mediaRecorderRef}
            audioChunksRef={audioChunksRef}
          />

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              disabled={!canSubmit}
              sx={{
                bgcolor: isDarkMode ? color.btnSubmitBg : color.btnSubmitBg,
                color: color.white,
                px: 4,
                py: 1,
                fontSize: "1rem",
                "&:hover": {
                  bgcolor: isDarkMode
                    ? color.btnSubmitHoverBg
                    : color.btnSubmitHoverBg,
                },
                "&.Mui-disabled": {
                  bgcolor: isDarkMode ? color.gray600 : color.gray300,
                  color: isDarkMode ? color.gray400 : color.gray500,
                },
              }}
              onClick={handleSubmit}
            >
              Submit Recording
            </Button>
          </Box>
        </Box>
      )}

      {/* Results Section */}
      {submitted && result && (
        <ResultSection
          score={result.score}
          strengths={result.strengths}
          areas_to_improve={result.areas_to_improve}
          feedback={result.feedback}
          transcripts={result.transcripts}
          data={initialData}
          setSubmitted={setSubmitted}
          setResult={setResult}
          setUserRecordings={setUserRecordings}
        />
      )}

      {/* If no character is selected yet */}
      {!selectedCharacter && !submitted && (
        <Box
          sx={{
            p: 5,
            my: 4,
            mx: "auto",
            maxWidth: "90%",
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
            boxShadow: isDarkMode ? "none" : "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 160,
          }}
        >
          <PersonIcon
            sx={{
              fontSize: 48,
              mb: 2,
              color: isDarkMode ? color.gray500 : color.gray400,
              opacity: 0.8,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              color: isDarkMode ? color.gray300 : color.gray600,
              mb: 1,
            }}
          >
            No character selected
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray500,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            Please select a character from the options above to begin the
            exercise.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
