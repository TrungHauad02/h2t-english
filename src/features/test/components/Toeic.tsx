import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  alpha,
  Fade,
  Button,
  Slider
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerIcon from '@mui/icons-material/Timer';
import HeadsetIcon from '@mui/icons-material/Headset';
import { useDarkMode } from 'hooks/useDarkMode';
import useColor from 'theme/useColor';
import { Toeic } from 'interfaces/TestInterfaces';

import VolumeTestStep from './toeic/introduce/VolumeTestStep';
import DirectionsStep from './toeic/introduce/DirectionsStep';
import ListeningPart1Step from './toeic/part1/ListeningPart1Step';
import ListeningPart1List from './toeic/part1/ListeningPart1List';
import ListeningPart2List from './toeic/part2/ListeningPart2List';
import ListeningPart3And4List from './toeic/part3And4/ListeningPart3And4List';
import Part5List from './toeic/part5/Part5List';
import Part6List from './toeic/part6/Part6List';
import Part7List from './toeic/part7/Part7List';

type Props = {
  toeic: Toeic;
  submitToeicId: number;
};

const ToeicTest: React.FC<Props> = ({ toeic, submitToeicId }) => {
  const [volume, setVolume] = useState(50);
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (step === 7) { // Start countdown for Reading Section
      setCountdown(75 * 60); // 75 minutes for reading
    }
  }, [step]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const getSectionTitle = () => {
    switch (step) {
      case 3: return 'LISTENING PART 1';
      case 4: return 'LISTENING PART 2';
      case 5: return 'LISTENING PART 3';
      case 6: return 'LISTENING PART 4';
      case 7: return 'READING PART 5';
      case 8: return 'READING PART 6';
      case 9: return 'READING PART 7';
      default: return '';
    }
  };

  const getPartInfo = () => {
    switch (step) {
      case 3: return { part: 'Part 1', icon: <HeadsetIcon />, questions: 6 };
      case 4: return { part: 'Part 2', icon: <HeadsetIcon />, questions: 25 };
      case 5: return { part: 'Part 3', icon: <HeadsetIcon />, questions: 39 };
      case 6: return { part: 'Part 4', icon: <HeadsetIcon />, questions: 30 };
      case 7: return { part: 'Part 5', icon: null, questions: 30 };
      case 8: return { part: 'Part 6', icon: null, questions: 16 };
      case 9: return { part: 'Part 7', icon: null, questions: 54 };
      default: return null;
    }
  };

  const getTotalCurrentPartItems = () => {
    switch (step) {
      case 7: return toeic.questionsPart5?.length ?? 0;
      case 8: return toeic.questionsPart6?.length ?? 0;
      case 9: return toeic.questionsPart7?.length ?? 0;
      default: return 0;
    }
  };

  const nextReading = () => {
    const total = getTotalCurrentPartItems();
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (step < 9) {
        setStep((prev) => prev + 1);
        setCurrentIndex(0);
      }
    }
  };

  const prevReading = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <VolumeTestStep />;
      case 1: return <DirectionsStep />;
      case 2: return <ListeningPart1Step />;
      case 3: return <ListeningPart1List 
        questionsPart1={toeic.questionsPart1 ?? []} 
        startIndex={1} 
        onFinish={() => setStep(4)} 
        submitToeicId={submitToeicId}
      />;
      case 4: return <ListeningPart2List 
        questionsPart2={toeic.questionsPart2 ?? []} 
        startIndex={7} 
        onFinish={() => setStep(5)} 
        submitToeicId={submitToeicId}
      />;
      case 5: return <ListeningPart3And4List 
        questions={toeic.questionsPart3 ?? []} 
        startIndex={32} 
        onFinish={() => setStep(6)} 
        submitToeicId={submitToeicId}
      />;
      case 6: return <ListeningPart3And4List 
        questions={toeic.questionsPart4 ?? []} 
        startIndex={71} 
        onFinish={() => setStep(7)} 
        submitToeicId={submitToeicId}
      />;
      case 7: return <Part5List 
        questionsPart5={toeic.questionsPart5 ?? []} 
        startIndex={101} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex} 
        onFinish={() => setStep(8)} 
        submitToeicId={submitToeicId}
      />;
      case 8: return <Part6List 
        questionsPart6={toeic.questionsPart6 ?? []} 
        startIndex={131} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex} 
        onFinish={() => setStep(9)} 
        submitToeicId={submitToeicId}
      />;
      case 9: return <Part7List 
        questionsPart7={toeic.questionsPart7 ?? []} 
        startIndex={147} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex} 
        onFinish={() => {}} 
        submitToeicId={submitToeicId}
      />;
      default: return <Typography>Coming soon...</Typography>;
    }
  };

  const partInfo = getPartInfo();
  const isReadingSection = [7, 8, 9].includes(step);
  const isListeningSection = [3, 4, 5, 6].includes(step);

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: `0 8px 32px ${alpha(isDarkMode ? color.black : color.gray900, 0.1)}`,
      overflow: 'hidden',
      bgcolor: isDarkMode ? color.gray900 : color.white,
    }}>
      {/* Top Bar */}
      <Box
        sx={{
          bgcolor: color.teal500,
          color: color.white,
          px: { xs: 2, md: 3 },
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          TOEIC
        </Typography>
        
        {getSectionTitle() && (
          <Typography variant="h6" fontWeight={600}>
            {getSectionTitle()}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Timer for Reading Section */}
          {isReadingSection && countdown !== null && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimerIcon />
              <Typography fontWeight={600} fontSize="1rem">
                {formatTime(countdown)}
              </Typography>
            </Box>
          )}
          
          {/* Volume Control for Listening Section */}
          {isListeningSection && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VolumeUpIcon sx={{ fontSize: 20 }} />
              <Slider 
                value={volume} 
                onChange={handleVolumeChange} 
                sx={{ 
                  width: 80, 
                  color: color.white,
                  '& .MuiSlider-thumb': {
                    width: 12,
                    height: 12,
                  },
                  '& .MuiSlider-track': {
                    height: 3,
                  },
                  '& .MuiSlider-rail': {
                    height: 3,
                    opacity: 0.5
                  }
                }} 
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Part Information Bar */}
      {partInfo && (
        <Box
          sx={{
            bgcolor: color.emerald500,
            color: color.white,
            px: { xs: 2, md: 3 },
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `linear-gradient(135deg, ${color.emerald500} 0%, ${color.teal500} 100%)`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {partInfo.icon}
            <Typography variant="h5" fontWeight={700}>
              {partInfo.part}
            </Typography>
          </Box>
          
          <Chip
            label={`${partInfo.questions} Questions`}
            sx={{
              bgcolor: alpha(color.white, 0.2),
              color: color.white,
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(color.white, 0.3)}`,
              px: 2,
              height: 32,
              fontSize: '0.9rem'
            }}
          />
        </Box>
      )}

      {/* Main Content Area */}
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 4 },
          bgcolor: isDarkMode ? color.gray800 : color.gray50,
          minHeight: { xs: '60vh', md: '65vh' },
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        <Fade in key={step}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: '1000px',
            mx: 'auto'
          }}>
            {renderStep()}
          </Box>
        </Fade>
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          bgcolor: isDarkMode ? color.gray800 : color.white,
          px: { xs: 2, md: 4 },
          py: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
          gap: 2,
        }}
      >
        {/* Back Button */}
        {isReadingSection ? (
          <Button
            variant="contained"
            onClick={prevReading}
            disabled={step === 7 && currentIndex === 0}
            sx={{
              px: 3,
              py: 1.2,
              bgcolor: color.gray300,
              color: color.gray800,
              fontWeight: 600,
              textTransform: 'uppercase',
              borderRadius: 1,
              minWidth: 100,
              '&:hover': {
                bgcolor: color.gray400,
              },
              '&:disabled': {
                opacity: 0.5
              }
            }}
          >
            Back
          </Button>
        ) : (
          <Box width={100} />
        )}
        
        {/* Next/Submit Button */}
        <Button
          variant="contained"
          onClick={() => {
            if (isReadingSection) {
              nextReading();
            } else {
              setStep((prev) => prev + 1);
            }
          }}
          sx={{
            px: 3,
            py: 1.2,
            bgcolor: step === 9 && currentIndex === getTotalCurrentPartItems() - 1 
              ? color.green600 
              : color.emerald500,
            color: color.white,
            fontWeight: 600,
            textTransform: 'uppercase',
            borderRadius: 1,
            minWidth: 100,
            boxShadow: 2,
            '&:hover': {
              bgcolor: step === 9 && currentIndex === getTotalCurrentPartItems() - 1 
                ? color.green700 
                : color.emerald600,
              boxShadow: 3,
            }
          }}
        >
          {step === 9 && currentIndex === getTotalCurrentPartItems() - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default ToeicTest;