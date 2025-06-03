import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import { WEAudioInput } from 'components/input';
import SectionHeader from '../common/SectionHeader';

interface ListeningAudioSectionProps {
  audio?: string;
  isEditingAudio: boolean;
  tempAudio: string;
  handleEditAudio: () => void;
  handleAudioChange: (base64: string) => void;
  handleSaveAudio: () => void;
  handleCancelEdit: () => void;
}

export default function ListeningAudioSection({
  audio,
  isEditingAudio,
  tempAudio,
  handleEditAudio,
  handleAudioChange,
  handleSaveAudio,
  handleCancelEdit
}: ListeningAudioSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;

  return (
    <Box>
      <SectionHeader
        title="Listening Audio"
        editText="Edit Audio"
        icon={<AudioFileIcon />}
        isEditMode={isEditingAudio}
        handleSaveChanges={handleSaveAudio}
        handleEditMode={handleEditAudio}
        handleCancelEdit={handleCancelEdit}
      />

      <Stack spacing={2} sx={{ mt: 2 }}>
        {isEditingAudio ? (
          <WEAudioInput
            value={tempAudio}
            onChange={handleAudioChange}
            label="Listening Audio"
            errorMessage="Cannot load audio. Please try a different file."
          />
        ) : audio ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
              <GraphicEqIcon 
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
                Listening Audio Player
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
            
            {/* Audio player container */}
            <Box
              sx={{
                width: '100%',
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
              {/* Audio icon */}
              <VolumeUpIcon
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontSize: '1.5rem',
                  color: isDarkMode ? color.teal500 : color.teal600,
                  opacity: 0.6
                }}
              />
              
              {/* Audio player */}
              <audio 
                controls 
                src={audio} 
                style={{ 
                  width: "100%",
                  borderRadius: "8px",
                  outline: 'none'
                }} 
              />
              
              {/* Audio info */}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    fontSize: '0.875rem'
                  }}
                >
                  Click play to start listening
                </Typography>
              </Box>
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
            <MusicNoteIcon
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
              No audio has been uploaded
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDarkMode ? color.gray500 : color.gray500 }}
            >
              Click the Edit Audio button to upload an audio file for this
              listening lesson.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}