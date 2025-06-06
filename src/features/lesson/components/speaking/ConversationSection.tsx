import { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import PersonIcon from "@mui/icons-material/Person";
import {
  CharacterSelection,
  ConversationInstructions,
  ConversationTimeline,
  ResultSection,
} from "./conversation";
import { scoreSpeakingService, conversationService } from "services";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteNodeEnum, SpeakingConversation } from "interfaces";
import LoadingSubmit from "./LoadingSubmit";
import useAuth from "hooks/useAuth";
import { completeRouteNode } from "utils/updateProcess";

interface UserRecordings {
  [key: number]: string;
}

interface RecordingBlobs {
  [key: number]: Blob;
}

interface AudioRefs {
  [key: number]: HTMLAudioElement | null;
}

interface TranscriptsMap {
  [key: number]: string;
}

interface EvaluationResult {
  score: string;
  transcripts: TranscriptsMap;
  feedback: string;
  strengths: string[];
  areas_to_improve: string[];
}

const PASSING_SCORE = 50;

export default function ConversationSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  const { userId } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [userRecordings, setUserRecordings] = useState<UserRecordings>({});
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conversationData, setConversationData] = useState<
    SpeakingConversation[]
  >([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isShowingLoadingSubmit, setIsShowingLoadingSubmit] =
    useState<boolean>(false);

  // Refs
  const audioRefs = useRef<AudioRefs>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingBlobsRef = useRef<RecordingBlobs>({});

  // Fetch conversation data
  useEffect(() => {
    const fetchConversationData = async (): Promise<void> => {
      setIsLoadingData(true);
      try {
        if (id) {
          const response = await conversationService.findBySpeakingId(
            parseInt(id)
          );
          if (response.status === "SUCCESS" && response.data) {
            setConversationData(response.data);
          } else {
            throw new Error(
              response.message || "Failed to fetch conversation data"
            );
          }
        }
      } catch (err) {
        toast.error("Failed to fetch conversation data");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchConversationData();
  }, [id]);

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      // Clean up resources on unmount
      resetRecordings();
    };
  }, []);

  // Reset recordings when character changes
  useEffect(() => {
    if (selectedCharacter) {
      resetRecordings();
    }
  }, [selectedCharacter]);

  useEffect(() => {
    const currentRecordings = Object.keys(userRecordings).map((id) =>
      parseInt(id)
    );

    currentRecordings.forEach((lineId) => {
      if (userRecordings[lineId] && !recordingBlobsRef.current[lineId]) {
        fetch(userRecordings[lineId])
          .then((response) => response.blob())
          .then((blob) => {
            const mimeType =
              blob.type === "audio/webm" ? "audio/mp3" : blob.type;
            const betterBlob = new Blob([blob], { type: mimeType });
            recordingBlobsRef.current[lineId] = betterBlob;
          })
          .catch((err) => {
            console.error("Error processing recording blob:", err);
          });
      }
    });
  }, [userRecordings]);

  const characters: string[] = Array.from(
    new Set(conversationData.map((item) => item.name))
  );

  const characterLines: SpeakingConversation[] = selectedCharacter
    ? conversationData.filter((item) => item.name === selectedCharacter)
    : [];

  const canSubmit: boolean =
    selectedCharacter !== null &&
    characterLines.every((line) => userRecordings[line.id]);

  const getAudioFilesAndTexts = (): {
    audioFiles: File[];
    expectedTexts: string[];
  } => {
    const audioFiles: File[] = [];
    const expectedTexts: string[] = [];

    characterLines.forEach((line) => {
      expectedTexts.push(line.content);
      if (recordingBlobsRef.current[line.id]) {
        const blob = recordingBlobsRef.current[line.id];

        const mimeType = blob.type;
        const extension = mimeType.includes("mp3")
          ? "mp3"
          : mimeType.includes("wav")
          ? "wav"
          : "webm";

        const finalMimeType =
          mimeType === "audio/mpeg" ? "audio/mp3" : mimeType;

        const file = new File([blob], `recording-${line.id}.${extension}`, {
          type: finalMimeType,
        });

        audioFiles.push(file);
      } else if (userRecordings[line.id]) {
        fetch(userRecordings[line.id])
          .then((response) => response.blob())
          .then((blob) => {
            const mimeType =
              blob.type === "audio/webm" ? "audio/mp3" : blob.type;
            const extension = mimeType.includes("mp3")
              ? "mp3"
              : mimeType.includes("wav")
              ? "wav"
              : "webm";

            const file = new File([blob], `recording-${line.id}.${extension}`, {
              type: mimeType,
            });

            audioFiles.push(file);

            // Store for future use
            recordingBlobsRef.current[line.id] = blob;
          })
          .catch((err) => {
            console.error(
              `Error processing recording for line ${line.id}:`,
              err
            );
          });
      }
    });

    return { audioFiles, expectedTexts };
  };

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSubmitted(true);
    setIsShowingLoadingSubmit(true);

    try {
      const { audioFiles, expectedTexts } = getAudioFilesAndTexts();
      if (audioFiles.length === 0) {
        throw new Error("No audio recordings found");
      }

      const response = await scoreSpeakingService.evaluateMultipleFiles(
        audioFiles,
        expectedTexts
      );

      if (response.status === "SUCCESS" && response.data) {
        const transcriptsMap: TranscriptsMap = {};

        if (
          response.data.transcripts &&
          Array.isArray(response.data.transcripts)
        ) {
          characterLines.forEach((line, index) => {
            if (index < response.data.transcripts.length) {
              transcriptsMap[line.id] = response.data.transcripts[index];
            } else {
              transcriptsMap[line.id] = "No transcript available";
            }
          });
        }

        setResult({
          score: response.data.score || "0",
          transcripts: transcriptsMap,
          feedback: response.data.feedback || "No feedback available",
          strengths: response.data.strengths || [],
          areas_to_improve: response.data.areas_to_improve || [],
        });

        if (Number(response.data.score) >= PASSING_SCORE) {
          completeRouteNode(Number(id), Number(userId), RouteNodeEnum.SPEAKING);
        }
      } else {
        throw new Error(response.message || "Failed to evaluate recordings");
      }
    } catch (err) {
      console.error("Error submitting recordings:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetRecordings = (): void => {
    Object.values(userRecordings).forEach((url) => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    });

    setUserRecordings({});
    recordingBlobsRef.current = {};
    setResult(null);
    setSubmitted(false);
    setIsRecording(null);
    setError(null);
  };

  const onComplete = () => {
    setIsShowingLoadingSubmit(false);
    setSubmitted(true);
    setIsLoading(false);
  };

  const mainBgColor = isDarkMode ? color.gray800 : color.gray200;

  if (isLoadingData) {
    return (
      <Box
        sx={{
          mx: { xs: 0, md: 2 },
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 3 },
          bgcolor: mainBgColor,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading conversation data...</Typography>
      </Box>
    );
  }

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
        data={conversationData}
        selectedCharacter={selectedCharacter || ""}
        setSelectedCharacter={setSelectedCharacter}
      />

      {/* Main Conversation Section */}
      {selectedCharacter && !submitted && (
        <Box>
          <ConversationInstructions selectedCharacter={selectedCharacter} />

          {/* Conversation Timeline */}
          <ConversationTimeline
            initialData={conversationData}
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
            {error && (
              <Typography
                sx={{
                  color: "error.main",
                  mb: 2,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              disabled={!canSubmit || isLoading}
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
              {isLoading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Evaluating...
                </>
              ) : (
                "Submit Recording"
              )}
            </Button>
          </Box>
        </Box>
      )}

      {/* Results Section */}
      {submitted && result && (
        <ResultSection
          score={parseInt(result.score)}
          strengths={result.strengths}
          areas_to_improve={result.areas_to_improve}
          feedback={result.feedback}
          transcripts={result.transcripts || {}}
          data={conversationData}
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

      {/* Loading state when evaluating */}

      {isShowingLoadingSubmit && (
        <LoadingSubmit isLoading={isLoading} onComplete={onComplete} />
      )}
    </Box>
  );
}
