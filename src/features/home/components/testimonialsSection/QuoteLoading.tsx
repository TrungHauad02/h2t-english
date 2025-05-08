import { Box, Typography, alpha, keyframes } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useEffect, useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function QuoteLoading() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [loadingText, setLoadingText] = useState("Loading inspiring quotes");

  // List of loading messages for the animation
  const loadingMessages = [
    "Finding wisdom",
    "Collecting thoughts",
    "Gathering inspiration",
    "Exploring insights",
    "Curating knowledge",
    "Seeking perspectives",
    "Compiling wisdom",
  ];

  // Change the loading message every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage =
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      setLoadingText(randomMessage);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Keyframes for animations
  const floatAnimation = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(3deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  `;

  const floatAnimationReverse = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(-5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  `;

  const pulseAnimation = keyframes`
    0% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.7; }
  `;

  const shineAnimation = keyframes`
    0% { background-position: -100px; }
    40% { background-position: 200px; }
    100% { background-position: 200px; }
  `;

  const ellipsisAnimation = keyframes`
    0% { content: ""; }
    25% { content: "."; }
    50% { content: ".."; }
    75% { content: "..."; }
  `;

  return (
    <Box
      sx={{
        height: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "15%",
          width: "60px",
          height: "60px",
          opacity: 0.1,
          animation: `${floatAnimation} 6s ease-in-out infinite`,
        }}
      >
        <FormatQuoteIcon
          sx={{
            fontSize: 60,
            color: isDarkMode ? color.teal300 : color.teal700,
            transform: "rotate(180deg)",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          right: "20%",
          width: "40px",
          height: "40px",
          opacity: 0.1,
          animation: `${floatAnimationReverse} 7s ease-in-out infinite`,
        }}
      >
        <FormatQuoteIcon
          sx={{
            fontSize: 40,
            color: isDarkMode ? color.emerald300 : color.emerald700,
            transform: "rotate(0deg)",
          }}
        />
      </Box>

      {/* Central animated book/page element */}
      <Box
        sx={{
          width: 150,
          height: 110,
          position: "relative",
          mb: 4,
          perspective: "1000px",
        }}
      >
        {/* Book base */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: isDarkMode ? color.gray800 : color.gray100,
            borderRadius: "6px",
            boxShadow: isDarkMode
              ? `0 10px 15px -3px ${alpha(
                  color.black,
                  0.3
                )}, 0 4px 6px -4px ${alpha(color.black, 0.3)}`
              : `0 10px 15px -3px ${alpha(
                  color.black,
                  0.1
                )}, 0 4px 6px -4px ${alpha(color.black, 0.1)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            zIndex: 1,
            animation: `${pulseAnimation} 3s ease-in-out infinite`,
            border: `1px solid ${
              isDarkMode ? alpha(color.teal600, 0.3) : alpha(color.teal400, 0.3)
            }`,
          }}
        >
          <Box
            sx={{
              width: "80%",
              height: "2px",
              position: "relative",
              backgroundColor: isDarkMode
                ? alpha(color.teal400, 0.3)
                : alpha(color.teal600, 0.3),
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "30px",
                height: "100%",
                background: isDarkMode
                  ? `linear-gradient(90deg, transparent, ${alpha(
                      color.teal300,
                      0.8
                    )}, transparent)`
                  : `linear-gradient(90deg, transparent, ${alpha(
                      color.teal500,
                      0.8
                    )}, transparent)`,
                animation: `${shineAnimation} 2s linear infinite`,
              },
            }}
          />

          {/* Flickering stars */}
          {[...Array(5)].map((_, index) => (
            <AutoAwesomeIcon
              key={index}
              sx={{
                position: "absolute",
                fontSize: 14 + Math.random() * 6,
                color: isDarkMode ? color.teal300 : color.teal500,
                opacity: 0.6 + Math.random() * 0.4,
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animation: `${pulseAnimation} ${
                  2 + Math.random() * 2
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </Box>

        {/* Turning pages */}
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              backgroundColor: isDarkMode ? color.gray700 : color.white,
              borderRadius: "6px",
              transformOrigin: "left center",
              animation: `turnPage ${3 + index * 0.5}s ease-in-out infinite`,
              "@keyframes turnPage": {
                "0%": { transform: "rotateY(0deg)", zIndex: 3 - index },
                "25%": { transform: "rotateY(-30deg)", zIndex: 3 - index },
                "50%": { transform: "rotateY(-130deg)", zIndex: 3 - index },
                "75%": { transform: "rotateY(-130deg)", zIndex: 3 - index },
                "100%": { transform: "rotateY(0deg)", zIndex: 3 - index },
              },
              boxShadow: isDarkMode
                ? `2px 0 5px ${alpha(color.black, 0.2)}`
                : `2px 0 5px ${alpha(color.black, 0.1)}`,
              animationDelay: `${index * 0.8}s`,
              borderLeft: `1px solid ${
                isDarkMode
                  ? alpha(color.gray600, 0.5)
                  : alpha(color.gray300, 0.5)
              }`,
              "&::after": {
                content: '""',
                position: "absolute",
                top: "20%",
                left: "20%",
                width: "60%",
                height: "2px",
                backgroundColor: isDarkMode
                  ? alpha(color.gray600, 0.5)
                  : alpha(color.gray400, 0.5),
                boxShadow: `0 10px 0 ${
                  isDarkMode
                    ? alpha(color.gray600, 0.5)
                    : alpha(color.gray400, 0.5)
                }, 
                           0 20px 0 ${
                             isDarkMode
                               ? alpha(color.gray600, 0.5)
                               : alpha(color.gray400, 0.5)
                           }, 
                           0 30px 0 ${
                             isDarkMode
                               ? alpha(color.gray600, 0.5)
                               : alpha(color.gray400, 0.5)
                           }`,
                borderRadius: "1px",
              },
            }}
          />
        ))}
      </Box>

      {/* Loading text with ellipsis animation */}
      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          fontStyle: "italic",
          textAlign: "center",
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            display: "inline-block",
            animation: `${ellipsisAnimation} 1.5s infinite`,
          },
          background: isDarkMode
            ? `linear-gradient(90deg, ${color.teal700}, ${color.emerald700})`
            : `linear-gradient(90deg, ${color.teal500}, ${color.emerald500})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 500,
          letterSpacing: "0.01em",
        }}
      >
        {loadingText}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="caption"
        sx={{
          color: isDarkMode ? color.gray500 : color.gray600,
          mt: 1,
          fontSize: "0.75rem",
          opacity: 0.8,
        }}
      >
        Please wait while we find the perfect words
      </Typography>
    </Box>
  );
}
