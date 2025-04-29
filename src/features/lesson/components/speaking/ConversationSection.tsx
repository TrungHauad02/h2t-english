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
import { SpeakingConversation } from "interfaces";

interface UserRecordings {
  [key: number]: string;
}

interface RecordingBlobs {
  [key: number]: Blob;
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

export default function ConversationSection() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const { id } = useParams();
  
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [userRecordings, setUserRecordings] = useState<UserRecordings>({});
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conversationData, setConversationData] = useState<SpeakingConversation[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Refs
  const audioRefs = useRef<Record<number, HTMLAudioElement>>({}); // ✅ Đã sửa type
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingBlobsRef = useRef<RecordingBlobs>({});

  // Fetch conversation data
  useEffect(() => {
    const fetchConversationData = async () => {
      setIsLoadingData(true);
      try {
        if (id) {
          const response = await conversationService.findBySpeakingId(parseInt(id));
          if (response.status === "SUCCESS" && response.data) {
            setConversationData(response.data);
          } else {
            throw new Error(response.message || "Failed to fetch conversation data");
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
      resetRecordings();
    };
  }, []);

  // Reset recordings when character changes
  useEffect(() => {
    if (selectedCharacter) {
      resetRecordings();
    }
  }, [selectedCharacter]);

  // Improve blobs when recordings are made
  useEffect(() => {
    const currentRecordings = Object.keys(userRecordings).map(Number);

    currentRecordings.forEach((lineId) => {
      if (userRecordings[lineId] && !recordingBlobsRef.current[lineId]) {
        fetch(userRecordings[lineId])
          .then((response) => response.blob())
          .then((blob) => {
            const mimeType = blob.type === "audio/webm" ? "audio/mp3" : blob.type;
            const betterBlob = new Blob([blob], { type: mimeType });
            recordingBlobsRef.current[lineId] = betterBlob;
            console.log(`Improved blob for line ${lineId} with type: ${mimeType}`);
          })
          .catch((err) => {
            console.error("Error processing recording blob:", err);
          });
      }
    });
  }, [userRecordings]);

  const characters: string[] = Array.from(new Set(conversationData.map((item) => item.name)));

  const characterLines: SpeakingConversation[] = selectedCharacter
    ? conversationData.filter((item) => item.name === selectedCharacter)
    : [];

  const canSubmit: boolean = selectedCharacter !== null && characterLines.every((line) => userRecordings[line.id]);

  const getAudioFilesAndTexts = () => {
    const audioFiles: File[] = [];
    const expectedTexts: string[] = [];

    characterLines.forEach((line) => {
      expectedTexts.push(line.content);

      if (recordingBlobsRef.current[line.id]) {
        const blob = recordingBlobsRef.current[line.id];
        const mimeType = blob.type;
        const extension = mimeType.includes("mp3") ? "mp3" : mimeType.includes("wav") ? "wav" : "webm";

        const finalMimeType = mimeType === "audio/mpeg" ? "audio/mp3" : mimeType;
        const file = new File([blob], `recording-${line.id}.${extension}`, { type: finalMimeType });

        audioFiles.push(file);
      }
    });

    return { audioFiles, expectedTexts };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setSubmitted(true);

    try {
      const { audioFiles, expectedTexts } = getAudioFilesAndTexts();
      if (audioFiles.length === 0) {
        throw new Error("No audio recordings found");
      }

      const response = await scoreSpeakingService.evaluateMultipleFiles(audioFiles, expectedTexts);

      if (response.status === "SUCCESS" && response.data) {
        const transcriptsMap: TranscriptsMap = {};

        if (Array.isArray(response.data.transcripts)) {
          characterLines.forEach((line, index) => {
            transcriptsMap[line.id] = response.data.transcripts[index] ?? "No transcript available";
          });
        }

        setResult({
          score: response.data.score || "0",
          transcripts: transcriptsMap,
          feedback: response.data.feedback || "No feedback available",
          strengths: response.data.strengths || [],
          areas_to_improve: response.data.areas_to_improve || [],
        });
      } else {
        throw new Error(response.message || "Failed to evaluate recordings");
      }
    } catch (err) {
      console.error("Error submitting recordings:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetRecordings = () => {
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

  const mainBgColor = isDarkMode ? color.gray800 : color.gray200;

  if (isLoadingData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading conversation data...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: mainBgColor, borderRadius: 2, boxShadow: 3 }}>
      <CharacterSelection
        characters={characters}
        data={conversationData}
        selectedCharacter={selectedCharacter || ""}
        setSelectedCharacter={setSelectedCharacter}
      />

      {selectedCharacter && !submitted && (
        <>
          <ConversationInstructions selectedCharacter={selectedCharacter} />
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
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              disabled={!canSubmit || isLoading}
              onClick={handleSubmit}
              sx={{
                bgcolor: color.btnSubmitBg,
                "&:hover": { bgcolor: color.btnSubmitHoverBg },
              }}
            >
              {isLoading ? "Evaluating..." : "Submit Recording"}
            </Button>
          </Box>
        </>
      )}

      {submitted && result && (
        <ResultSection
          score={parseInt(result.score)}
          strengths={result.strengths}
          areas_to_improve={result.areas_to_improve}
          feedback={result.feedback}
          transcripts={result.transcripts}
          data={conversationData}
          setSubmitted={setSubmitted}
          setResult={setResult}
          setUserRecordings={setUserRecordings}
        />
      )}

      {!selectedCharacter && !submitted && (
        <Box
          sx={{
            p: 5,
            textAlign: "center",
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            border: `1px dashed ${isDarkMode ? color.gray600 : color.gray300}`,
            borderRadius: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No character selected
          </Typography>
          <Typography variant="body1">
            Please select a character above to start practicing.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
