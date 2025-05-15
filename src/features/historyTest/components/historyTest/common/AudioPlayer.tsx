import { Box, Typography, Stack, IconButton, LinearProgress } from "@mui/material";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer({ src }: AudioPlayerProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: '16px',
        background: isDarkMode 
          ? `linear-gradient(135deg, ${color.gray900}, ${color.gray800})`
          : `linear-gradient(135deg, ${color.white}, ${color.gray50})`,
        boxShadow: isDarkMode 
          ? '0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <audio ref={audioRef} src={src} />
      
      <Stack spacing={2}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: isDarkMode ? color.gray700 : color.gray200,
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
              backgroundColor: isDarkMode ? color.teal400 : color.teal600,
            },
          }}
        />

        <Stack 
          direction="row" 
          justifyContent="space-between" 
          sx={{ px: 1 }}
        >
          <Typography 
            variant="caption" 
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            {formatTime(currentTime)}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ color: isDarkMode ? color.gray400 : color.gray600 }}
          >
            {formatTime(duration)}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <IconButton
            onClick={() => handleSkip(-10)}
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              '&:hover': {
                backgroundColor: isDarkMode ? color.gray800 : color.gray100,
              },
            }}
          >
            <SkipPrevious />
          </IconButton>

          <IconButton
            onClick={handlePlayPause}
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? color.teal600 : color.teal500,
              color: color.white,
              '&:hover': {
                backgroundColor: isDarkMode ? color.teal700 : color.teal600,
              },
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          <IconButton
            onClick={() => handleSkip(10)}
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              '&:hover': {
                backgroundColor: isDarkMode ? color.gray800 : color.gray100,
              },
            }}
          >
            <SkipNext />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}