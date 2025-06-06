import { Box, Typography, LinearProgress, Fade, Paper } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState, useRef } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import SchoolIcon from "@mui/icons-material/School";
import GradingIcon from "@mui/icons-material/Grading";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface LoadingStep {
  id: number;
  label: string;
  icon: React.ReactElement;
  duration: number;
}

interface LoadingWritingProps {
  onComplete: () => void;
  isLoading: boolean;
}

export default function LoadingWriting({
  onComplete,
  isLoading,
}: LoadingWritingProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isSlowingDown, setIsSlowingDown] = useState(false);

  const steps: LoadingStep[] = [
    {
      id: 0,
      label: "Uploading your essay",
      icon: <CloudUploadIcon sx={{ fontSize: 28 }} />,
      duration: 1500,
    },
    {
      id: 1,
      label: "Analyzing writing structure",
      icon: <EditIcon sx={{ fontSize: 28 }} />,
      duration: 2500,
    },
    {
      id: 2,
      label: "Checking grammar & vocabulary",
      icon: <SpellcheckIcon sx={{ fontSize: 28 }} />,
      duration: 3000,
    },
    {
      id: 3,
      label: "Evaluating coherence & cohesion",
      icon: <AutoFixHighIcon sx={{ fontSize: 28 }} />,
      duration: 2800,
    },
    {
      id: 4,
      label: "Assessing task achievement",
      icon: <SchoolIcon sx={{ fontSize: 28 }} />,
      duration: 2700,
    },
    {
      id: 5,
      label: "Generating detailed feedback",
      icon: <GradingIcon sx={{ fontSize: 28 }} />,
      duration: 3200,
    },
    {
      id: 6,
      label: "Finalizing your score",
      icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
      duration: 1500,
    },
  ];

  const fastComplete = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsFinishing(true);
    const startProgress = progress;
    const startTime = performance.now();
    const duration = 1000;

    const animateFast = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progressPercent = Math.min(
        startProgress + (100 - startProgress) * (elapsed / duration),
        100
      );
      setProgress(progressPercent);

      const stepProgress = (progressPercent / 100) * steps.length;
      const currentStepIndex = Math.floor(stepProgress);
      setCurrentStep(Math.min(currentStepIndex, steps.length - 1));

      if (progressPercent < 100) {
        animationRef.current = requestAnimationFrame(animateFast);
      } else {
        setTimeout(() => onComplete(), 300);
      }
    };

    animationRef.current = requestAnimationFrame(animateFast);
  };

  useEffect(() => {
    if (!isLoading && progress < 100) {
      fastComplete();
      return;
    }

    if (isLoading) {
      totalDurationRef.current = steps.reduce(
        (acc, step) => acc + step.duration,
        0
      );
      startTimeRef.current = performance.now();

      const animateProgress = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed = timestamp - startTimeRef.current;
        let newProgress = Math.min(
          (elapsed / totalDurationRef.current) * 100,
          100
        );

        // Slow down at 85% progress when isLoading is still true
        if (newProgress >= 85 && isLoading) {
          if (!isSlowingDown) {
            setIsSlowingDown(true);
          }

          // Apply exponential slowdown - much slower progression after 85%
          const remainingProgress = newProgress - 85;
          const slowdownFactor = 0.2; // Very slow progression
          const adjustedProgress = 85 + remainingProgress * slowdownFactor;
          newProgress = Math.min(adjustedProgress, 95); // Cap at 95% while still loading
        }

        setProgress(newProgress);

        let accumulated = 0;
        for (let i = 0; i < steps.length; i++) {
          accumulated += steps[i].duration;

          // Adjust accumulated time for slowdown
          let adjustedAccumulated = accumulated;
          if (newProgress >= 85 && isLoading) {
            const baseTime = totalDurationRef.current * 0.85;
            if (accumulated > baseTime) {
              adjustedAccumulated = baseTime + (accumulated - baseTime) * 5; // Stretch the time
            }
          }

          if (elapsed <= adjustedAccumulated) {
            if (i !== currentStep) setCurrentStep(i);
            break;
          }
        }

        // Continue animation if still loading or not at slowdown threshold
        if (isLoading || newProgress < 85) {
          animationRef.current = requestAnimationFrame(animateProgress);
        }
      };

      animationRef.current = requestAnimationFrame(animateProgress);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading, isSlowingDown]);

  // Reset slowdown state when isLoading changes
  useEffect(() => {
    if (!isLoading) {
      setIsSlowingDown(false);
    }
  }, [isLoading]);

  // Dynamic gradient background based on progress
  const getGradientBackground = () => {
    const gradientColors = isDarkMode
      ? [
          `${color.blue800}20`,
          `${color.teal800}20`,
          `${color.blue700}20`,
          `${color.teal700}20`,
        ]
      : [
          `${color.blue100}40`,
          `${color.teal100}40`,
          `${color.blue200}40`,
          `${color.teal200}40`,
        ];

    const angle = 135 + progress * 2;
    return `linear-gradient(${angle}deg, ${gradientColors.join(", ")})`;
  };

  const getEstimatedTime = () => {
    if (isFinishing) return "Finishing up...";

    if (isSlowingDown && isLoading) {
      return "Almost done...";
    }

    const elapsed = Math.max(0, (totalDurationRef.current * progress) / 100000);
    return `${Math.floor(elapsed)} seconds`;
  };

  const getMotivationalText = () => {
    if (isFinishing) return "Preparing your detailed feedback...";

    if (isSlowingDown && isLoading) {
      return "Finalizing your writing assessment...";
    }

    if (progress < 15) return "Starting essay analysis...";
    if (progress < 35) return "Examining writing structure...";
    if (progress < 55) return "Checking language accuracy...";
    if (progress < 75) return "Evaluating coherence...";
    if (progress < 90) return "Assessing task response...";
    return "Generating personalized feedback...";
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode
          ? "rgba(17, 24, 39, 0.05)"
          : "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(2px)",
        zIndex: 9999,
        overflow: "hidden",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Animated background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getGradientBackground(),
          opacity: 0.3,
          transition: "all 1.5s ease",
        }}
      />

      {/* Main content */}
      <Paper
        elevation={12}
        sx={{
          position: "relative",
          p: { xs: 3, md: 4 },
          maxWidth: 520,
          width: "90%",
          bgcolor: isDarkMode ? color.gray800 : color.white,
          borderRadius: 3,
          boxShadow: isDarkMode
            ? `0 25px 70px ${color.black}60`
            : `0 25px 70px ${color.gray500}30`,
          overflow: "hidden",
          transform: "scale(1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Icon container with animation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 4,
            position: "relative",
          }}
        >
          {/* Ripple effect using CSS animation */}
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: `2px solid ${isDarkMode ? color.blue600 : color.blue400}`,
              opacity: 0,
              animation: isSlowingDown
                ? "ripple-slow 4s infinite"
                : "ripple 3s infinite",
              "@keyframes ripple": {
                "0%": {
                  transform: "scale(0.8)",
                  opacity: 0.4,
                },
                "70%": {
                  opacity: 0.1,
                },
                "100%": {
                  transform: "scale(1.6)",
                  opacity: 0,
                },
              },
              "@keyframes ripple-slow": {
                "0%": {
                  transform: "scale(0.8)",
                  opacity: 0.3,
                },
                "70%": {
                  opacity: 0.08,
                },
                "100%": {
                  transform: "scale(1.4)",
                  opacity: 0,
                },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: `2px solid ${isDarkMode ? color.blue600 : color.blue400}`,
              opacity: 0,
              animation: isSlowingDown
                ? "ripple-slow 4s infinite 1.5s"
                : "ripple 3s infinite 1s",
            }}
          />

          {/* Main icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: isDarkMode ? color.blue700 : color.blue500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color.white,
              boxShadow: `0 8px 32px ${
                isDarkMode ? color.blue800 : color.blue600
              }70`,
              position: "relative",
              zIndex: 1,
              animation: isSlowingDown
                ? "pulse-slow 3s infinite"
                : "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  transform: "scale(1)",
                  boxShadow: `0 8px 32px ${
                    isDarkMode ? color.blue800 : color.blue600
                  }70`,
                },
                "50%": {
                  transform: "scale(1.05)",
                  boxShadow: `0 12px 40px ${
                    isDarkMode ? color.blue700 : color.blue500
                  }90`,
                },
                "100%": {
                  transform: "scale(1)",
                  boxShadow: `0 8px 32px ${
                    isDarkMode ? color.blue800 : color.blue600
                  }70`,
                },
              },
              "@keyframes pulse-slow": {
                "0%": {
                  transform: "scale(1)",
                  boxShadow: `0 8px 32px ${
                    isDarkMode ? color.blue800 : color.blue600
                  }70`,
                },
                "50%": {
                  transform: "scale(1.02)",
                  boxShadow: `0 10px 36px ${
                    isDarkMode ? color.blue700 : color.blue500
                  }80`,
                },
                "100%": {
                  transform: "scale(1)",
                  boxShadow: `0 8px 32px ${
                    isDarkMode ? color.blue800 : color.blue600
                  }70`,
                },
              },
            }}
          >
            <Fade in={true} timeout={500}>
              {steps[currentStep].icon}
            </Fade>
          </Box>
        </Box>

        {/* Step label */}
        <Typography
          variant="h6"
          align="center"
          sx={{
            color: isDarkMode ? color.white : color.gray900,
            mb: 1,
            fontWeight: 600,
            minHeight: 32,
            transition: "all 0.3s ease",
          }}
        >
          <Fade in={true} key={currentStep} timeout={500}>
            <span>{steps[currentStep].label}</span>
          </Fade>
        </Typography>

        {/* Progress info */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
          >
            {Math.round(progress)}% complete
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
            }}
          >
            {getEstimatedTime()}
          </Typography>
        </Box>

        {/* Progress bar */}
        <Box sx={{ mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: isDarkMode ? color.gray700 : color.gray200,
              transition: "all 0.5s ease",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                background: isDarkMode
                  ? `linear-gradient(90deg, ${color.blue600}, ${color.teal600})`
                  : `linear-gradient(90deg, ${color.blue500}, ${color.teal500})`,
                transition: isSlowingDown
                  ? "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              },
            }}
          />
        </Box>

        {/* Steps indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            position: "relative",
            mb: 3,
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={step.id}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor:
                    index <= currentStep
                      ? isDarkMode
                        ? color.blue400
                        : color.blue600
                      : isDarkMode
                      ? color.gray600
                      : color.gray300,
                  transition: "all 0.5s ease",
                  mb: 1,
                  boxShadow:
                    index === currentStep
                      ? `0 0 0 4px ${
                          isDarkMode ? color.blue700 : color.blue200
                        }`
                      : "none",
                }}
              />
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    width: `calc(100% / ${steps.length} - 20px)`,
                    height: 3,
                    bgcolor:
                      index < currentStep
                        ? isDarkMode
                          ? color.blue600
                          : color.blue400
                        : isDarkMode
                        ? color.gray700
                        : color.gray300,
                    top: 6,
                    left: `calc(${
                      (index + 0.5) * (100 / steps.length)
                    }% + 5px)`,
                    transition: "all 0.5s ease",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Motivational text */}
        <Typography
          variant="caption"
          align="center"
          sx={{
            display: "block",
            mt: 2,
            color: isDarkMode ? color.gray500 : color.gray500,
            fontStyle: "italic",
            transition: "all 0.3s ease",
          }}
        >
          {getMotivationalText()}
        </Typography>
      </Paper>

      {/* Decorative elements */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: 40 + i * 30,
            height: 40 + i * 30,
            borderRadius: "50%",
            bgcolor: isDarkMode ? color.blue800 : color.blue200,
            opacity: 0.05 + i * 0.03,
            animation: isSlowingDown
              ? `float-slow ${12 + i * 3}s ease-in-out infinite`
              : `float ${8 + i * 2}s ease-in-out infinite`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 10}%`,
            "@keyframes float": {
              "0%, 100%": { transform: `translateY(0px) rotate(${i * 45}deg)` },
              "50%": {
                transform: `translateY(${-15 - i * 5}px) rotate(${
                  i * 45 + 180
                }deg)`,
              },
            },
            "@keyframes float-slow": {
              "0%, 100%": { transform: `translateY(0px) rotate(${i * 45}deg)` },
              "50%": {
                transform: `translateY(${-10 - i * 3}px) rotate(${
                  i * 45 + 90
                }deg)`,
              },
            },
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </Box>
  );
}
