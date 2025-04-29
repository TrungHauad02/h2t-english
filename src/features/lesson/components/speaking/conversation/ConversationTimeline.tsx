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
  audioRefs: RefObject<Record<number, HTMLAudioElement>>;
  setIsRecording: (id: number | null) => void;
  setPlayingAudio: (id: number | null) => void;
  setUserRecordings: (recordings: Record<number, string>) => void;
  mediaRecorderRef: RefObject<MediaRecorder | null>;
  audioChunksRef: RefObject<Blob[]>;
}

// Hàm helper để set ref.current an toàn
function setRefCurrent<T>(ref: RefObject<T>, value: T) {
  (ref as any).current = value;
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

  const titleColor = isDarkMode ? color.teal300 : color.teal700;
  const dividerColor = isDarkMode ? color.gray700 : color.gray200;
  const subtitleColor = isDarkMode ? color.gray400 : color.gray600;

  const setupRecording = async (id: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      setRefCurrent(mediaRecorderRef, mediaRecorder);

      if (audioChunksRef.current) {
        setRefCurrent(audioChunksRef, []);
      }

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && audioChunksRef.current) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (audioChunksRef.current && audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);

          setUserRecordings({
            ...userRecordings,
            [id]: audioUrl,
          });

          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(id);
      console.log(`Started recording for line ${id}`);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Failed to access microphone. Please check your browser permissions.");
    }
  };

  const startRecording = (id: number) => {
    setupRecording(id);
  };

  const stopRecording = (id: number) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(null);
      console.log(`Stopped recording for line ${id}`);
    }
  };

  const deleteRecording = (id: number) => {
    if (userRecordings[id]) {
      URL.revokeObjectURL(userRecordings[id]);
    }

    const newRecordings = { ...userRecordings };
    delete newRecordings[id];
    setUserRecordings(newRecordings);
    console.log(`Deleted recording for line ${id}`);
  };

  const togglePlayAudio = (id: number, url: string) => {
    if (playingAudio === id) {
      audioRefs.current?.[id]?.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio !== null && audioRefs.current?.[playingAudio]) {
        audioRefs.current?.[playingAudio]?.pause();
      }

      if (!audioRefs.current?.[id]) {
        if (audioRefs.current) {
          const audio = new Audio(url);
          audio.addEventListener("ended", () => {
            setPlayingAudio(null);
          });
          audioRefs.current[id] = audio;
        }
      }

      audioRefs.current?.[id]?.play();
      setPlayingAudio(id);
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      Object.values(userRecordings).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [userRecordings, mediaRecorderRef]);

  const selectedCharacterLines = initialData.filter(
    (item) => item.name === selectedCharacter
  ).length;

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
            sx={{ color: subtitleColor }}
          >
            {selectedCharacterLines} lines for {selectedCharacter} · {recordingsCount} recorded
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
