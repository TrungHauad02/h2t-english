import { useState, useRef, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { base64ToBlobUrl } from "utils/convert";

interface AudioRecorderProps {
  audioBase64: string;
  onAudioChange: (base64: string) => void;
  disabled?: boolean;
}

export default function AudioRecorder({
  audioBase64,
  onAudioChange,
  disabled = false,
}: AudioRecorderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio();

    // Update audio source if base64 is available
    if (audioBase64) {
      const url = base64ToBlobUrl(audioBase64, "audio/wav");
      setAudioUrl(url);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }

      if (audioUrl && audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  useEffect(() => {
    if (audioBase64 && !audioUrl) {
      const url = base64ToBlobUrl(audioBase64, "audio/wav");
      setAudioUrl(url);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    }
  }, [audioBase64, audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        if (audioUrl && audioUrl.startsWith("blob:")) {
          URL.revokeObjectURL(audioUrl);
        }

        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.onended = () => {
            setIsPlaying(false);
          };
        }

        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onAudioChange(base64data);
        };

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timeIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (audioUrl && audioUrl.startsWith("blob:")) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl("");
    setIsPlaying(false);
    onAudioChange("");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check if file is audio
      if (!file.type.startsWith("audio/")) {
        alert("Please upload an audio file");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        onAudioChange(base64data);

        // Update audio source
        if (audioUrl && audioUrl.startsWith("blob:")) {
          URL.revokeObjectURL(audioUrl);
        }

        const url = URL.createObjectURL(file);
        setAudioUrl(url);

        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.onended = () => {
            setIsPlaying(false);
          };
        }
      };
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "12px",
        backgroundColor: isDarkMode ? color.gray700 : color.gray100,
        border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
        position: "relative",
      }}
    >
      {isRecording && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderRadius: "12px 12px 0 0",
            overflow: "hidden",
          }}
        >
          <LinearProgress
            sx={{
              height: 4,
              backgroundColor: isDarkMode ? color.gray600 : color.gray300,
              "& .MuiLinearProgress-bar": {
                backgroundColor: color.red600,
              },
            }}
          />
        </Box>
      )}

      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isRecording
              ? color.red600
              : isDarkMode
              ? color.gray600
              : color.gray300,
            position: "relative",
            flexShrink: 0,
          }}
        >
          {isRecording ? (
            <StopIcon
              sx={{
                color: color.white,
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 0.6 },
                  "50%": { opacity: 1 },
                  "100%": { opacity: 0.6 },
                },
              }}
            />
          ) : (
            <MicIcon
              sx={{
                color: isDarkMode ? color.gray300 : color.gray600,
              }}
            />
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: isDarkMode ? color.white : color.gray900,
            }}
          >
            {isRecording
              ? "Recording in progress..."
              : audioUrl
              ? "Audio recorded"
              : "No audio recorded yet"}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              display: "block",
            }}
          >
            {isRecording
              ? `Recording time: ${formatTime(recordingTime)}`
              : audioUrl
              ? "Click play to listen to the recording"
              : "Click the microphone button to start recording"}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          {!isRecording && !audioUrl && (
            <>
              <Tooltip title="Start Recording">
                <IconButton
                  onClick={startRecording}
                  disabled={disabled}
                  sx={{
                    backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                    color: isDarkMode ? color.teal300 : color.teal700,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.gray500
                        : color.gray300,
                    },
                  }}
                >
                  <MicIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Upload Audio File">
                <IconButton
                  component="label"
                  disabled={disabled}
                  sx={{
                    backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                    color: isDarkMode ? color.gray300 : color.gray600,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.gray500
                        : color.gray300,
                    },
                  }}
                >
                  <UploadFileIcon />
                  <input
                    type="file"
                    hidden
                    accept="audio/*"
                    onChange={handleFileUpload}
                    disabled={disabled}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}

          {isRecording && (
            <Tooltip title="Stop Recording">
              <IconButton
                onClick={stopRecording}
                disabled={disabled}
                sx={{
                  backgroundColor: color.red600,
                  color: color.white,
                  "&:hover": {
                    backgroundColor: color.red700,
                  },
                }}
              >
                <StopIcon />
              </IconButton>
            </Tooltip>
          )}

          {audioUrl && !isRecording && (
            <>
              {isPlaying ? (
                <Tooltip title="Pause">
                  <IconButton
                    onClick={pauseAudio}
                    disabled={disabled}
                    sx={{
                      backgroundColor: isDarkMode
                        ? color.gray600
                        : color.gray200,
                      color: isDarkMode ? color.teal300 : color.teal700,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.gray500
                          : color.gray300,
                      },
                    }}
                  >
                    <PauseIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Play">
                  <IconButton
                    onClick={playAudio}
                    disabled={disabled}
                    sx={{
                      backgroundColor: isDarkMode
                        ? color.teal700
                        : color.teal200,
                      color: isDarkMode ? color.white : color.teal800,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.teal600
                          : color.teal300,
                      },
                    }}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Delete Recording">
                <IconButton
                  onClick={deleteAudio}
                  disabled={disabled}
                  sx={{
                    backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                    color: isDarkMode ? color.red400 : color.red600,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.gray500
                        : color.gray300,
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
