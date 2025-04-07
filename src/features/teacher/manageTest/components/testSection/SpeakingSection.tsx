import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField,
  IconButton,
  Stack,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { TestSpeaking, Question } from 'interfaces';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface SpeakingSectionProps {
  speakingTitles: TestSpeaking[];
  selectedTitle: TestSpeaking | null;
  onSelectTitle: (titleId: number) => void;
  questions: Question[];
  isEditMode: boolean;

}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  speakingTitles,
  selectedTitle,
  onSelectTitle,
  questions,
  isEditMode,

}) => {
  const [editTitle, setEditTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  


  useEffect(() => {
    if (selectedTitle) {
      setEditTitle(selectedTitle.title);
    }
  }, [selectedTitle]);

  const handleTitleSave = () => {
    if (selectedTitle && editTitle.trim()) {

      setIsEditingTitle(false);
    }
  };

  if (!selectedTitle) return null;

  return (
    <Box id="speaking-section">
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <MicIcon />
            <Typography variant="h5" sx={{ ml: 1 }}>Speaking Section</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
         
          {speakingTitles.length > 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs
                value={speakingTitles.findIndex(title => title.id === selectedTitle.id)}
                onChange={(event, newValue) => {
                  if (speakingTitles[newValue]) {
                    onSelectTitle(speakingTitles[newValue].id);
                  }
                }}
                aria-label="speaking titles tabs"
              >
                {speakingTitles.map((title, index) => (
                  <Tab
                    key={title.id}
                    label={`Speaking ${index + 1}`}
                    id={`speaking-tab-${index}`}
                    aria-controls={`speaking-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          <Stack spacing={3}>
            {/* Title Section */}
            <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium', color: 'text.secondary' }}>
                Title
              </Typography>
              
              {isEditingTitle ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    fullWidth
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Enter speaking test title"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <IconButton color="primary" onClick={handleTitleSave} size="small">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    setIsEditingTitle(false);
                    setEditTitle(selectedTitle.title);
                  }} size="small">
                    <CancelIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">
                    {selectedTitle.title || "No title"}
                  </Typography>
                  {isEditMode && (
                    <IconButton 
                      color="primary" 
                      onClick={() => setIsEditingTitle(true)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Stack>
              )}
            </Box>

          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SpeakingSection;