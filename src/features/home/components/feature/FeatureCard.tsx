import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardActionArea, Divider, Fade, Typography, Zoom } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { HexagonWrapper, HexagonInner, HexagonBefore, HexagonAfter } from "./FeatureCardStyles";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  index,
  delay,
}) => {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const [showCard, setShowCard] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Delay animation khi component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Chọn màu dựa trên index
  const getColorPattern = (idx: number) => {
    const patterns = [
      { bg: colors.teal700, accent: colors.teal300 },
      { bg: colors.emerald700, accent: colors.emerald300 },
      { bg: colors.green700, accent: colors.green300 },
      { bg: colors.emerald800, accent: colors.emerald400 },
      { bg: colors.teal800, accent: colors.teal400 },
      { bg: colors.green800, accent: colors.green400 },
    ];
    return patterns[idx % patterns.length];
  };

  const colorPattern = getColorPattern(index);

  return (
    <Zoom in={showCard} style={{ transitionDelay: showCard ? "0ms" : "0ms" }}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: isDarkMode ? colors.gray800 : colors.white,
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: isHovered
            ? `0 12px 28px rgba(0,0,0,0.2), 0 0 0 2px ${colorPattern.accent}`
            : "0 6px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        {/* Góc trang trí */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "30%",
            height: "30%",
            backgroundColor: colorPattern.accent,
            opacity: 0.15,
            clipPath: "polygon(100% 0, 0 0, 100% 100%)",
          }}
        />

        <CardActionArea
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: 3,
            "&:hover": {
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2.5,
            }}
          >
            <HexagonWrapper>
              <HexagonBefore
                sx={{
                  backgroundColor: colorPattern.bg,
                  borderRadius: "8px",
                }}
              />
              <HexagonAfter
                sx={{
                  backgroundColor: colorPattern.bg,
                  borderRadius: "8px",
                }}
              />
              <HexagonInner>
                <Box
                  sx={{
                    color: colors.white,
                    fontSize: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
              </HexagonInner>
            </HexagonWrapper>

            <Typography
              variant="h5"
              component="h3"
              fontWeight="bold"
              align="center"
              sx={{
                mt: 2.5,
                mb: 1,
                color: isDarkMode ? colorPattern.accent : colorPattern.bg,
              }}
            >
              {title}
            </Typography>

            <Divider
              sx={{
                width: "40%",
                my: 1.5,
                backgroundColor: isDarkMode
                  ? colorPattern.accent
                  : colorPattern.bg,
                opacity: 0.5,
              }}
            />
          </Box>

          <Typography
            variant="body1"
            align="center"
            sx={{
              color: isDarkMode ? colors.gray300 : colors.gray700,
              flex: 1,
            }}
          >
            {description}
          </Typography>

          <Fade in={isHovered}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 2.5,
              }}
            >
              <Button
                variant="text"
                size="small"
                sx={{
                  color: isDarkMode ? colorPattern.accent : colorPattern.bg,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(94, 234, 212, 0.08)"
                      : "rgba(15, 118, 110, 0.08)",
                  },
                }}
                endIcon={<ArrowForwardIcon />}
              >
                Learn more
              </Button>
            </Box>
          </Fade>
        </CardActionArea>
      </Card>
    </Zoom>
  );
};

export default FeatureCard;
