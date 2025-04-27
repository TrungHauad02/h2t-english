import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';
import SectionHeader from '../common/SectionHeader';

interface SpeakingTitleSectionProps {
  title: string;
  isEditingTitle: boolean;
  tempTitle: string;
  handleEditTitle: () => void;
  handleTitleChange: (value: string) => void;
  handleSaveTitle: () => void;
  handleCancelEdit: () => void;
}

export default function SpeakingTitleSection({
  title,
  isEditingTitle,
  tempTitle,
  handleEditTitle,
  handleTitleChange,
  handleSaveTitle,
  handleCancelEdit
}: SpeakingTitleSectionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  return (
    <Box>
      <SectionHeader
        title="Speaking Topic"
        editText="Edit Title"
        icon={<TitleIcon />}
        isEditMode={isEditingTitle}
        handleEditMode={handleEditTitle}
        handleSaveChanges={handleSaveTitle}
        handleCancelEdit={handleCancelEdit}
      />
      
      <Box sx={{ mt: 2 }}>
        {isEditingTitle ? (
          <TextField
            fullWidth
            label="Topic Title"
            value={tempTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.75rem',
                backgroundColor: isDarkMode ? color.gray700 : color.gray50,
              }
            }}
          />
        ) : (
          <Box
            sx={{
              p: 3,
              backgroundColor: isDarkMode ? color.gray700 : color.gray100,
              borderRadius: '0.75rem',
              position: 'relative',
              borderLeft: `4px solid ${isDarkMode ? color.teal400 : color.teal500}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: isDarkMode ? color.white : color.gray900,
                fontWeight: 500,
                mb: 1
              }}
            >
              {title || "Untitled Speaking Topic"}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? color.gray400 : color.gray600,
                mt: 1
              }}
            >
              This is a speaking topic that students will use for verbal communication practice.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}