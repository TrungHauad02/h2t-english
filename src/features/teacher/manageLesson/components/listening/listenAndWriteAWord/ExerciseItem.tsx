import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ListenAndWriteAWord } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { base64ToBlobUrl } from "utils/convert";
import SentencePreview from "./SentencePreview";
import { WEConfirmDelete } from "components/display";

interface ExerciseItemProps {
  exercise: ListenAndWriteAWord;
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ExerciseItem({
  exercise,
  isEditMode,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
}: ExerciseItemProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handlePlay = () => {
    if (!audioElement && exercise.audio) {
      const audioUrl = base64ToBlobUrl(exercise.audio, "audio/wav");
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.play();
      setIsPlaying(true);
      setAudioElement(audio);
    } else if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.currentTime = 0;
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          p: 2,
          backgroundColor: isDarkMode ? color.gray800 : color.white,
          position: "relative",
          "&:hover": {
            backgroundColor: isDarkMode ? color.gray700 : color.gray100,
          },
          transition: "background-color 0.2s ease",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Chip
            label={`#${exercise.serial}`}
            size="small"
            sx={{
              backgroundColor: isDarkMode ? color.teal700 : color.teal100,
              color: isDarkMode ? color.white : color.teal900,
              fontWeight: 600,
              width: 45,
            }}
          />

          <IconButton
            onClick={handlePlay}
            sx={{
              color: isPlaying
                ? isDarkMode
                  ? color.teal400
                  : color.teal600
                : isDarkMode
                ? color.gray400
                : color.gray600,
              "&:hover": {
                backgroundColor: isDarkMode ? color.gray600 : color.gray200,
              },
            }}
          >
            {isPlaying ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}
          </IconButton>

          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography
              noWrap
              sx={{
                color: isDarkMode ? color.white : color.gray900,
                fontWeight: 500,
              }}
            >
              <SentencePreview
                sentence={exercise.sentence}
                missingIndex={exercise.missingIndex}
                correctAnswer={exercise.correctAnswer}
                truncate={true}
              />
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {isEditMode && (
            <>
              <Tooltip title={isFirst ? "Cannot move up" : "Move up"}>
                <span>
                  <IconButton
                    onClick={onMoveUp}
                    size="small"
                    disabled={isFirst}
                    sx={{
                      color: isFirst
                        ? isDarkMode
                          ? color.gray600
                          : color.gray400
                        : isDarkMode
                        ? color.gray400
                        : color.gray600,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.gray600
                          : color.gray200,
                        color: isDarkMode ? color.teal400 : color.teal600,
                      },
                    }}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={isLast ? "Cannot move down" : "Move down"}>
                <span>
                  <IconButton
                    onClick={onMoveDown}
                    size="small"
                    disabled={isLast}
                    sx={{
                      color: isLast
                        ? isDarkMode
                          ? color.gray600
                          : color.gray400
                        : isDarkMode
                        ? color.gray400
                        : color.gray600,
                      "&:hover": {
                        backgroundColor: isDarkMode
                          ? color.gray600
                          : color.gray200,
                        color: isDarkMode ? color.teal400 : color.teal600,
                      },
                    }}
                  >
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Edit Exercise">
                <IconButton
                  onClick={onEdit}
                  size="small"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    "&:hover": {
                      backgroundColor: isDarkMode
                        ? color.gray600
                        : color.gray200,
                      color: isDarkMode ? color.teal400 : color.teal600,
                    },
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Exercise">
                <IconButton
                  onClick={handleDeleteClick}
                  size="small"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    "&:hover": {
                      backgroundColor: isDarkMode ? color.red700 : color.red100,
                      color: isDarkMode ? color.white : color.red600,
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title={expanded ? "Collapse" : "Expand"}>
            <IconButton
              onClick={toggleExpand}
              size="small"
              sx={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                color: isDarkMode ? color.gray400 : color.gray600,
                "&:hover": {
                  backgroundColor: isDarkMode ? color.gray600 : color.gray200,
                },
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Collapse in={expanded}>
        <Box
          sx={{
            p: 3,
            backgroundColor: isDarkMode ? color.gray700 : color.gray100,
            borderTop: `1px solid ${
              isDarkMode ? color.gray600 : color.gray300
            }`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: isDarkMode ? color.gray300 : color.gray700,
            }}
          >
            Complete Sentence:
          </Typography>

          <Box
            sx={{
              p: 2,
              mb: 2,
              borderRadius: "8px",
              backgroundColor: isDarkMode ? color.gray800 : color.white,
              border: `1px solid ${isDarkMode ? color.gray600 : color.gray300}`,
            }}
          >
            <SentencePreview
              sentence={exercise.sentence}
              missingIndex={exercise.missingIndex}
              correctAnswer={exercise.correctAnswer}
              highlight={true}
            />
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mb: 1 }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  mb: 0.5,
                }}
              >
                Word to Insert:
              </Typography>
              <Chip
                label={exercise.correctAnswer}
                sx={{
                  backgroundColor: isDarkMode
                    ? color.emerald700
                    : color.emerald100,
                  color: isDarkMode ? color.white : color.emerald900,
                  fontWeight: 500,
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  mb: 0.5,
                }}
              >
                Insertion Position:
              </Typography>
              <Chip
                label={exercise.missingIndex}
                sx={{
                  backgroundColor: isDarkMode ? color.teal700 : color.teal100,
                  color: isDarkMode ? color.white : color.teal900,
                  fontWeight: 500,
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Collapse>

      <WEConfirmDelete
        open={openDeleteDialog}
        onCancel={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        resourceName={`Exercise #${exercise.serial}`}
        title="Delete Exercise"
        description="Are you sure you want to delete this exercise? This action cannot be undone."
      />
    </Box>
  );
}
