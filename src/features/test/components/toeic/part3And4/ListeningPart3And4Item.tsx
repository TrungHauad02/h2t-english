import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { AnswerEnum, ToeicPart3_4 } from 'interfaces/TestInterfaces';

type Props = {
  questionNumberStart: number;
  data: ToeicPart3_4;
  selectedAnswers: Record<string, AnswerEnum>;
  onChange: (questionKey: string, value: AnswerEnum) => void;
  onAudioEnded: () => void;
};

const ListeningPart3And4Item: React.FC<Props> = ({
  questionNumberStart,
  data,
  selectedAnswers,
  onChange,
  onAudioEnded
}) => {
  return (
    <Box
      sx={{
        width: '80vw',
        maxHeight: '60vh',
        overflowY: 'auto',
        border: '2px solid #03a9f4',
        borderRadius: 2,
        bgcolor: 'white',
        p: 3,
        boxShadow: 3,
      }}
    >
      <audio src={data.audio} autoPlay onEnded={onAudioEnded} style={{ display: 'none' }} />

      <Typography fontWeight="bold" mb={2}>
        Choose the correct answer.
      </Typography>

      {[1, 2, 3].map((num) => {
        const questionKey = `${data.id}-Q${num}`;
        const content = data[`contentQuestion${num}` as keyof ToeicPart3_4];
        const answers = [
          data[`answer1Q${num}` as keyof ToeicPart3_4],
          data[`answer2Q${num}` as keyof ToeicPart3_4],
          data[`answer3Q${num}` as keyof ToeicPart3_4],
          data[`answer4Q${num}` as keyof ToeicPart3_4]
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
  );
};

export default ListeningPart3And4Item;
