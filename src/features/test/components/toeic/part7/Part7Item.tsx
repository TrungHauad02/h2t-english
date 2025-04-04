import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { ToeicPart7, ToeicPart7Question, AnswerEnum } from 'interfaces/TestInterfaces';
import WEDocumentViewer from 'components/display/document/WEDocumentViewer';

type Props = {
  passage: ToeicPart7;
  questions: ToeicPart7Question[];
  questionNumberStart: number;
  selectedAnswers: Record<number, AnswerEnum>;
  onChange: (id: number, value: AnswerEnum) => void;
};

const Part7Item: React.FC<Props> = ({
  passage,
  questions,
  questionNumberStart,
  selectedAnswers,
  onChange,
}) => {
  return (
    <Box sx={{ width: '90vw', maxHeight: '60vh', border: '2px solid #03a9f4', borderRadius: 1, bgcolor: 'white' }}>
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
          {questions.map((q, idx) => (
            <Box key={q.id} mb={3}>
              <Typography fontWeight="bold" mb={1}>
                {questionNumberStart + idx}. {q.content}
              </Typography>
              <RadioGroup
                name={`question-${q.id}`}
                value={selectedAnswers[q.id] || ''}
                onChange={(e) => onChange(q.id, e.target.value as AnswerEnum)}
              >
                {(['A', 'B', 'C', 'D'] as AnswerEnum[]).map((choice, i) => (
                  <FormControlLabel
                    key={choice}
                    value={choice}
                    control={<Radio />}
                    label={`${choice}. ${q[`answer${i + 1}` as keyof ToeicPart7Question]}`}
                  />
                ))}
              </RadioGroup>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Part7Item;
