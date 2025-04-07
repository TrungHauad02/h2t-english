import React from 'react';
import { 
  Box, 
  Stack, 
  Tabs, 
  Tab, 
  Typography, 
  Card, 
  CardContent, 
  Divider 
} from '@mui/material';
import { TestListening } from 'interfaces';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DescriptionIcon from '@mui/icons-material/Description';
import ListeningAudioSection from './ListeningAudioSection'; 
import QuestionsSection from '../questionsSection/QuestionsSection';

interface ListeningSectionProps {
  listeningFiles: TestListening[];
  selectedFile: TestListening | null;
  onSelectFile: (fileId: number) => void;
  onFileChange: (audio: string, transcript: string) => void;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  listeningFiles,
  selectedFile,
  onSelectFile,
  onFileChange,
}) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  if (!selectedFile) return null;

  const handleAudioChange = (newAudio: string) => {
    onFileChange(newAudio, selectedFile.transcript);
  };

  return (
    <Box id="listening-section">
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <HeadphonesIcon />
            <Typography variant="h5" sx={{ ml: 1 }}>Listening Section</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />


          {listeningFiles.length > 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs
                value={listeningFiles.findIndex(file => file.id === selectedFile.id)}
                onChange={(event, newValue) => {
                  if (listeningFiles[newValue]) {
                    onSelectFile(listeningFiles[newValue].id);
                  }
                }}
                aria-label="listening files tabs"
              >
                {listeningFiles.map((file, index) => (
                  <Tab
                    key={file.id}
                    label={`Listening ${index + 1}`}
                    id={`listening-tab-${index}`}
                    aria-controls={`listening-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          <Stack spacing={3}>
            <ListeningAudioSection
              audio={selectedFile.audio}
              onAudioChange={handleAudioChange}
              onSave={() => {}} // Placeholder for save functionality if needed
            />

            {selectedFile.questions && selectedFile.questions.length > 0 ? (
              <QuestionsSection questions={selectedFile.questions} />
            ) : (
              <Box
                sx={{
                  p: 4,
                  backgroundColor: secondaryBgColor,
                  borderRadius: '0.75rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '200px',
                }}
              >
                <DescriptionIcon sx={{ fontSize: 48, color: secondaryTextColor, mb: 2 }} />
                <span style={{ color: secondaryTextColor }}>No questions found for this listening.</span>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ListeningSection;