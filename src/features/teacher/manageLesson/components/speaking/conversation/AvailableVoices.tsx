import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState, useRef, useEffect } from "react";
import { Voice } from "interfaces";

interface AvailableVoicesProps {
  voices: Voice[];
}

export default function AvailableVoices({ voices }: AvailableVoicesProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [voiceErrors, setVoiceErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  // Pagination
  const itemsPerPage = isMobile ? 4 : isTablet ? 6 : 9;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(voices.length / itemsPerPage);
  const currentVoices = voices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getAudioSourceFromBase64 = (base64Data: string): string => {
    const binaryString = window.atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    return () => {
      Object.keys(audioRefs.current).forEach((key) => {
        URL.revokeObjectURL(audioRefs.current[key].src);
      });
    };
  }, []);

  const handlePlayVoice = (voice: Voice) => {
    const voiceId = voice.voice;

    if (playingVoice) {
      audioRefs.current[playingVoice].pause();
      audioRefs.current[playingVoice].currentTime = 0;
    }

    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      return;
    }

    try {
      setIsLoading((prev) => ({ ...prev, [voiceId]: true }));

      if (!audioRefs.current[voiceId]) {
        const audioSrc = getAudioSourceFromBase64(voice.fileData);
        const audio = new Audio(audioSrc);

        audio.onerror = (e) => {
          console.error(`Error playing voice ${voiceId}:`, e);
          setVoiceErrors((prev) => ({ ...prev, [voiceId]: true }));
          setPlayingVoice(null);
          setIsLoading((prev) => ({ ...prev, [voiceId]: false }));
        };

        audio.onended = () => {
          setPlayingVoice(null);
          setIsLoading((prev) => ({ ...prev, [voiceId]: false }));
        };

        audio.oncanplaythrough = () => {
          if (voiceErrors[voiceId]) {
            setVoiceErrors((prev) => ({ ...prev, [voiceId]: false }));
          }
          setIsLoading((prev) => ({ ...prev, [voiceId]: false }));
        };

        audioRefs.current[voiceId] = audio;
      }

      const playPromise = audioRefs.current[voiceId].play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingVoice(voiceId);
            setIsLoading((prev) => ({ ...prev, [voiceId]: false }));
          })
          .catch((error) => {
            console.error(`Could not play audio ${voiceId}:`, error);
            setVoiceErrors((prev) => ({ ...prev, [voiceId]: true }));
            setIsLoading((prev) => ({ ...prev, [voiceId]: false }));
          });
      }
    } catch (error) {
      console.error(`Error setting up audio for ${voiceId}:`, error);
      setVoiceErrors((prev) => ({ ...prev, [voiceId]: true }));
      setIsLoading((prev) => ({ ...prev, [voiceId]: false }));
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Stop any playing audio when changing page
    if (playingVoice && audioRefs.current[playingVoice]) {
      audioRefs.current[playingVoice].pause();
      audioRefs.current[playingVoice].currentTime = 0;
      setPlayingVoice(null);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.white,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
      }}
    >
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            color: isDarkMode ? color.teal300 : color.teal700,
            fontWeight: 600,
          }}
        >
          <RecordVoiceOverIcon sx={{ mr: 1 }} />
          Available Voices
        </Typography>

        <Chip
          label={`${voices.length} voice${voices.length !== 1 ? "s" : ""}`}
          size="small"
          sx={{
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            color: isDarkMode ? color.gray200 : color.gray800,
            fontWeight: 500,
          }}
        />
      </Box>

      {voices.length > 0 ? (
        <Stack spacing={3}>
          <Grid container spacing={2}>
            {currentVoices.map((voice, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: "0.75rem",
                    backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 0.2s ease-in-out",
                    position: "relative",
                    overflow: "hidden",
                    border: `1px solid ${
                      playingVoice === voice.voice
                        ? isDarkMode
                          ? color.teal500
                          : color.teal500
                        : isDarkMode
                        ? color.gray600
                        : color.gray200
                    }`,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.gray600
                        : color.gray200,
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                    ...(playingVoice === voice.voice && {
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "3px",
                        backgroundColor: isDarkMode
                          ? color.teal400
                          : color.teal600,
                        animation: "progress 2s infinite linear",
                        width: "100%",
                      },
                      "@keyframes progress": {
                        "0%": { transform: "translateX(-100%)" },
                        "100%": { transform: "translateX(100%)" },
                      },
                    }),
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? color.gray200 : color.gray800,
                      fontWeight: playingVoice === voice.voice ? 600 : 400,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {voice.voice}
                    {voiceErrors[voice.voice] && (
                      <Tooltip title="Unsupported format">
                        <ErrorOutlineIcon
                          fontSize="small"
                          sx={{
                            color: isDarkMode
                              ? color.errorDarkMode
                              : color.error,
                            ml: 0.5,
                          }}
                        />
                      </Tooltip>
                    )}
                  </Typography>

                  <Tooltip
                    title={playingVoice === voice.voice ? "Stop" : "Play"}
                  >
                    <IconButton
                      disabled={voiceErrors[voice.voice]}
                      onClick={() =>
                        !voiceErrors[voice.voice] && handlePlayVoice(voice)
                      }
                      size="small"
                      sx={{
                        backgroundColor: voiceErrors[voice.voice]
                          ? isDarkMode
                            ? color.gray600
                            : color.gray300
                          : playingVoice === voice.voice
                          ? isDarkMode
                            ? color.teal700
                            : color.teal600
                          : isDarkMode
                          ? color.gray600
                          : color.gray300,
                        color: voiceErrors[voice.voice]
                          ? isDarkMode
                            ? color.gray400
                            : color.gray500
                          : playingVoice === voice.voice
                          ? color.white
                          : isDarkMode
                          ? color.teal300
                          : color.teal600,
                        "&:hover": {
                          backgroundColor: voiceErrors[voice.voice]
                            ? isDarkMode
                              ? color.gray600
                              : color.gray300
                            : playingVoice === voice.voice
                            ? isDarkMode
                              ? color.teal800
                              : color.teal700
                            : isDarkMode
                            ? color.teal700
                            : color.teal500,
                        },
                        transition: "all 0.2s",
                        width: 36,
                        height: 36,
                      }}
                    >
                      {isLoading[voice.voice] ? (
                        <CircularProgress
                          size={16}
                          thickness={4}
                          sx={{
                            color: isDarkMode ? color.teal100 : color.teal800,
                          }}
                        />
                      ) : voiceErrors[voice.voice] ? (
                        <VolumeOffIcon fontSize="small" />
                      ) : playingVoice === voice.voice ? (
                        <VolumeUpIcon fontSize="small" />
                      ) : (
                        <VolumeUpIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                size={isMobile ? "small" : "medium"}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: isDarkMode ? color.gray300 : color.gray700,
                  },
                  "& .Mui-selected": {
                    backgroundColor: isDarkMode
                      ? color.teal700 + "!important"
                      : color.teal500 + "!important",
                    color: color.white + "!important",
                  },
                }}
              />
            </Box>
          )}
        </Stack>
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            borderRadius: "0.75rem",
          }}
        >
          <VolumeOffIcon
            sx={{
              fontSize: 40,
              color: isDarkMode ? color.gray500 : color.gray400,
              mb: 1,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray600,
              fontWeight: 500,
            }}
          >
            No voices available
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
