import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Chip,
  alpha,
  useMediaQuery,
  useTheme
} from '@mui/material';
import HearingIcon from '@mui/icons-material/Hearing';
import ImageIcon from '@mui/icons-material/Image';
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
  isConversation?: boolean; // For Part 3 & 4
};

export default function ListeningPart1QuestionItem({
  questionNumber,
  imageSrc,
  audioSrc,
  selectedAnswer,
  onChange,
  onAudioEnded,
  isConversation = false
}: ListeningPart1QuestionItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: imageSrc ? 'row' : 'column' },
        justifyContent: 'center',
        alignItems: { xs: 'center', lg: imageSrc ? 'flex-start' : 'center' },
        gap: 4,
        px: { xs: 2, md: 4 },
        py: 3,
        width: '100%',
        maxWidth: imageSrc ? '100%' : '500px',
        mx: 'auto'
      }}
    >
      <audio src={audioSrc} autoPlay onEnded={onAudioEnded} style={{ display: 'none' }} />
      
      {imageSrc && (
        <Box
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: `0 12px 32px ${alpha(isDarkMode ? color.black : color.gray900, 0.12)}`,
            maxWidth: { xs: '100%', lg: 600 },
            width: '100%',
            border: '2px solid',
            borderColor: isDarkMode ? color.emerald700 : color.emerald500,
            bgcolor: isDarkMode ? color.gray900 : color.white,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              background: isDarkMode
                ? `linear-gradient(135deg, ${color.emerald800} 0%, ${color.teal800} 100%)`
                : `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
              color: color.white,
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <ImageIcon sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              Picture {questionNumber}
            </Typography>
          </Box>
          
          <Box
            sx={{
              p: 2,
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
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: `0 4px 12px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
              }}
            />
          </Box>
        </Box>
      )}
      
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: `0 8px 24px ${alpha(isDarkMode ? color.black : color.gray900, 0.12)}`,
          minWidth: { xs: 300, md: imageSrc ? 320 : 400 },
          maxWidth: { xs: '100%', md: imageSrc ? 320 : 500 },
          width: '100%',
          bgcolor: isDarkMode ? color.gray900 : color.white,
          border: '2px solid',
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
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            boxShadow: `0 4px 16px ${alpha(color.emerald600, 0.25)}`,
          }}
        >
          <HearingIcon sx={{ fontSize: 24 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {isConversation ? 'Listen to the conversation' : 'Choose the correct answer'}
            </Typography>
            {isConversation && (
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  opacity: 0.9,
                  mt: 0.5
                }}
              >
                Then answer the questions
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box
          sx={{
            px: 3,
            py: 3,
            bgcolor: isDarkMode ? color.gray800 : color.gray50,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3
            }}
          >
            <Typography
              sx={{
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
              Question {questionNumber}
            </Typography>
            
            {selectedAnswer && (
              <Chip
                label="Answered"
                size="small"
                sx={{
                  bgcolor: isDarkMode ? color.teal800 : color.teal100,
                  color: isDarkMode ? color.teal100 : color.teal800,
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: isDarkMode ? color.teal600 : color.teal300,
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
                        Option {option}
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
                      : isDarkMode
                        ? alpha(color.gray800, 0.5)
                        : alpha(color.white, 0.8),
                    border: '1px solid',
                    borderColor: isSelected
                      ? isDarkMode ? color.teal700 : color.teal300
                      : isDarkMode ? color.gray700 : color.gray200,
                    '&:hover': {
                      bgcolor: isDarkMode
                        ? alpha(color.teal900, 0.15)
                        : alpha(color.teal100, 0.4),
                      transform: 'translateX(4px)',
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