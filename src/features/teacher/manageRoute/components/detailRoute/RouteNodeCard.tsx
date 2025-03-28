import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  Tooltip,
  Fade,
  IconButton,
  Divider,
  useMediaQuery,
  Theme,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CreateIcon from "@mui/icons-material/Create";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import QuizIcon from "@mui/icons-material/Quiz";
import { RouteNode, RouteNodeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import {
  ArrowDownward,
  ArrowUpward,
  DeleteOutline,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const getNodeIcon = (type: RouteNodeEnum) => {
  switch (type) {
    case RouteNodeEnum.VOCABULARY:
      return <TranslateIcon />;
    case RouteNodeEnum.GRAMMAR:
      return <MenuBookIcon />;
    case RouteNodeEnum.READING:
      return <BookIcon />;
    case RouteNodeEnum.LISTENING:
      return <HeadphonesIcon />;
    case RouteNodeEnum.WRITING:
      return <CreateIcon />;
    case RouteNodeEnum.SPEAKING:
      return <RecordVoiceOverIcon />;
    case RouteNodeEnum.MIXING_TEST:
    case RouteNodeEnum.READING_TEST:
    case RouteNodeEnum.LISTENING_TEST:
    case RouteNodeEnum.SPEAKING_TEST:
    case RouteNodeEnum.WRITING_TEST:
      return <QuizIcon />;
    default:
      return <BookIcon />;
  }
};

const getNodeTypeLabel = (type: RouteNodeEnum) => {
  switch (type) {
    case RouteNodeEnum.VOCABULARY:
      return "Vocabulary";
    case RouteNodeEnum.GRAMMAR:
      return "Grammar";
    case RouteNodeEnum.READING:
      return "Reading";
    case RouteNodeEnum.LISTENING:
      return "Listening";
    case RouteNodeEnum.WRITING:
      return "Writing";
    case RouteNodeEnum.SPEAKING:
      return "Speaking";
    case RouteNodeEnum.MIXING_TEST:
      return "Mixed Test";
    case RouteNodeEnum.READING_TEST:
      return "Reading Test";
    case RouteNodeEnum.LISTENING_TEST:
      return "Listening Test";
    case RouteNodeEnum.SPEAKING_TEST:
      return "Speaking Test";
    case RouteNodeEnum.WRITING_TEST:
      return "Writing Test";
    default:
      return "Unknown";
  }
};

const getNodeTypeColor = (
  type: RouteNodeEnum,
  color: ReturnType<typeof useColor>,
  isDarkMode: boolean
) => {
  switch (type) {
    case RouteNodeEnum.VOCABULARY:
      return isDarkMode ? color.teal400 : color.teal600;
    case RouteNodeEnum.GRAMMAR:
      return isDarkMode ? color.emerald400 : color.emerald600;
    case RouteNodeEnum.READING:
      return isDarkMode ? color.green400 : color.green600;
    case RouteNodeEnum.LISTENING:
      return isDarkMode ? color.teal500 : color.teal700;
    case RouteNodeEnum.WRITING:
      return isDarkMode ? color.emerald500 : color.emerald700;
    case RouteNodeEnum.SPEAKING:
      return isDarkMode ? color.green500 : color.green700;
    case RouteNodeEnum.MIXING_TEST:
    case RouteNodeEnum.READING_TEST:
    case RouteNodeEnum.LISTENING_TEST:
    case RouteNodeEnum.SPEAKING_TEST:
    case RouteNodeEnum.WRITING_TEST:
      return isDarkMode ? color.teal300 : color.teal500;
    default:
      return isDarkMode ? color.gray400 : color.gray600;
  }
};

interface RouteNodeCardProps {
  node: RouteNode;
  isEditMode: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
}

export default function RouteNodeCard({
  node,
  isEditMode,
  onMoveUp,
  onMoveDown,
  onDelete,
}: RouteNodeCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const nodeColor = getNodeTypeColor(node.type, color, isDarkMode);
  const bgColor = isDarkMode ? color.gray800 : color.white;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const borderColor = isEditMode
    ? nodeColor
    : isDarkMode
    ? color.gray700
    : color.gray200;

  const handleClick = () => {
    let prefix = "";
    switch (node.type) {
      case RouteNodeEnum.MIXING_TEST:
      case RouteNodeEnum.READING_TEST:
      case RouteNodeEnum.LISTENING_TEST:
      case RouteNodeEnum.SPEAKING_TEST:
      case RouteNodeEnum.WRITING_TEST:
        prefix = "test";
        break;
      case RouteNodeEnum.VOCABULARY:
        prefix = "topics";
        break;
      case RouteNodeEnum.GRAMMAR:
        prefix = "grammars";
        break;
      case RouteNodeEnum.READING:
        prefix = "readings";
        break;
      case RouteNodeEnum.LISTENING:
        prefix = "listenings";
        break;
      case RouteNodeEnum.WRITING:
        prefix = "writings";
        break;
      case RouteNodeEnum.SPEAKING:
        prefix = "speakings";
        break;
      default:
        prefix = "";
        break;
    }
    navigate(`${prefix}/${node.nodeId}`);
  };

  return (
    <Box
      component={Paper}
      elevation={isHovered ? 8 : 2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        p: 0,
        borderRadius: "1rem",
        backgroundColor: bgColor,
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        cursor: "pointer",
        border: `2px solid ${isHovered ? nodeColor : borderColor}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 10px 20px rgba(0,0,0,${isDarkMode ? 0.4 : 0.1})`
          : `0 2px 10px rgba(0,0,0,${isDarkMode ? 0.3 : 0.05})`,
        "&::before": isEditMode
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "5px",
              height: "100%",
              backgroundColor: nodeColor,
            }
          : {},
      }}
      onClick={isEditMode ? undefined : handleClick}
    >
      {/* Header with accent color */}
      <Box
        sx={{
          p: 2,
          pb: 1,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            borderRadius: "12px",
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: nodeColor,
            color: color.white,
            mr: 2,
            transition: "all 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          {getNodeIcon(node.type)}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: textColor,
              lineHeight: 1.2,
            }}
          >
            {node.title}
          </Typography>
          <Chip
            label={getNodeTypeLabel(node.type)}
            size="small"
            sx={{
              mt: 0.5,
              backgroundColor: isDarkMode
                ? `${nodeColor}33` // 20% opacity
                : `${nodeColor}22`, // 13% opacity
              color: nodeColor,
              fontWeight: 600,
              borderRadius: "6px",
              fontSize: "0.7rem",
              height: "22px",
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />
        </Box>

        {isEditMode && (
          <Tooltip title="Delete" arrow placement="top">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              sx={{
                color: isDarkMode ? color.red400 : color.red600,
                "&:hover": {
                  backgroundColor: isDarkMode
                    ? `${color.red900}40`
                    : `${color.red100}80`,
                  color: isDarkMode ? color.red300 : color.red700,
                },
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider
        sx={{
          my: 1,
          borderColor: isDarkMode ? color.gray700 : color.gray200,
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          p: 2,
          pt: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? color.gray300 : color.gray700,
            mb: 2,
            flex: 1,
            lineHeight: 1.6,
          }}
        >
          {node.description}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              fontSize: "0.875rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              "& span": {
                color: nodeColor,
                fontWeight: 700,
                ml: 0.5,
              },
            }}
          >
            Serial: <span>{node.serial}</span>
          </Typography>

          {isEditMode ? (
            <Stack
              direction={isMobile ? "row" : "row"}
              spacing={1}
              sx={{
                "& .MuiButton-root": {
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  padding: 0,
                  borderRadius: "8px",
                  backgroundColor: isDarkMode ? color.gray700 : color.gray100,
                  color: isDarkMode ? color.gray300 : color.gray600,
                  "&:hover": {
                    backgroundColor: isDarkMode ? nodeColor : `${nodeColor}22`,
                    color: isDarkMode ? color.white : nodeColor,
                  },
                },
              }}
            >
              <Tooltip title="Move up" arrow placement="top">
                <Button
                  aria-label="Move up"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp && onMoveUp();
                  }}
                >
                  <ArrowUpward fontSize="small" />
                </Button>
              </Tooltip>

              <Tooltip title="Move down" arrow placement="top">
                <Button
                  aria-label="Move down"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown && onMoveDown();
                  }}
                >
                  <ArrowDownward fontSize="small" />
                </Button>
              </Tooltip>
            </Stack>
          ) : (
            <Fade in={isHovered}>
              <IconButton
                size="small"
                sx={{
                  color: nodeColor,
                  backgroundColor: isDarkMode ? color.gray700 : color.gray50,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: nodeColor,
                    color: color.white,
                    transform: "translateX(2px)",
                  },
                }}
              >
                <ArrowForward fontSize="small" />
              </IconButton>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
}
