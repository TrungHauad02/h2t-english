import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  alpha,
} from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { AnswerEnum } from 'interfaces/TestInterfaces';

type Props = {
  questionNumber: number;
  audioSrc: string;
  selectedAnswer?: AnswerEnum;
  onChange?: (value: AnswerEnum) => void;
  onAudioEnded?: () => void;
  onAudioStarted?: () => void; // New prop
  autoPlay?: boolean;
  volume?: number;
};

export default function ListeningPart2QuestionItem({
  questionNumber,
  audioSrc,
  selectedAnswer,
  onChange,
  onAudioEnded,
  onAudioStarted,
  autoPlay = false,
  volume = 0.5
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle autoplay and volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (autoPlay) {
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.warn('Auto-play failed:', error);
        }
      };
      playAudio();
    }
  }, [autoPlay, volume, audioSrc]);

  // Update volume when it changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handleAudioPlay = () => {
    if (onAudioStarted) {
      onAudioStarted();
    }
  };

  return (
    <Box
      sx={{
        width: { xs: 350, md: 400 },
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '2px solid',
        borderColor: isDarkMode ? color.emerald700 : color.emerald500,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 8px 24px ${alpha(isDarkMode ? color.black : color.gray900, 0.12)}`,
        transition: 'all 0.3s ease',
      }}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={onAudioEnded}
        onPlay={handleAudioPlay} // Add this line
        style={{ display: 'none' }}
      />
      
      <Box
        sx={{
          background: isDarkMode
            ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
            : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
          color: color.white,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: `0 4px 16px ${alpha(color.emerald600, 0.25)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <HearingIcon sx={{ fontSize: 24 }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Choose the correct answer
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{
          px: 3,
          py: 3,
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
        }}
      >
        <Typography
          sx={{
            mb: 3,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: isDarkMode ? color.emerald300 : color.emerald700,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
                : `linear-gradient(135deg, ${color.emerald200} 0%, ${color.teal200} 100%)`,
              color: isDarkMode ? color.white : color.emerald900,
              fontWeight: 800,
              fontSize: '0.95rem',
              boxShadow: `0 2px 8px ${alpha(color.emerald600, 0.3)}`,
            }}
          >
            {questionNumber}
          </Box>
        </Typography>
        
        <RadioGroup
          name={`question-${questionNumber}`}
          value={selectedAnswer || ''}
          onChange={(e) => onChange?.(e.target.value as AnswerEnum)}
        >
          {['A', 'B', 'C'].map((option) => {
            const isSelected = selectedAnswer === option;
            
            return (
              <FormControlLabel
                key={option}
                value={option}
                control={
                  <Radio
                    sx={{
                      color: isDarkMode ? color.gray600 : color.gray400,
                      '&.Mui-checked': {
                        color: isDarkMode ? color.teal400 : color.teal600,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: isSelected
                          ? isDarkMode ? color.teal700 : color.teal500
                          : isDarkMode ? color.gray700 : color.gray200,
                        color: isSelected
                          ? color.white
                          : isDarkMode ? color.gray300 : color.gray700,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected
                          ? `0 2px 8px ${alpha(color.teal600, 0.3)}`
                          : 'none',
                      }}
                    >
                      {option}
                    </Box>
                    <Typography
                      sx={{
                        color: isDarkMode ? color.gray200 : color.gray800,
                        fontWeight: isSelected ? 600 : 400,
                        fontSize: '1rem',
                      }}
                    >
                    </Typography>
                  </Box>
                }
                sx={{
                  mb: 2,
                  ml: 0,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2.5,
                  width: '100%',
                  transition: 'all 0.2s ease',
                  background: isSelected
                    ? isDarkMode
                      ? `linear-gradient(135deg, ${alpha(color.teal900, 0.3)} 0%, ${alpha(color.emerald900, 0.3)} 100%)`
                      : `linear-gradient(135deg, ${alpha(color.teal100, 0.8)} 0%, ${alpha(color.emerald100, 0.8)} 100%)`
                    : 'transparent',
                  '&:hover': {
                    bgcolor: isDarkMode
                      ? alpha(color.teal900, 0.15)
                      : alpha(color.teal100, 0.4),
                    transform: 'translateX(4px)',
                  },
                }}
              />
            );
          })}
        </RadioGroup>
      </Box>
    </Box>
  );
}