import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, IconButton, Button } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useDispatch } from 'react-redux';
import { hideLayout, showLayout } from '../../../../redux/slices/layoutSlice';

import VolumeTestStep from './introduce/VolumeTestStep';
import DirectionsStep from './introduce/DirectionsStep';
import ListeningPart1Step from './part1/ListeningPart1Step';
import ListeningPart1List from './part1/ListeningPart1List';
import ListeningPart2List from './part2/ListeningPart2List';
import ListeningPart3And4List from './part3And4/ListeningPart3And4List';
import Part5List from './part5/Part5List';
import Part6List from './part6/Part6List';
import Part7List from './part7/Part7List';

import { Toeic } from 'interfaces/TestInterfaces';


type Props = {
  toeic: Toeic;
};

const ToeicTest: React.FC<Props> = ({ toeic }) => {
  const [volume, setVolume] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (step === 6) {
      setCountdown(60 * 60);
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

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleFullScreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
      dispatch(hideLayout());
    } else {
      document.exitFullscreen();
      dispatch(showLayout());
    }
    setIsFullscreen(!isFullscreen);
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

  const getTotalCurrentPartItems = () => {
    switch (step) {
      case 7: return toeic.questionsPart5.length;
      case 8: return toeic.questionsPart6.length;
      case 9: return toeic.questionsPart7.length;
      default: return 0;
    }
  };

  const nextReading = () => {
    const total = getTotalCurrentPartItems();
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStep((prev) => prev + 1);
      setCurrentIndex(0);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <VolumeTestStep />;
      case 1: return <DirectionsStep />;
      case 2: return <ListeningPart1Step />;
      case 3: return <ListeningPart1List questionsPart1={toeic.questionsPart1} startIndex={1} onFinish={() => setStep(4)} />;
      case 4: return <ListeningPart2List questionsPart2={toeic.questionsPart2} startIndex={7} onFinish={() => setStep(5)} />;
      case 5: return <ListeningPart3And4List questions={toeic.questionsPart3} startIndex={32} onFinish={() => setStep(6)} />;
      case 6: return <ListeningPart3And4List questions={toeic.questionsPart4} startIndex={71} onFinish={() => setStep(7)} />;
      case 7: return <Part5List questionsPart5={toeic.questionsPart5} startIndex={101} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} onFinish={() => setStep(8)} />;
      case 8: return <Part6List questionsPart6={toeic.questionsPart6} startIndex={131} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} onFinish={() => setStep(9)} />;
      case 9: return <Part7List questionsPart7={toeic.questionsPart7} startIndex={147} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} onFinish={() => {}} />;
      default: return <Typography>Coming soon...</Typography>;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", width: '100%', display: 'flex', flexDirection: 'column', pt: { xs: 10, sm: 12 }, fontFamily: 'Roboto, sans-serif' }}>
      <Box sx={{ width: 'auto', bgcolor: '#00aaff', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1, boxShadow: 2 }}>
        <Typography variant="h6" fontWeight="bold">TOEIC</Typography>
        <Typography variant="h6" fontWeight="bold">{getSectionTitle()}</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {[7, 8, 9].includes(step) && countdown !== null ? (
            <Typography fontWeight="bold" fontSize="1.2rem">
              {formatTime(countdown)}
            </Typography>
          ) : [3, 4, 5, 6].includes(step) ? (
            <>
              <VolumeUpIcon />
              <Slider value={volume} onChange={handleVolumeChange} sx={{ width: 100, color: 'white' }} />
              <Button variant="contained" size="small" sx={{ ml: 2 }} onClick={() => setStep((prev) => prev + 1)}>Submit</Button>
            </>
          ) : (
            <>
              <VolumeUpIcon />
              <Slider value={volume} onChange={handleVolumeChange} sx={{ width: 100, color: 'white' }} />
            </>
          )}
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {renderStep()}
      </Box>

      <Box sx={{ width: 'auto', bgcolor: '#00b0ff', py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3 }}>
        {[7, 8, 9].includes(step) ? (
          <Button onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))} variant="contained">
            BACK
          </Button>
        ) : <Box width={100} />}
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={toggleFullScreen} sx={{ bgcolor: 'white', width: 48, height: 48, '&:hover': { bgcolor: '#e0f7fa' } }}>
            <FullscreenIcon sx={{ color: 'black' }} />
          </IconButton>
          <Typography fontWeight="bold" mt={1} color="white">Full screen</Typography>
        </Box>
        {[7, 8, 9].includes(step) ? (
          <Button onClick={nextReading} variant="contained">
            NEXT
          </Button>
        ) : (
          step !== 9 ? (
            <Button variant="contained" onClick={() => setStep((prev) => prev + 1)}>
              NEXT
            </Button>
          ) : (
            <Box width={100} />
          )
        )}
      </Box>
    </Box>
  );
};

export default ToeicTest;
