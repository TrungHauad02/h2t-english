import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  Slide,
  alpha,
  Divider,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HearingOutlinedIcon from "@mui/icons-material/HearingOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Toeic } from "interfaces";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

interface ToeicItemProps {
  toeic: Toeic;
  handleOpenDeleteDialog: (id: number) => void;
}

export default function ToeicItem({
  toeic,
  handleOpenDeleteDialog,
}: ToeicItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Count total questions across all parts
  const calculateTotalQuestions = () => {
    const parts = [
      toeic.questionsPart1 || [],
      toeic.questionsPart2 || [],
      toeic.questionsPart3 || [],
      toeic.questionsPart4 || [],
      toeic.questionsPart5 || [],
      toeic.questionsPart6 || [],
      toeic.questionsPart7 || []
    ];
    
    return parts.reduce((sum, part) => sum + part.length, 0);
  };
  
  const totalQuestions = toeic.totalQuestions || calculateTotalQuestions();
  
  // Count listening and reading parts
  const listeningQuestions = [
    ...(toeic.questionsPart1 || []),
    ...(toeic.questionsPart2 || []),
    ...(toeic.questionsPart3 || []),
    ...(toeic.questionsPart4 || [])
  ].length;
  
  const readingQuestions = [
    ...(toeic.questionsPart5 || []),
    ...(toeic.questionsPart6 || []),
    ...(toeic.questionsPart7 || [])
  ].length;
  
  // Color scheme
  const colorScheme = {
    accent: isDarkMode ? color.teal400 : color.teal600,
    badge: {
      bg: isDarkMode ? alpha(color.teal700, 0.3) : alpha(color.teal100, 0.7),
      text: isDarkMode ? color.teal300 : color.teal800
    },
    dot: isDarkMode ? color.teal400 : color.teal500,
    text: isDarkMode ? color.teal300 : color.teal700
  };
  
  const handleViewDetail = () => {
    navigate(`/teacher-advance/toeics/${toeic.id}`);
  };

  // Dynamic colors
  const bgColor = isDarkMode
    ? `linear-gradient(145deg, ${color.gray800}, ${color.gray900})`
    : `linear-gradient(145deg, ${color.white}, ${color.gray50})`;
  const cardBorder = isHovered
    ? `2px solid ${colorScheme.accent}`
    : isDarkMode
    ? `2px solid ${color.gray700}`
    : `2px solid ${color.gray200}`;

  return (
    <Slide direction="up" in={isLoaded} mountOnEnter unmountOnExit>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          maxWidth: 345,
          width: "100%",
          borderRadius: "16px",
          background: bgColor,
          border: cardBorder,
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
          boxShadow: isHovered
            ? isDarkMode
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)"
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : isDarkMode
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: colorScheme.accent,
            transform: isHovered ? "scaleY(1)" : "scaleY(0.7)",
            transformOrigin: "top",
            transition: "transform 0.3s ease",
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: -6,
            right: 20,
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: `20px solid ${colorScheme.accent}`,
            transition: "transform 0.3s ease",
            transform: isHovered ? "translateY(6px)" : "translateY(0)",
          }}
        />

        <Box sx={{ p: 3, pt: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                padding: "4px 12px",
                backgroundColor: isDarkMode ? alpha(color.gray800, 0.6) : alpha(color.gray100, 0.6),
                backdropFilter: "blur(4px)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <FiberManualRecordIcon
                sx={{
                  color: colorScheme.dot,
                  fontSize: "10px",
                  mr: 0.7,
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: colorScheme.text,
                  fontSize: "0.7rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                {toeic.status ? "Published" : "Unpublished"}
              </Typography>
            </Box>

            <Chip
              label={`${toeic.duration} min`}
              size="small"
              sx={{
                height: 24,
                backgroundColor: isDarkMode ? alpha(color.gray700, 0.5) : alpha(color.gray100, 0.8),
                color: colorScheme.badge.text,
                fontWeight: 600,
                fontSize: "0.7rem",
                border: `1px solid ${
                  isDarkMode ? color.gray600 : color.gray200
                }`,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.3,
              mb: 1.5,
              mt: 1,
              transition: "color 0.2s ease",
              position: "relative",
              display: "inline-block",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                width: isHovered ? "100%" : "40%",
                height: "2px",
                background: colorScheme.accent,
                transition: "width 0.3s ease",
              },
            }}
          >
            {toeic.title}
          </Typography>

          <Divider 
            sx={{ 
              mb: 2, 
              mt: 2, 
              borderColor: isDarkMode ? color.gray700 : color.gray200,
              opacity: 0.5
            }} 
          />

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <QuizOutlinedIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.teal400 : color.teal600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                Total Questions: {totalQuestions || "200"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <HearingOutlinedIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.emerald400 : color.emerald600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                Listening: {listeningQuestions} questions
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MenuBookOutlinedIcon
                fontSize="small"
                sx={{ color: isDarkMode ? color.teal400 : color.teal600 }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? color.gray300 : color.gray700 }}
              >
                Reading: {readingQuestions} questions
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Stack direction="row" spacing={1}>
              {Array(7).fill(0).map((_, index) => {
                const partQuestions = toeic[`questionsPart${index + 1}` as keyof Toeic] as number[] | undefined;
                const hasQuestions = partQuestions && partQuestions.length > 0;
                
                return (
                  <Chip
                    key={index}
                    label={`P${index + 1}`}
                    size="small"
                    sx={{
                      height: 24,
                      backgroundColor: hasQuestions 
                        ? isDarkMode ? alpha(colorScheme.accent, 0.2) : alpha(colorScheme.accent, 0.1)
                        : isDarkMode ? alpha(color.gray700, 0.5) : alpha(color.gray200, 0.5),
                      color: hasQuestions
                        ? colorScheme.badge.text
                        : isDarkMode ? color.gray400 : color.gray500,
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      border: hasQuestions 
                        ? `1px solid ${colorScheme.accent}`
                        : `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
                      "& .MuiChip-label": {
                        px: 1,
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Button
              variant="text"
              onClick={handleViewDetail}
              endIcon={<KeyboardArrowRightIcon />}
              sx={{
                color: colorScheme.accent,
                fontWeight: 600,
                textTransform: "none",
                p: 0,
                "&:hover": {
                  background: "transparent",
                  transform: "translateX(4px)",
                },
                transition: "transform 0.2s ease",
              }}
            >
              View details
            </Button>

            <Tooltip title="Delete" placement="top">
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteDialog(toeic.id);
                }}
                sx={{
                  color: isDarkMode ? color.red400 : color.red600,
                  "&:hover": {
                    backgroundColor: isDarkMode
                      ? "rgba(220, 38, 38, 0.1)"
                      : "rgba(220, 38, 38, 0.05)",
                    transform: "scale(1.1)",
                  },
                  transition: "transform 0.2s ease",
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Slide>
  );
}