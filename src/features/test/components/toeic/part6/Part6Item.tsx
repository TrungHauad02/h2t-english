import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { ToeicPart6, ToeicQuestion, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';


type Props = {
  questionNumberStart: number;
  passage: ToeicPart6;
  questions: ToeicQuestion[];
  selectedAnswers: Record<number, AnswerEnum>;
  onChange: (questionId: number, value: AnswerEnum) => void;
};

const Part6Item: React.FC<Props> = ({
  questionNumberStart,
  passage,
  questions,
  selectedAnswers,
  onChange,
}) => {
  return (
    <Box
      sx={{
        width: '90vw',
        maxHeight: '60vh',
        border: '2px solid #03a9f4',
        borderRadius: 1,
        bgcolor: 'white',
      }}
    >
      <Box sx={{ bgcolor: '#03a9f4', color: 'white', px: 2, py: 1 }}>
        <Typography fontWeight="bold">
          Questions {questionNumberStart}–{questionNumberStart + questions.length - 1}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, px: 3, py: 2 }}>
        <Box flex={1}>
          <WEDocumentViewer fileUrl={passage.file} lineHeight="2" sx={{ my: 2 }} />
        </Box>
        <Box flex={1} sx={{ overflowY: 'auto', maxHeight: '50vh' }}>
          {questions.map((q, idx) => {
            const number = questionNumberStart + idx;
            const selected = selectedAnswers[q.id];

            return (
              <Box key={q.id} mb={3}>
                <Typography mb={1}>
                  {number}. {q.content}
                </Typography>
                <RadioGroup
                  name={`question-${q.id}`}
                  value={selected || ''}
                  onChange={(e) => onChange(q.id, e.target.value as AnswerEnum)}
                >
                  {q.answers.map((ans, i) => (
                    <FormControlLabel
                      key={ans.id}
                      value={(['A', 'B', 'C', 'D'][i]) as AnswerEnum}
                      control={<Radio />}
                      label={`${(['A', 'B', 'C', 'D'][i])}. ${ans.content}`}
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
