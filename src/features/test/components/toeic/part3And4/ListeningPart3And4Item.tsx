import React, { useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Chip,
  alpha,
} from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { AnswerEnum, ToeicQuestion } from 'interfaces/TestInterfaces';

type Props = {
  questionNumberStart: number;
  questions: ToeicQuestion[];
  audio: string;
  selectedAnswers: Record<string, AnswerEnum>;
  onChange: (questionKey: string, value: AnswerEnum) => void;
  onAudioEnded: () => void;
  onAudioStarted?: () => void; // New prop
  autoPlay?: boolean;
  volume?: number;
};

export default function ListeningPart3And4Item({
  questionNumberStart,
  questions,
  audio,
  selectedAnswers,
  onChange,
  onAudioEnded,
  onAudioStarted,
  autoPlay = false,
  volume = 0.5
}: Props) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const audioRef = useRef<HTMLAudioElement>(null);

  const questionNumberEnd = questionNumberStart + questions.length - 1;

  // Handle autoplay and volume
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.volume = volume;

    if (autoPlay) {
      const playAudio = async () => {
        try {
          await audioElement.play();
        } catch (error) {
          console.warn('Auto-play failed:', error);
        }
      };
      playAudio();
    }
  }, [autoPlay, volume, audio]);

  // Update volume when it changes
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = volume;
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
        width: '100%',
        maxHeight: '500px',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 6px 18px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
        bgcolor: isDarkMode ? color.gray900 : color.white,
        border: '1px solid',
        borderColor: isDarkMode ? color.teal600 : color.teal400,
        mx: 'auto',
      }}
    >
      <audio 
        ref={audioRef}
        src={audio} 
        onEnded={onAudioEnded}
        onPlay={handleAudioPlay} // Add this line
        style={{ display: 'none' }} 
      />
      
      <Box 
        sx={{ 
          background: isDarkMode 
            ? `linear-gradient(135deg, ${color.teal700} 0%, ${color.teal900} 100%)`
            : `linear-gradient(135deg, ${color.teal400} 0%, ${color.teal600} 100%)`,
          color: color.white,
          px: 2.5,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <HearingIcon />
          <Typography 
            sx={{ 
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            Questions {questionNumberStart}–{questionNumberEnd}
          </Typography>
        </Box>
        <Chip 
          label={`${questions.length} questions`}
          size="small"
          sx={{
            bgcolor: alpha(color.white, 0.2),
            color: color.white,
            fontWeight: 600,
            backdropFilter: 'blur(10px)',
            height: 24,
            fontSize: '0.75rem'
          }}
        />
      </Box>

      <Box
        sx={{
          p: 3,
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          maxHeight: '500px',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: isDarkMode ? color.gray700 : color.gray100,
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: isDarkMode ? color.teal700 : color.teal400,
            borderRadius: '3px',
          }
        }}
      >
        {questions.map((question, index) => {
          const questionKey = `${question.id}`;
          const questionNumber = questionNumberStart + index;
          const selected = selectedAnswers[questionKey];

          return (
            <Box
              key={question.id}
              mb={3}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: isDarkMode ? color.gray900 : color.white,
                border: '1px solid',
                borderColor: selected
                  ? (isDarkMode ? color.teal600 : color.teal400)
                  : (isDarkMode ? color.gray700 : color.gray200),
                transition: 'all 0.2s ease',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: '0.95rem',
                  color: isDarkMode ? color.teal300 : color.teal700,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    bgcolor: isDarkMode ? color.teal800 : color.teal100,
                    color: isDarkMode ? color.teal200 : color.teal700,
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}
                >
                  {questionNumber}
                </Box>
                <Box flex={1} sx={{ fontSize: '0.9rem' }}>{question.content}</Box>
              </Typography>

              <RadioGroup
                name={questionKey}
                value={selected || ''}
                onChange={(e) => onChange(questionKey, e.target.value as AnswerEnum)}
                sx={{ pl: 4 }}
              >
                {question.answers.map((answer, idx) => {
                  const optionLetter = (['A', 'B', 'C', 'D'][idx]) as AnswerEnum;
                  const isOptionSelected = selected === optionLetter;

                  return (
                    <FormControlLabel
                      key={answer.id}
                      value={optionLetter}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: isDarkMode ? color.gray600 : color.gray400,
                            '&.Mui-checked': {
                              color: isDarkMode ? color.teal400 : color.teal600,
                            },
                            padding: '6px',
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={optionLetter}
                            size="small"
                            sx={{
                              bgcolor: isOptionSelected
                                ? (isDarkMode ? color.teal700 : color.teal500)
                                : (isDarkMode ? color.gray700 : color.gray200),
                              color: isOptionSelected
                                ? color.white
                                : (isDarkMode ? color.gray300 : color.gray700),
                              fontWeight: 600,
                              width: 24,
                              height: 24,
                              transition: 'all 0.2s ease'
                            }}
                          />
                          <Typography
                            sx={{
                              color: isDarkMode ? color.gray200 : color.gray800,
                              fontWeight: isOptionSelected ? 600 : 400,
                              fontSize: '0.85rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {answer.content}
                          </Typography>
                        </Box>
                      }
                      sx={{
                        mb: 1,
                        ml: 0,
                        p: 1,
                        borderRadius: 1.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: isDarkMode
                            ? alpha(color.teal900, 0.2)
                            : alpha(color.teal100, 0.5),
                          transform: 'translateX(4px)',
                        },
                        ...(isOptionSelected && {
                          bgcolor: isDarkMode
                            ? alpha(color.teal900, 0.3)
                            : alpha(color.teal100, 0.8),
                          border: '1px solid',
                          borderColor: isDarkMode ? color.teal700 : color.teal300
                        })
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}