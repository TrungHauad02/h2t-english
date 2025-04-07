import React from 'react'; 
import { 
  Box, 
  Paper, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Divider,
  Stack
} from '@mui/material'; 
import { TestWriting } from 'interfaces';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import WritingDocumentSection from './WritingDocumentSection'; 

interface WritingSectionProps {
  writingTopics: TestWriting[];
  selectedTopic: TestWriting | null;
  onSelectTopic: (topicId: number) => void;
  onTopicChange: (topic: string, minWords: number, maxWords: number) => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  writingTopics,
  selectedTopic,
  onSelectTopic,
  onTopicChange,
}) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  if (writingTopics.length === 0) return null;

  return (
    <Box id="writing-section">
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CreateIcon />
            <Typography variant="h5" sx={{ ml: 1 }}>Writing Section</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          

          {writingTopics.length > 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs
                value={writingTopics.findIndex(topic => topic.id === selectedTopic?.id)}
                onChange={(event, newValue) => {
                  if (writingTopics[newValue]) {
                    onSelectTopic(writingTopics[newValue].id);
                  }
                }}
                aria-label="writing topics tabs"
              >
                {writingTopics.map((topic, index) => (
                  <Tab
                    key={topic.id}
                    label={`Writing ${index + 1}`}
                    id={`writing-tab-${index}`}
                    aria-controls={`writing-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          <Stack spacing={3}>
            {selectedTopic ? (
              <WritingDocumentSection
                documentUrl={selectedTopic.topic}
                onDocumentChange={(base64, minWords, maxWords) => {
                  onTopicChange(base64, minWords, maxWords);
                }}
              />
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
                <span style={{ color: secondaryTextColor }}>No writing topic found.</span>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WritingSection;