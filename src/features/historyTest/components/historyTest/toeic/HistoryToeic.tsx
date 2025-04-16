import React, { useState } from 'react';
import { Box, Typography, Button, Dialog } from '@mui/material';

import ListeningPart1List from './part1/ListeningPart1List';
import ListeningPart2List from './part2/ListeningPart2List';
import ListeningPart3And4List from './part3And4/ListeningPart3And4List';
import Part5List from './part5/Part5List';
import Part6List from './part6/Part6List';
import Part7List from './part7/Part7List';
import CommentToeic from './common/CommentToeic';

import {
  Toeic,
  SubmitToeic,
  SubmitToeicPart1,
  SubmitToeicPart2,
  SubmitToeicAnswer,
} from 'interfaces';
import { testService } from 'features/test/services/testServices';

const getPartStartIndex = (step: number): number => {
  switch (step) {
    case 1: return 1;
    case 2: return 7;
    case 3: return 32;
    case 4: return 71;
    case 5: return 101;
    case 6: return 131;
    case 7: return 147;
    default: return 0;
  }
};

const HistoryToeic: React.FC<{
  toeic: Toeic;
  submitToeic: SubmitToeic;
  submitToeicPart1: SubmitToeicPart1[];
  submitToeicPart2: SubmitToeicPart2[];
  submitToeicAnswers: SubmitToeicAnswer[];
}> = ({
  toeic,
  submitToeic,
  submitToeicPart1,
  submitToeicPart2,
  submitToeicAnswers,
}) => {
  const [step, setStep] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const getSectionTitle = () => {
    switch (step) {
      case 1: return 'LISTENING PART 1';
      case 2: return 'LISTENING PART 2';
      case 3: return 'LISTENING PART 3';
      case 4: return 'LISTENING PART 4';
      case 5: return 'READING PART 5';
      case 6: return 'READING PART 6';
      case 7: return 'READING PART 7';
      default: return '';
    }
  };

  const getTotalQuestionsForCurrentStep = async () => {
    switch (step) {
      case 1: return toeic.questionsPart1.length;
      case 2: return toeic.questionsPart2.length;
      case 3: return toeic.questionsPart3.length;
      case 4: return toeic.questionsPart4.length;
      case 5: return toeic.questionsPart5.length;
      case 6: return toeic.questionsPart6.length;
      case 7: {
        const part7s = await testService.getToeicPart7ByIds(toeic.questionsPart7);
        return part7s.reduce((acc, p7) => acc + p7.questions.length, 0);
      }
      default: return 0;
    }
  };

  const filterSubmitAnswer = (part: number[]) =>
    submitToeicAnswers.filter(a => part.includes(a.toeicQuestionId));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ListeningPart1List
            questionsPart1={toeic.questionsPart1}
            startIndex={1}
            submitToeicPart1={submitToeicPart1}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      case 2:
        return (
          <ListeningPart2List
            questionsPart2={toeic.questionsPart2}
            startIndex={7}
            submitToeicPart2={submitToeicPart2}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      case 3:
        return (
          <ListeningPart3And4List
            questions={toeic.questionsPart3}
            startIndex={32}
            submitToeicPart3_4={filterSubmitAnswer(toeic.questionsPart3)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      case 4:
        return (
          <ListeningPart3And4List
            questions={toeic.questionsPart4}
            startIndex={71}
            submitToeicPart3_4={filterSubmitAnswer(toeic.questionsPart4)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      case 5:
        return (
          <Part5List
            questionsPart5={toeic.questionsPart5}
            startIndex={101}
            submitToeicPart5={filterSubmitAnswer(toeic.questionsPart5)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      case 6:
        return (
          <Part6List
            questionsPart6={toeic.questionsPart6}
            startIndex={131}
            submitToeicPart6={filterSubmitAnswer(toeic.questionsPart6)}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      case 7:
        return (
          <Part7List
            questionsPart7={toeic.questionsPart7}
            startIndex={147}
            submitToeicPart7={filterSubmitAnswer(
              submitToeicAnswers.map((a) => a.toeicQuestionId)
            )}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        );
      default:
        return <Typography>Coming soon...</Typography>;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", width: '100%', display: 'flex', flexDirection: 'column', pt: { xs: 10, sm: 12 }, fontFamily: 'Roboto, sans-serif' }}>
      <Box sx={{ width: 'auto', bgcolor: '#00aaff', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 1, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight="bold">{getSectionTitle()}</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontWeight="bold">Score: {submitToeic.score}</Typography>
          <Button variant="contained" size="small" onClick={() => window.location.reload()}>Test Again</Button>
        </Box>
      </Box>

      {/* NAVIGATION BAR */}
      <Box sx={{ width: 'auto', bgcolor: '#00b0ff', py: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, px: 2 }}>
        <Button variant="contained" onClick={() => {
          if (currentIndex === 0 && step > 1) {
            setStep((prev) => prev - 1);
            const prevStart = getPartStartIndex(step - 1);
            const prevTotal = getPartStartIndex(step) - prevStart;
            setCurrentIndex(prevTotal - 1);
          } else if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
          }
        }} disabled={step === 1 && currentIndex === 0}>BACK</Button>

        <Button variant="outlined" color="inherit" onClick={() => setOpenDialog(true)}>Q{getPartStartIndex(step) + currentIndex}</Button>

        <Button variant="contained" onClick={async () => {
          const total = await getTotalQuestionsForCurrentStep();
          if (currentIndex < total - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else if (step < 7) {
            setStep((prev) => prev + 1);
            setCurrentIndex(0);
          }
        }} disabled={step === 7 && currentIndex === 53}>NEXT</Button>
      </Box>

      {/* DIALOG CHỌN CÂU HỎI */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box sx={{ p: 2, maxWidth: 400 }}>
          <Typography variant="h6" mb={2}>Chọn câu hỏi</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {Array.from({ length: 200 }, (_, i) => (
              <Button
                key={i + 1}
                size="small"
                variant={getPartStartIndex(step) + currentIndex === i + 1 ? 'contained' : 'outlined'}
                onClick={() => {
                  const q = i + 1;
                  const newStep = q < 7 ? 1 : q < 32 ? 2 : q < 71 ? 3 : q < 101 ? 4 : q < 131 ? 5 : q < 147 ? 6 : 7;
                  setStep(newStep);
                  setCurrentIndex(q - getPartStartIndex(newStep));
                  setOpenDialog(false);
                }}
              >
                {i + 1}
              </Button>
            ))}
          </Box>
        </Box>
      </Dialog>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {renderStep()}
        <CommentToeic comment={submitToeic.comment} />
      </Box>
    </Box>
  );
};

export default HistoryToeic;
