import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  alpha,
} from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { AnswerEnum } from 'interfaces/TestInterfaces';

type ListeningPart1QuestionItemProps = {
  questionNumber: number;
  imageSrc?: string;
  audioSrc: string;
  selectedAnswer?: AnswerEnum;
  onChange?: (value: AnswerEnum) => void;
  onAudioEnded?: () => void;
  onAudioStarted?: () => void; // New prop
  isConversation?: boolean;
  autoPlay?: boolean;
  volume?: number;
};

export default function ListeningPart1QuestionItem({
  questionNumber,
  imageSrc,
  audioSrc,
  selectedAnswer,
  onChange,
  onAudioEnded,
  onAudioStarted,
  isConversation = false,
  autoPlay = false,
  volume = 0.5
}: ListeningPart1QuestionItemProps) {
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
        display: 'flex',
        flexDirection: { xs: 'column', md: imageSrc ? 'row' : 'column' },
        justifyContent: 'center',
        alignItems: { xs: 'center', md: imageSrc ? 'flex-start' : 'center' },
        gap: 3,
        p: 2,
        width: '100%',
        height: '100%',
        maxWidth: imageSrc ? '100%' : '400px',
        mx: 'auto'
      }}
    >
      <audio 
        ref={audioRef}
        src={audioSrc} 
        onEnded={onAudioEnded}
        onPlay={handleAudioPlay} // Add this line
        style={{ display: 'none' }} 
      />
      
      {imageSrc && (
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: `0 4px 12px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
            maxWidth: { xs: '100%', md: 400 },
            width: '100%',
            border: '1px solid',
            borderColor: isDarkMode ? color.emerald700 : color.emerald500,
            bgcolor: isDarkMode ? color.gray900 : color.white,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              bgcolor: isDarkMode ? color.gray800 : color.gray50,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={imageSrc}
              alt={`Question ${questionNumber}`}
              style={{
                maxWidth: '100%',
                maxHeight: '250px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '6px',
              }}
            />
          </Box>
        </Box>
      )}
      
      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: `0 4px 12px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
          minWidth: { xs: 280, md: imageSrc ? 300 : 360 },
          maxWidth: { xs: '100%', md: imageSrc ? 300 : 400 },
          width: '100%',
          bgcolor: isDarkMode ? color.gray900 : color.white,
          border: '1px solid',
          borderColor: isDarkMode ? color.emerald700 : color.emerald500,
          flexShrink: 0,
          mx: imageSrc ? 0 : 'auto'
        }}
      >
        <Box
          sx={{
            background: isDarkMode
              ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
              : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
            color: color.white,
            px: 2.5,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <HearingIcon sx={{ fontSize: 20 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              {isConversation ? 'Listen to the conversation' : 'Choose the correct answer'}
            </Typography>
            {isConversation && (
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  opacity: 0.9,
                }}
              >
                Then answer the questions
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box
          sx={{
            px: 2.5,
            py: 2,
            bgcolor: isDarkMode ? color.gray800 : color.gray50,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 700,
                color: isDarkMode ? color.emerald300 : color.emerald700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: isDarkMode
                    ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
                    : `linear-gradient(135deg, ${color.emerald200} 0%, ${color.teal200} 100%)`,
                  color: isDarkMode ? color.white : color.emerald900,
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                {questionNumber}
              </Box>
            </Typography>
            
            {selectedAnswer && (
              <Chip
                label="Answered"
                size="small"
                sx={{
                  bgcolor: isDarkMode ? color.teal800 : color.teal100,
                  color: isDarkMode ? color.teal100 : color.teal800,
                  fontWeight: 600,
                  height: 22,
                  fontSize: '0.75rem'
                }}
              />
            )}
          </Box>
          
          <RadioGroup
            name={`question-${questionNumber}`}
            value={selectedAnswer || ''}
            onChange={(e) => onChange?.(e.target.value as AnswerEnum)}
          >
            {['A', 'B', 'C', 'D'].map((option) => {
              const isSelected = selectedAnswer === option;
              
              return (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: isDarkMode ? color.gray600 : color.gray400,
                        '&.Mui-checked': {
                          color: isDarkMode ? color.teal400 : color.teal600,
                        },
                      }}
                    />
                  }
                  label={
          <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: 'fit-content',         // 👈 chỉ chiếm vừa nội dung
    maxWidth: '100%',
    flexShrink: 0                 // 👈 không bị kéo dài nếu FormControlLabel rộng
  }}
>

                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: '6px',
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
                          fontSize: '0.8rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {option}
                      </Box>
                      <Typography
                        sx={{
                          color: isDarkMode ? color.gray200 : color.gray800,
                          fontWeight: isSelected ? 600 : 400,
                          fontSize: '0.9rem',
                        }}
                      >
                      </Typography>
                    </Box>
                  }
                  sx={{
                    mb: 1.5,
                    ml: 0,
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    width: '100%',
                    transition: 'all 0.2s ease',
                    background: isSelected
                      ? isDarkMode
                        ? `linear-gradient(135deg, ${alpha(color.teal900, 0.3)} 0%, ${alpha(color.emerald900, 0.3)} 100%)`
                        : `linear-gradient(135deg, ${alpha(color.teal100, 0.8)} 0%, ${alpha(color.emerald100, 0.8)} 100%)`
                      : 'transparent',
                    border: '1px solid',
                    borderColor: isSelected
                      ? isDarkMode ? color.teal700 : color.teal300
                      : 'transparent',
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? alpha(color.teal900, 0.15)
                        : alpha(color.teal100, 0.4),
                      borderColor: isDarkMode ? color.teal600 : color.teal400,
                    },
                  }}
                />
              );
            })}
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  );
}