import { Box, IconButton, alpha } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Quote } from "interfaces";
import { useState, useEffect, useRef } from "react";
import QuoteCard from "./QuoteCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface QuoteCarouselProps {
  quotes: Quote[];
}

export default function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-rotate quotes every 8 seconds
  useEffect(() => {
    if (quotes.length <= 1) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [quotes.length, isAnimating]);

  const handlePrev = () => {
    if (quotes.length <= 1 || isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match with animation duration
  };

  const handleNext = () => {
    if (quotes.length <= 1 || isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match with animation duration
  };

  // Animation classes based on direction
  const getAnimationClass = () => {
    if (direction === 0) return "";
    return direction > 0 ? "slide-in-right" : "slide-in-left";
  };

  return (
    <Box sx={{ position: "relative", my: 4, px: 2 }}>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: -20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: isDarkMode
            ? alpha(color.gray800, 0.7)
            : alpha(color.gray100, 0.7),
          backdropFilter: "blur(4px)",
          "&:hover": {
            backgroundColor: isDarkMode
              ? alpha(color.gray700, 0.9)
              : alpha(color.gray200, 0.9),
          },
          boxShadow: `0 4px 12px ${alpha(color.black, 0.1)}`,
        }}
        disabled={isAnimating}
      >
        <ChevronLeftIcon
          sx={{ color: isDarkMode ? color.teal300 : color.teal600 }}
        />
      </IconButton>

      <Box
        sx={{
          height: { xs: 300, sm: 300 },
          overflow: "hidden",
          position: "relative",
          "@keyframes slideInRight": {
            "0%": {
              transform: "translateX(300px)",
              opacity: 0,
            },
            "100%": {
              transform: "translateX(0)",
              opacity: 1,
            },
          },
          "@keyframes slideInLeft": {
            "0%": {
              transform: "translateX(-300px)",
              opacity: 0,
            },
            "100%": {
              transform: "translateX(0)",
              opacity: 1,
            },
          },
          ".slide-in-right": {
            animation: "slideInRight 0.5s forwards",
          },
          ".slide-in-left": {
            animation: "slideInLeft 0.5s forwards",
          },
        }}
      >
        <Box
          ref={carouselRef}
          className={getAnimationClass()}
          sx={{
            position: "absolute",
            width: "100%",
            opacity: direction === 0 ? 1 : 0, // Initial opacity for first render
          }}
        >
          <Box sx={{ px: 1 }}>
            {quotes.length > 0 && (
              <QuoteCard quote={quotes[currentIndex]} index={currentIndex} />
            )}
          </Box>
        </Box>
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: -20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: isDarkMode
            ? alpha(color.gray800, 0.7)
            : alpha(color.gray100, 0.7),
          backdropFilter: "blur(4px)",
          "&:hover": {
            backgroundColor: isDarkMode
              ? alpha(color.gray700, 0.9)
              : alpha(color.gray200, 0.9),
          },
          boxShadow: `0 4px 12px ${alpha(color.black, 0.1)}`,
        }}
        disabled={isAnimating}
      >
        <ChevronRightIcon
          sx={{ color: isDarkMode ? color.teal300 : color.teal600 }}
        />
      </IconButton>

      {/* Pagination dots */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {quotes.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
              setTimeout(() => {
                setIsAnimating(false);
              }, 500);
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              mx: 0.5,
              backgroundColor:
                currentIndex === index
                  ? isDarkMode
                    ? color.teal400
                    : color.teal600
                  : isDarkMode
                  ? color.gray700
                  : color.gray300,
              cursor: isAnimating ? "default" : "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: isAnimating ? "none" : "scale(1.2)",
                backgroundColor: isAnimating
                  ? currentIndex === index
                    ? isDarkMode
                      ? color.teal400
                      : color.teal600
                    : isDarkMode
                    ? color.gray700
                    : color.gray300
                  : isDarkMode
                  ? color.teal300
                  : color.teal500,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
