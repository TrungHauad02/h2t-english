import { Stack, Typography, Box, Divider } from "@mui/material";
import { SpeakingConversation } from "interfaces";
import { RefObject, useEffect } from "react";
import ConversationItem from "./ConversationItem";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ConversationTimelineProps {
  initialData: SpeakingConversation[];
  selectedCharacter: string;
  isRecording: number | null;
  playingAudio: number | null;
  userRecordings: Record<number, string>;
  audioRefs: RefObject<Record<number, HTMLAudioElement | null>>;
  setIsRecording: (id: number | null) => void;
  setPlayingAudio: (id: number | null) => void;
  setUserRecordings: (recordings: Record<number, string>) => void;
  mediaRecorderRef: RefObject<MediaRecorder | null>;
  audioChunksRef: RefObject<Blob[]>;
}

export default function ConversationTimeline({
  initialData,
  selectedCharacter,
  isRecording,
  playingAudio,
  userRecordings,
  audioRefs,
  setIsRecording,
  setPlayingAudio,
  setUserRecordings,
  mediaRecorderRef,
  audioChunksRef,
}: ConversationTimelineProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Define theme-specific colors
  const titleColor = isDarkMode ? color.teal300 : color.teal700;
  const dividerColor = isDarkMode ? color.gray700 : color.gray200;
  const subtitleColor = isDarkMode ? color.gray400 : color.gray600;

  // Function to request microphone access and setup recording
  const setupRecording = async (id: number) => {
    try {
      // Request access to the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create new MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Clear previous audio chunks
      if (audioChunksRef.current) {
        audioChunksRef.current = [];
      }

      // Setup event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && audioChunksRef.current) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Handle recording completion
      mediaRecorder.onstop = () => {
        if (audioChunksRef.current && audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Save the recording URL
          setUserRecordings({
            ...userRecordings,
            [id]: audioUrl,
          });

          // Clean up
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(id);
      console.log(`Started recording for line ${id}`);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Failed to access microphone. Please check your browser permissions."
      );
    }
  };

  // Function to start recording
  const startRecording = (id: number) => {
    setupRecording(id);
  };

  // Function to stop recording
  const stopRecording = (id: number) => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(null);
      console.log(`Stopped recording for line ${id}`);
    }
  };

  // Function to delete recording
  const deleteRecording = (id: number) => {
    // Revoke object URL to avoid memory leaks
    if (userRecordings[id]) {
      URL.revokeObjectURL(userRecordings[id]);
    }

    const newRecordings = { ...userRecordings };
    delete newRecordings[id];
    setUserRecordings(newRecordings);
    console.log(`Deleted recording for line ${id}`);
  };

  // Function to play/pause audio
  const togglePlayAudio = (id: number, url: string) => {
    if (playingAudio === id) {
      audioRefs.current?.[id]?.pause();
      setPlayingAudio(null);
    } else {
      // Pause any currently playing audio
      if (playingAudio !== null && audioRefs.current?.[playingAudio]) {
        audioRefs.current?.[playingAudio]?.pause();
      }
      // Play the new audio
      if (!audioRefs.current?.[id]) {
        if (audioRefs.current) {
          audioRefs.current[id] = new Audio(url);
          audioRefs.current[id]?.addEventListener("ended", () => {
            setPlayingAudio(null);
          });
        }
      }
      audioRefs.current?.[id]?.play();
      setPlayingAudio(id);
    }
  };

  // Cleanup function to stop any ongoing recordings when component unmounts
  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      // Revoke all object URLs to prevent memory leaks
      Object.values(userRecordings).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [userRecordings, mediaRecorderRef]);

  // Count how many lines are for the selected character
  const selectedCharacterLines = initialData.filter(
    (item) => item.name === selectedCharacter
  ).length;

  // Count how many recordings have been made
  const recordingsCount = Object.keys(userRecordings).length;

  return (
    <Box sx={{ mb: 5 }}>
      {/* Title Section */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            color: titleColor,
            fontWeight: "bold",
            mb: 1,
          }}
        >
          Conversation
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: subtitleColor,
            }}
          >
            {selectedCharacterLines} lines for {selectedCharacter} ·{" "}
            {recordingsCount} recorded
          </Typography>
        </Box>

        <Divider
          sx={{
            borderColor: dividerColor,
            my: 2,
            opacity: isDarkMode ? 0.6 : 0.8,
          }}
        />
      </Box>

      {/* Conversation Items */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        {initialData
          .sort((a, b) => a.serial - b.serial)
          .map((item) => {
            const isSelectedCharacter = item.name === selectedCharacter;
            return (
              <ConversationItem
                key={item.id}
                item={item}
                isSelectedCharacter={isSelectedCharacter}
                isRecording={isRecording}
                playingAudio={playingAudio}
                userRecordings={userRecordings}
                startRecording={startRecording}
                stopRecording={stopRecording}
                deleteRecording={deleteRecording}
                togglePlayAudio={togglePlayAudio}
              />
            );
          })}
      </Stack>
    </Box>
  );
}
