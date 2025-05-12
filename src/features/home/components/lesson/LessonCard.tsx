import { useState, useEffect } from "react";
import {
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledCard, CardOverlay } from "./LessonCardStyles";
import { Lesson, RouteNode, RouteNodeEnum } from "interfaces";
import { createLessonFactory, LessonCreationService } from "services";
import { useNavigate } from "react-router-dom";

interface LessonCardProps {
  node: RouteNode;
  index: number;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function LessonCard({
  node,
  index,
  isSelected,
  onSelect,
}: LessonCardProps) {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonService = createLessonFactory(
          node.type
        ) as LessonCreationService<Lesson>;
        const response = await lessonService.findById(node.nodeId);
        setLesson(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLesson();
  }, [node.type, node.nodeId]);

  const handleStartClick = () => {
    let prefix = "";
    switch (node.type) {
      case RouteNodeEnum.VOCABULARY:
        prefix = "/lesson/topics";
        break;
      case RouteNodeEnum.GRAMMAR:
        prefix = "/lesson/grammars";
        break;
      case RouteNodeEnum.READING:
        prefix = "/lesson/readings";
        break;
      case RouteNodeEnum.LISTENING:
        prefix = "/lesson/listenings";
        break;
      case RouteNodeEnum.WRITING:
        prefix = "/lesson/writings";
        break;
      case RouteNodeEnum.SPEAKING:
        prefix = "/lesson/speakings";
        break;
      default:
        break;
    }

    navigate(`${prefix}/${node.nodeId}`);
  };

  const getBorderColor = () => {
    const colors = ["#5eead4", "#6ee7b7", "#86efac", "#4ade80"];
    return colors[index % colors.length];
  };

  return (
    <Zoom in={showCard}>
      <StyledCard
        onClick={() => onSelect(index)}
        sx={{
          backgroundColor: isDarkMode ? colors.gray800 : colors.white,
          color: isDarkMode ? colors.gray100 : colors.gray900,
          borderRadius: 3,
          boxShadow: isSelected
            ? `0 8px 24px rgba(0,0,0,0.2), 0 0 0 3px ${getBorderColor()}`
            : "0 4px 12px rgba(0,0,0,0.1)",
          transform: isSelected ? "scale(1.02)" : "scale(1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          },
          "& .lesson-card-content": {
            transform: isSelected ? "translateY(-8px)" : "translateY(0)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height={isMobile ? "180" : "200"}
            image={node.image}
            alt={node.title}
            sx={{
              filter: isDarkMode ? "brightness(0.85)" : "none",
              transition: "all 0.5s ease",
              "&:hover": {
                filter: isDarkMode ? "brightness(1)" : "brightness(1.05)",
              },
            }}
          />
          <CardOverlay />
        </Box>

        <CardContent
          className="lesson-card-content"
          sx={{ flexGrow: 1, p: 2.5, transition: "transform 0.3s ease" }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: "1.1rem",
              mb: 1,
              color: isDarkMode ? colors.white : colors.gray900,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {node.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? colors.gray300 : colors.gray700,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "0.875rem",
            }}
          >
            {node.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VisibilityIcon
                sx={{
                  color: isDarkMode ? colors.gray400 : colors.gray500,
                  mr: 0.5,
                }}
              />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                {lesson?.views.toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="small"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartClick}
              sx={{
                backgroundColor: isDarkMode ? colors.teal700 : colors.teal600,
                color: colors.white,
                fontWeight: 600,
                fontSize: "0.75rem",
                padding: "4px 10px",
                "&:hover": {
                  backgroundColor: isDarkMode ? colors.teal600 : colors.teal500,
                },
              }}
            >
              Start
            </Button>
          </Box>
        </CardContent>
      </StyledCard>
    </Zoom>
  );
}
