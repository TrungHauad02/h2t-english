import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
  Tooltip,
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
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

interface RouteNodeCardProps {
  node: RouteNode;
  isEditMode: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function RouteNodeCard({
  node,
  onMoveUp,
  isEditMode,
  onMoveDown,
}: RouteNodeCardProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

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
    navigate(`${prefix}/${node.id}`);
  };

  return (
    <Box
      component={Paper}
      elevation={2}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
          borderColor: isEditMode
            ? isDarkMode
              ? color.emerald400
              : color.emerald600
            : color.gray500,
        },
        cursor: "pointer",
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isEditMode
              ? isDarkMode
                ? color.emerald400
                : color.emerald600
              : color.gray500,
            color: "white",
            mr: 2,
          }}
        >
          {getNodeIcon(node.type)}
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: isDarkMode ? color.gray100 : color.gray900,
          }}
        >
          {node.title}
        </Typography>
      </Box>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack>
          <Chip
            label={getNodeTypeLabel(node.type)}
            size="small"
            sx={{
              alignSelf: "flex-start",
              mb: 2,
              backgroundColor: isDarkMode ? color.gray700 : color.gray200,
              color: isDarkMode ? color.gray100 : color.gray900,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray300 : color.gray700,
              mb: 2,
              flex: 1,
            }}
          >
            {node.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray600,
              fontSize: "0.875rem",
              mt: "auto",
            }}
          >
            Serial: {node.serial}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={0.5}
          sx={{
            ml: 2,
            alignSelf: "flex-start",
            "& .MuiButton-root": {
              minWidth: 40,
              width: 40,
              height: 40,
              padding: 0,
              borderRadius: "50%",
              border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? color.emerald800
                  : color.emerald100,
                borderColor: isDarkMode ? color.emerald400 : color.emerald600,
                color: isDarkMode ? color.emerald400 : color.emerald600,
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
              disabled={!isEditMode}
            >
              <ArrowUpward
                fontSize="small"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  transition: "color 0.2s ease",
                }}
              />
            </Button>
          </Tooltip>

          <Tooltip title="Move down" arrow>
            <Button
              aria-label="Move down"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown && onMoveDown();
              }}
              disabled={!isEditMode}
            >
              <ArrowDownward
                fontSize="small"
                sx={{
                  color: isDarkMode ? color.gray400 : color.gray600,
                  transition: "color 0.2s ease",
                }}
              />
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
}
