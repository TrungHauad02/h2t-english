import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { ToeicPart6, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from "components/display/document/WEDocumentViewer";
type Props = {
  questionNumberStart: number;
  question: ToeicPart6;
  selectedAnswers: Record<string, AnswerEnum>;
  onChange: (questionKey: string, value: AnswerEnum) => void;
};

const Part6Item: React.FC<Props> = ({
  questionNumberStart,
  question,
  selectedAnswers,
  onChange,
}) => {
  return (
    <Box
      sx={{
        width:"90vw",
        maxHeight: '60vh',
        border: '2px solid #03a9f4',
        borderRadius: 1,
        bgcolor: 'white',
      }}
    >
      <Box sx={{ bgcolor: '#03a9f4', color: 'white', px: 2, py: 1 }}>
        <Typography fontWeight="bold">Questions {questionNumberStart}–{questionNumberStart + 3}</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, px: 3, py: 2, }}>
        <Box flex={1}>
        <WEDocumentViewer fileUrl={question.file} lineHeight="2" sx={{ my: 2 }} />
        </Box>
        <Box flex={1} sx={{overflowY: 'auto',
        maxHeight: '50vh' }} >
          {[1, 2, 3, 4].map((num) => {
            const questionKey = `${question.id}-Q${num}`;
            const content = question[`contentQuestion${num}` as keyof ToeicPart6];
            const answers = [
              question[`answer1Q${num}` as keyof ToeicPart6],
              question[`answer2Q${num}` as keyof ToeicPart6],
              question[`answer3Q${num}` as keyof ToeicPart6],
              question[`answer4Q${num}` as keyof ToeicPart6],
            ];
            return (
              <Box key={num} mb={3}>
                <Typography mb={1}>
                  {questionNumberStart + num - 1}. {String(content)}
                </Typography>
                <RadioGroup
                  name={questionKey}
                  value={selectedAnswers[questionKey] || ''}
                  onChange={(e) => onChange(questionKey, e.target.value as AnswerEnum)}
                >
                  {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((choice, idx) => (
                    <FormControlLabel
                      key={choice}
                      value={choice}
                      control={<Radio />}
                      label={`${choice}. ${answers[idx]}`}
                    />
                  ))}
                </RadioGroup>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Part6Item;
