import React, {  } from 'react';
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
import { TestReading } from 'interfaces';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import SubjectIcon from '@mui/icons-material/Subject';
import DescriptionIcon from '@mui/icons-material/Description';
import ReadingDocumentSection from './ReadingDocumentSection';
import QuestionsSection from '../questionsSection/QuestionsSection';
interface ReadingSectionProps {
  readingFiles: TestReading[];
  selectedFile: TestReading | null;
  onSelectFile: (fileId: number) => void;
  onFileChange: (base64: string) => void;

}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  readingFiles,
  selectedFile,
  onSelectFile,
  onFileChange,

}) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const secondaryBgColor = isDarkMode ? color.gray900 : color.gray100;
  const secondaryTextColor = isDarkMode ? color.gray400 : color.gray600;

  if (!selectedFile) return null;

  return (
    <Box id="reading-section">
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SubjectIcon />
            <Typography variant="h5" sx={{ ml: 1 }}>Reading Section</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          {readingFiles.length > 1 && (
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs
                value={readingFiles.findIndex(file => file.id === selectedFile.id)}
                onChange={(event, newValue) => {
                  if (readingFiles[newValue]) {
                    onSelectFile(readingFiles[newValue].id);
                  }
                }}
                aria-label="reading files tabs"
              >
                {readingFiles.map((file, index) => (
                  <Tab
                    key={file.id}
                    label={`Reading ${index + 1}`}
                    id={`reading-tab-${index}`}
                    aria-controls={`reading-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          <Stack spacing={3}>
            <ReadingDocumentSection
              documentUrl={selectedFile.file}
              onDocumentChange={onFileChange}
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
                <span style={{ color: secondaryTextColor }}>No questions found for this reading.</span>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReadingSection;