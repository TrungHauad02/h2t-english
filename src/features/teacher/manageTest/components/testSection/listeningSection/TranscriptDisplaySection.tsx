import React from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import SectionHeader from '../common/SectionHeader';

interface TranscriptDisplaySectionProps {
  transcript?: string;
  isEditingTranscript: boolean;
  tempTranscript: string;
  handleEditTranscript: () => void;
  handleTranscriptChange: (transcript: string) => void;
  handleSaveTranscript: () => void;
  handleCancelEdit: () => void;
}

export default function TranscriptDisplaySection({
  transcript,
  isEditingTranscript,
  tempTranscript,
  handleEditTranscript,
  handleTranscriptChange,
  handleSaveTranscript,
  handleCancelEdit
}: TranscriptDisplaySectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box>
      <SectionHeader
        title="Transcript Section"
        editText="Edit Transcript"
        icon={<ArticleIcon />}
        isEditMode={isEditingTranscript}
        handleSaveChanges={handleSaveTranscript}
        handleEditMode={handleEditTranscript}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2} sx={{ mt: 2 }}>
        {isEditingTranscript ? (
          <TextField
            fullWidth
            multiline
            rows={10}
            value={tempTranscript}
            onChange={(e) => handleTranscriptChange(e.target.value)}
            placeholder="Enter the audio transcript here..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                '& fieldset': {
                  borderColor: isDarkMode ? color.gray600 : color.gray300,
                },
                '&:hover fieldset': {
                  borderColor: isDarkMode ? color.teal500 : color.teal400,
                },
                '&.Mui-focused fieldset': {
                  borderColor: isDarkMode ? color.teal400 : color.teal500,
                },
              },
              '& .MuiInputBase-input': {
                color: isDarkMode ? color.gray100 : color.gray800,
                fontSize: '0.95rem',
                lineHeight: 1.6
              }
            }}
          />
        ) : transcript ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 3,
              backgroundColor: secondaryBgColor,
              borderRadius: "0.75rem",
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header with icon and title */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                mb: 3,
                position: 'relative'
              }}
            >
              <TextFieldsIcon 
                sx={{ 
                  fontSize: 32, 
                  color: isDarkMode ? color.teal400 : color.teal600,
                  position: 'absolute',
                  left: 0,
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.7 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.7 }
                  }
                }} 
              />
              <Typography 
                variant="subtitle1" 
                fontWeight="medium"
                sx={{ 
                  color: isDarkMode ? color.teal300 : color.teal700,
                }}
              >
                Audio Transcript
              </Typography>
            </Box>
            
            {/* Decorative line */}
            <Box 
              sx={{ 
                width: '100%',
                height: '1px',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  ${isDarkMode ? color.teal600 : color.teal400} 50%,
                  transparent 100%)`,
                mb: 3
              }}
            />
            
            {/* Transcript content box */}
            <Box
              sx={{
                p: 3,
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                borderRadius: "0.75rem",
                border: `1px solid ${isDarkMode ? color.gray600 : color.gray200}`,
                boxShadow: isDarkMode 
                  ? '0 4px 12px rgba(0, 0, 0, 0.2)' 
                  : '0 4px 12px rgba(0, 0, 0, 0.05)',
                position: 'relative'
              }}
            >
              {/* Quote icon */}
              <FormatQuoteIcon
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  fontSize: '2rem',
                  color: isDarkMode ? color.teal600 : color.teal400,
                  opacity: 0.6,
                  transform: 'rotate(180deg)'
                }}
              />
              
              {/* Transcript text */}
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? color.gray200 : color.gray700,
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  textAlign: 'justify',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  pl: 3
                }}
              >
                {transcript}
              </Typography>
              
              {/* Closing quote icon */}
              <FormatQuoteIcon
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  fontSize: '1.5rem',
                  color: isDarkMode ? color.teal600 : color.teal400,
                  opacity: 0.4
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              p: 4,
              backgroundColor: secondaryBgColor,
              borderRadius: "0.75rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "150px",
            }}
          >
            <SubtitlesIcon
              sx={{
                fontSize: 48,
                color: secondaryTextColor,
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: secondaryTextColor,
                fontWeight: "medium",
                mb: 1,
              }}
            >
              No transcript available
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
            >
              Click the Edit Transcript button to add a transcript for this
              listening lesson.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}