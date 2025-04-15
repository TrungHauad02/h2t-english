import React from 'react';
import { Stack, Typography, Chip } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CampaignIcon from '@mui/icons-material/Campaign';
import useColor from 'theme/useColor';
import { useDarkMode } from 'hooks/useDarkMode';

interface DialogTitleContentProps {
  partNumber: 3 | 4;
  status: boolean;
}

export const DialogTitleContent: React.FC<DialogTitleContentProps> = ({ partNumber, status }) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  
  const partTitle = partNumber === 3 ? "Conversations" : "Talks";
  const dialogTitle = `Edit Part ${partNumber}: ${partTitle}`;
  
  const partIcon = partNumber === 3 
    ? <RecordVoiceOverIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} /> 
    : <CampaignIcon sx={{ color: isDarkMode ? color.teal300 : color.teal600 }} />;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {partIcon}
      <Typography variant="h6">{dialogTitle}</Typography>
      <Chip 
        label={status ? "Published" : "Draft"} 
        size="small" 
        color={status ? "success" : "default"}
        sx={{ ml: 1 }}
      />
    </Stack>
  );
};